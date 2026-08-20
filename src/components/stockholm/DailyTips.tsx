import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { CloudRain, CloudSun, Snowflake, Sun, Clock } from "lucide-react";

import { fetchStockholmWeather } from "@/lib/weather.functions";
import { recommendDestinations, tipsHeadline } from "@/lib/recommend";
import { isWetCode } from "@/lib/weather";
import type { Destination } from "@/data/types";

type Props = {
  destinations: Destination[];
  onOpen: (id: string) => void;
};

function WeatherIcon({ code, temperatureC }: { code: number; temperatureC: number }) {
  const cls = "size-5 text-moss shrink-0";
  if (code >= 71 && code <= 86) return <Snowflake className={cls} aria-hidden />;
  if (isWetCode(code)) return <CloudRain className={cls} aria-hidden />;
  if (temperatureC >= 18 && code === 0) return <Sun className={cls} aria-hidden />;
  return <CloudSun className={cls} aria-hidden />;
}

export function DailyTips({ destinations, onOpen }: Props) {
  const getWeather = useServerFn(fetchStockholmWeather);

  const { data, isPending } = useQuery({
    queryKey: ["stockholm-weather"],
    queryFn: () => getWeather(),
    staleTime: 15 * 60 * 1000,
    retry: 1,
  });

  const weather = data?.weather ?? null;

  const recommendations = useMemo(
    () => recommendDestinations(destinations, { weather, date: new Date(), count: 3 }),
    [destinations, weather],
  );

  return (
    <section
      aria-labelledby="dagens-tips-rubrik"
      className="px-5 sm:px-12 pb-10 sm:pb-14"
    >
      <div className="rounded-3xl bg-surface ring-1 ring-black/5 p-5 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-5 sm:mb-6">
          <div className="min-w-0">
            <h2
              id="dagens-tips-rubrik"
              className="text-xl sm:text-2xl font-semibold tracking-tight text-ink"
            >
              Dagens tips
            </h2>
            <p
              className="text-sm text-ink-muted mt-1"
              aria-live="polite"
              aria-busy={isPending}
            >
              {isPending
                ? "Hämtar dagens väder…"
                : tipsHeadline(weather)}
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-ink shrink-0">
            {isPending ? (
              <span
                className="h-6 w-40 rounded-full bg-ink-soft animate-pulse"
                aria-hidden
              />
            ) : weather ? (
              <>
                <WeatherIcon code={weather.code} temperatureC={weather.temperatureC} />
                <span>
                  {weather.label}, {weather.temperatureC}°C
                  {weather.isWet ? " · risk för nederbörd" : " · mest uppehåll"}
                </span>
              </>
            ) : (
              <span className="text-ink-muted">
                Vädret är inte tillgängligt just nu
              </span>
            )}
          </div>
        </div>

        <ul className="grid gap-3 sm:grid-cols-3">
          {isPending
            ? [0, 1, 2].map((i) => (
                <li
                  key={i}
                  className="rounded-2xl ring-1 ring-black/5 overflow-hidden bg-sand"
                  aria-hidden
                >
                  <div className="aspect-[16/10] bg-ink-soft animate-pulse" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 w-2/3 rounded bg-ink-soft animate-pulse" />
                    <div className="h-3 w-full rounded bg-ink-soft animate-pulse" />
                    <div className="h-3 w-4/5 rounded bg-ink-soft animate-pulse" />
                  </div>
                </li>
              ))
            : recommendations.map(({ destination: d, reason }) => (
                <li key={d.id}>
                  <button
                    type="button"
                    onClick={() => onOpen(d.id)}
                    className="group w-full text-left rounded-2xl ring-1 ring-black/5 overflow-hidden bg-sand hover:bg-ink-soft/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                  >
                    <DestinationImage
                      src={d.image}
                      name={d.name}
                      width={640}
                      height={400}
                      loading="lazy"
                      className="w-full aspect-[16/10] object-cover"
                    />
                    <div className="p-4">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-moss">
                        {d.category}
                      </span>
                      <h3 className="text-base font-semibold text-ink mt-1 mb-1.5">
                        {d.name}
                      </h3>
                      <p className="text-xs text-ink-muted leading-relaxed">{reason}</p>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-ink">
                        <Clock className="size-3" aria-hidden />
                        {d.travelTime}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
        </ul>
      </div>
    </section>
  );
}
