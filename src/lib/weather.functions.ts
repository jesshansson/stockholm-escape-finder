import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { isWetCode, weatherLabel, type WeatherSummary } from "./weather";

// Open-Meteo — public, no API key. Coordinates: Stockholm city centre.
const OPEN_METEO_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=59.3293&longitude=18.0686" +
  "&current=temperature_2m,precipitation,weather_code" +
  "&daily=temperature_2m_max,precipitation_sum,precipitation_probability_max,weather_code" +
  "&timezone=Europe%2FStockholm&forecast_days=1";

const openMeteoSchema = z.object({
  current: z.object({
    temperature_2m: z.number(),
    precipitation: z.number(),
    weather_code: z.number(),
  }),
  daily: z.object({
    temperature_2m_max: z.array(z.number()).min(1),
    precipitation_sum: z.array(z.number().nullable()).min(1),
    precipitation_probability_max: z.array(z.number().nullable()).min(1),
    weather_code: z.array(z.number()).min(1),
  }),
});

export type WeatherResult = {
  weather: WeatherSummary | null;
};

export const fetchStockholmWeather = createServerFn({ method: "GET" }).handler(
  async (): Promise<WeatherResult> => {
    try {
      const response = await fetch(OPEN_METEO_URL, {
        headers: { Accept: "application/json" },
      });
      if (!response.ok) return { weather: null };

      const parsed = openMeteoSchema.safeParse(await response.json());
      if (!parsed.success) return { weather: null };

      const { current, daily } = parsed.data;
      const precipitationMm = daily.precipitation_sum[0] ?? 0;
      const precipitationChance = daily.precipitation_probability_max[0] ?? 0;
      const dailyCode = daily.weather_code[0] ?? current.weather_code;

      const weather: WeatherSummary = {
        temperatureC: Math.round(current.temperature_2m),
        maxTemperatureC: Math.round(daily.temperature_2m_max[0] ?? current.temperature_2m),
        precipitationMm,
        precipitationChance,
        isWet:
          isWetCode(current.weather_code) ||
          isWetCode(dailyCode) ||
          precipitationMm >= 1 ||
          precipitationChance >= 60,
        code: current.weather_code,
        label: weatherLabel(current.weather_code),
      };

      return { weather };
    } catch {
      return { weather: null };
    }
  },
);
