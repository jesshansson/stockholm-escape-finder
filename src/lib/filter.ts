// Pure filtering logic — no React, no UI. Easy to test and reuse.

import type {
  Category,
  Destination,
  DistanceRange,
  Duration,
  MoodTag,
  PracticalTag,
} from "@/data/types";
import {
  CATEGORY_OPTIONS,
  DISTANCE_OPTIONS,
  DURATION_OPTIONS,
  MOOD_OPTIONS,
  PRACTICAL_OPTIONS,
} from "@/data/filters";


export type ActiveFilters = {
  distance: DistanceRange[];
  categories: Category[];
  moods: MoodTag[];
  practical: PracticalTag[];
  durations: Duration[];
};

export const emptyFilters: ActiveFilters = {
  distance: [],
  categories: [],
  moods: [],
  practical: [],
  durations: [],
};

export function filterDestinations(
  destinations: Destination[],
  filters: ActiveFilters,
): Destination[] {
  return destinations.filter((d) => {
    if (filters.distance.length && !filters.distance.includes(d.distanceRange))
      return false;
    if (filters.categories.length && !filters.categories.includes(d.category))
      return false;
    if (
      filters.moods.length &&
      !filters.moods.some((m) => d.moodTags.includes(m))
    )
      return false;
    if (
      filters.practical.length &&
      !filters.practical.every((p) => d.practicalTags.includes(p))
    )
      return false;
    if (filters.durations.length && !filters.durations.includes(d.duration))
      return false;
    return true;
  });
}

export function countActiveFilters(filters: ActiveFilters): number {
  return (
    filters.distance.length +
    filters.categories.length +
    filters.moods.length +
    filters.practical.length +
    filters.durations.length
  );
}

// ---------------------------------------------------------------------------
// URL <-> filter serialization
//
// Filters live in the query string so a filtered result set can be shared,
// bookmarked and restored on reload/back-navigation. Parsing is deliberately
// tolerant: unknown or malformed values are dropped instead of throwing, so an
// old or hand-edited link degrades to "fewer filters" rather than an error page.
// ---------------------------------------------------------------------------

/** Short query-string keys: d=distans, k=kategori, h=humör, p=praktiskt, t=tid. */
export type FilterSearch = {
  d?: string;
  k?: string;
  h?: string;
  p?: string;
  t?: string;
};

const DISTANCE_VALUES: DistanceRange[] = DISTANCE_OPTIONS.map((o) => o.id);

function parseList<T extends string>(raw: unknown, allowed: readonly T[]): T[] {
  if (typeof raw !== "string" || raw.trim() === "") return [];
  const seen = new Set<string>();
  const out: T[] = [];
  for (const part of raw.split(",")) {
    const value = part.trim();
    if (!value || seen.has(value)) continue;
    seen.add(value);
    if ((allowed as readonly string[]).includes(value)) out.push(value as T);
  }
  return out;
}

function serializeList(values: readonly string[]): string | undefined {
  return values.length ? values.join(",") : undefined;
}

/** Tolerant: never throws, drops anything that is not a known option. */
export function searchToFilters(search: Partial<FilterSearch> | undefined): ActiveFilters {
  return {
    distance: parseList(search?.d, DISTANCE_VALUES),
    categories: parseList(search?.k, CATEGORY_OPTIONS),
    moods: parseList(search?.h, MOOD_OPTIONS),
    practical: parseList(search?.p, PRACTICAL_OPTIONS),
    durations: parseList(search?.t, DURATION_OPTIONS),
  };
}

/** Empty groups are omitted entirely, so "no filters" means a clean URL. */
export function filtersToSearch(filters: ActiveFilters): FilterSearch {
  const search: FilterSearch = {};
  const d = serializeList(filters.distance);
  const k = serializeList(filters.categories);
  const h = serializeList(filters.moods);
  const p = serializeList(filters.practical);
  const t = serializeList(filters.durations);
  if (d) search.d = d;
  if (k) search.k = k;
  if (h) search.h = h;
  if (p) search.p = p;
  if (t) search.t = t;
  return search;
}
