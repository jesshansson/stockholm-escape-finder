// Pure recommendation logic — no React, no network, no side effects.
//
// The rules are deliberately simple and explainable: every recommendation
// carries a human-readable reason built from the same signals that produced
// its score. No AI, no hidden personalization.

import type { Destination } from "@/data/types";
import { getSeason, type Season, type WeatherSummary } from "./weather";

export type Recommendation = {
  destination: Destination;
  /** Human-readable Swedish explanation, e.g. "Bra idag: torrt väder, utomhus och 25 min bort". */
  reason: string;
  score: number;
};

export type RecommendInput = {
  weather: WeatherSummary | null;
  /** Reference date; defaults to now at call site. */
  date: Date;
  count?: number;
};

const COLD_C = 5;
const WARM_C = 20;

function isIndoorFriendly(d: Destination) {
  return d.indoorOutdoor === "Inomhus" || d.indoorOutdoor === "Både och";
}

function isOutdoor(d: Destination) {
  return d.indoorOutdoor === "Utomhus" || d.indoorOutdoor === "Både och";
}

function matchesSeason(d: Destination, season: Season) {
  return d.seasonTags.includes(season);
}

function travelLabel(d: Destination) {
  return `${d.travelMinutes} min bort`;
}

/**
 * Rank the curated destinations for "today".
 * Works with or without weather data — without it, season and travel time decide.
 */
export function recommendDestinations(
  destinations: Destination[],
  { weather, date, count = 3 }: RecommendInput,
): Recommendation[] {
  const season = getSeason(date);

  const scored = destinations.map((d) => {
    let score = 0;
    const reasons: string[] = [];

    if (weather) {
      const isCold = weather.temperatureC <= COLD_C;

      if (weather.isWet) {
        if (isIndoorFriendly(d)) {
          score += 40;
          reasons.push("passar en regnig dag");
        }
        if (d.indoorOutdoor === "Utomhus") score -= 35;
        if (d.cafeAvailable || d.foodAvailable) {
          score += 12;
          reasons.push("mat och fika inomhus");
        }
      } else {
        if (isOutdoor(d)) {
          score += 32;
          reasons.push("torrt väder och utomhus");
        }
        if (d.indoorOutdoor === "Inomhus") score -= 12;
      }

      if (weather.temperatureC <= COLD_C) {
        if (isIndoorFriendly(d)) {
          score += 18;
          reasons.push("varmt och skönt när det är kallt ute");
        }
        if (d.category === "Badplats") score -= 30;
      } else if (weather.maxTemperatureC >= WARM_C) {
        if (d.island || d.category === "Badplats") {
          score += 22;
          reasons.push("perfekt när det är varmt");
        }
      }
    }

    if (matchesSeason(d, season)) {
      score += 16;
      reasons.push(`fin nu på ${season.toLowerCase()}en`);
    } else if (d.seasonTags.includes("Året runt")) {
      score += 8;
      reasons.push("funkar året runt");
    }

    if (d.publicTransport) {
      score += 8;
      reasons.push("lätt med kollektivt");
    }

    if (d.travelMinutes <= 30) score += 14;
    else if (d.travelMinutes <= 60) score += 7;
    else if (d.travelMinutes > 120) score -= 10;
    reasons.push(travelLabel(d));

    return { destination: d, score, reasons };
  });

  const prefix = weather ? "Bra idag" : "Tips";

  return scored
    .sort((a, b) =>
      b.score === a.score
        ? a.destination.travelMinutes - b.destination.travelMinutes
        : b.score - a.score,
    )
    .slice(0, Math.max(0, count))
    .map(({ destination, score, reasons }) => ({
      destination,
      score,
      reason: `${prefix}: ${joinSwedish(reasons.slice(0, 3))}`,
    }));
}

/** "a, b och c" */
export function joinSwedish(parts: string[]): string {
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0]!;
  return `${parts.slice(0, -1).join(", ")} och ${parts[parts.length - 1]}`;
}

/** Short intro line above the tips list. */
export function tipsHeadline(weather: WeatherSummary | null): string {
  if (!weather) return "Dagens tips baserat på säsong och restid";
  return `Dagens tips baserat på vädret i Stockholm`;
}
