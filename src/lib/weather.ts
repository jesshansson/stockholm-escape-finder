// Pure weather domain model + helpers. No React, no network — easy to test.

export type Season = "Vår" | "Sommar" | "Höst" | "Vinter";

export type WeatherSummary = {
  /** Current temperature in °C, rounded. */
  temperatureC: number;
  /** Highest temperature forecast for today in °C, rounded. */
  maxTemperatureC: number;
  /** Total precipitation forecast for today in mm. */
  precipitationMm: number;
  /** Probability (0-100) of precipitation today. */
  precipitationChance: number;
  /** True when the day is likely wet. */
  isWet: boolean;
  /** WMO weather code. */
  code: number;
  /** Short Swedish description, e.g. "Lätt regn". */
  label: string;
};

/** WMO weather interpretation codes → short Swedish labels. */
const WMO_LABELS: Array<{ codes: number[]; label: string }> = [
  { codes: [0], label: "Klart" },
  { codes: [1, 2], label: "Växlande molnighet" },
  { codes: [3], label: "Mulet" },
  { codes: [45, 48], label: "Dimma" },
  { codes: [51, 53, 55, 56, 57], label: "Duggregn" },
  { codes: [61, 63, 80, 81], label: "Regn" },
  { codes: [65, 82], label: "Kraftigt regn" },
  { codes: [66, 67], label: "Underkylt regn" },
  { codes: [71, 73, 75, 77, 85, 86], label: "Snö" },
  { codes: [95, 96, 99], label: "Åska" },
];

export function weatherLabel(code: number): string {
  return WMO_LABELS.find((e) => e.codes.includes(code))?.label ?? "Växlande väder";
}

/** Codes that mean falling precipitation of some kind. */
export function isWetCode(code: number): boolean {
  return code >= 51;
}

export function getSeason(date: Date): Season {
  const m = date.getMonth() + 1;
  if (m >= 3 && m <= 5) return "Vår";
  if (m >= 6 && m <= 8) return "Sommar";
  if (m >= 9 && m <= 11) return "Höst";
  return "Vinter";
}
