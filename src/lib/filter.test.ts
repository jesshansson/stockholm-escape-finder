import { describe, expect, it } from "vitest";

import {
  countActiveFilters,
  emptyFilters,
  filterDestinations,
  filtersToSearch,
  searchToFilters,
  type ActiveFilters,
} from "./filter";
import type { Destination } from "@/data/types";

function makeDestination(over: Partial<Destination> & { id: string }): Destination {
  return {
    name: over.id,
    category: "Natur",
    description: "",
    travelTime: "ca 30 min",
    travelMinutes: 30,
    distanceRange: "30-60",
    indoorOutdoor: "Utomhus",
    moodTags: [],
    practicalTags: [],
    seasonTags: ["Året runt"],
    foodAvailable: false,
    cafeAvailable: false,
    publicTransport: false,
    island: false,
    costLevel: 1,
    duration: "Halvdag",
    bestFor: [],
    howToGetThere: "",
    goodToKnow: "",
    whyGo: "",
    whatToDo: "",
    eatAndCoffee: "",
    bestSeason: "",
    image: "",
    ...over,
  } as Destination;
}

const nearMuseum = makeDestination({
  id: "near-museum",
  category: "Museum",
  distanceRange: "0-30",
  travelMinutes: 20,
  indoorOutdoor: "Inomhus",
  moodTags: ["Regnig dag", "Barnvänlig"],
  practicalTags: ["Inomhus", "Lätt med kollektivtrafik", "Mat finns"],
  duration: "1-2 timmar",
});

const island = makeDestination({
  id: "island",
  category: "Skärgårdsö",
  distanceRange: "120+",
  travelMinutes: 150,
  moodTags: ["Solig dag", "Lugn & vacker"],
  practicalTags: ["Utomhus", "Mat finns"],
  duration: "Heldag",
});

const forest = makeDestination({
  id: "forest",
  distanceRange: "30-60",
  moodTags: ["Aktiv"],
  practicalTags: ["Utomhus", "Hundvänligt"],
  duration: "Halvdag",
});

const all = [nearMuseum, island, forest];

function ids(list: Destination[]) {
  return list.map((d) => d.id);
}

describe("filterDestinations", () => {
  it("returns everything when no filter is active", () => {
    expect(ids(filterDestinations(all, emptyFilters))).toEqual([
      "near-museum",
      "island",
      "forest",
    ]);
  });

  it("matches moods with OR — any selected mood is enough", () => {
    const result = filterDestinations(all, {
      ...emptyFilters,
      moods: ["Aktiv", "Regnig dag"],
    });
    expect(ids(result)).toEqual(["near-museum", "forest"]);
  });

  it("matches practical tags with AND — every selected tag must be present", () => {
    expect(
      ids(filterDestinations(all, { ...emptyFilters, practical: ["Utomhus"] })),
    ).toEqual(["island", "forest"]);

    expect(
      ids(
        filterDestinations(all, {
          ...emptyFilters,
          practical: ["Utomhus", "Mat finns"],
        }),
      ),
    ).toEqual(["island"]);
  });

  it("filters on distance, category and duration", () => {
    expect(
      ids(filterDestinations(all, { ...emptyFilters, distance: ["0-30", "30-60"] })),
    ).toEqual(["near-museum", "forest"]);

    expect(
      ids(filterDestinations(all, { ...emptyFilters, categories: ["Skärgårdsö"] })),
    ).toEqual(["island"]);

    expect(
      ids(filterDestinations(all, { ...emptyFilters, durations: ["Heldag"] })),
    ).toEqual(["island"]);
  });

  it("combines filter groups with AND across groups", () => {
    const result = filterDestinations(all, {
      ...emptyFilters,
      distance: ["0-30"],
      moods: ["Regnig dag", "Aktiv"],
      practical: ["Inomhus"],
    });
    expect(ids(result)).toEqual(["near-museum"]);
  });

  it("can end up with no matches", () => {
    expect(
      filterDestinations(all, { ...emptyFilters, categories: ["Café"] }),
    ).toHaveLength(0);
  });
});

describe("countActiveFilters", () => {
  it("counts every selected value across all groups", () => {
    expect(countActiveFilters(emptyFilters)).toBe(0);
    expect(
      countActiveFilters({
        distance: ["0-30"],
        categories: ["Natur", "Museum"],
        moods: ["Aktiv"],
        practical: [],
        durations: ["Heldag"],
      }),
    ).toBe(5);
  });
});

describe("URL serialization", () => {
  const filters: ActiveFilters = {
    distance: ["0-30"],
    categories: ["Natur", "Slott / historisk plats"],
    moods: ["Aktiv"],
    practical: ["Utomhus", "Hundvänligt"],
    durations: ["Halvdag"],
  };

  it("round-trips a full set of filters", () => {
    expect(searchToFilters(filtersToSearch(filters))).toEqual(filters);
  });

  it("omits empty groups so 'no filters' means a clean URL", () => {
    expect(filtersToSearch(emptyFilters)).toEqual({});
    expect(filtersToSearch({ ...emptyFilters, moods: ["Aktiv"] })).toEqual({
      h: "Aktiv",
    });
  });

  it("drops unknown, empty and duplicate values instead of throwing", () => {
    expect(
      searchToFilters({
        d: "0-30,inte-en-distans,,0-30",
        k: "Natur,Rymden",
        h: " Aktiv , Påhitt ",
        p: "Hundvänligt",
        t: "Evighet",
      }),
    ).toEqual({
      distance: ["0-30"],
      categories: ["Natur"],
      moods: ["Aktiv"],
      practical: ["Hundvänligt"],
      durations: [],
    });
  });

  it("tolerates missing, empty and non-string params", () => {
    expect(searchToFilters(undefined)).toEqual(emptyFilters);
    expect(searchToFilters({})).toEqual(emptyFilters);
    expect(
      searchToFilters({ d: "", k: 42, h: null } as never),
    ).toEqual(emptyFilters);
  });

  it("is idempotent — normalizing an already-normalized search is a no-op", () => {
    const once = filtersToSearch(searchToFilters({ h: "Aktiv,Skräp" }));
    const twice = filtersToSearch(searchToFilters(once));
    expect(twice).toEqual(once);
  });
});
