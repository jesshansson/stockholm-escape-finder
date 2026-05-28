// Pure filtering logic — no React, no UI. Easy to test and reuse.

import type {
  Category,
  Destination,
  DistanceRange,
  Duration,
  MoodTag,
  PracticalTag,
} from "@/data/types";

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
