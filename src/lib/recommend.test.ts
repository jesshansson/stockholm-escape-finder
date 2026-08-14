import { describe, expect, it } from "vitest";

import { recommendDestinations, SEASON_DEFINITE } from "./recommend";
import type { WeatherSummary } from "./weather";
import { getSeason, isWetCode, weatherLabel } from "./weather";
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

const outdoorNear = makeDestination({
  id: "outdoor-near",
  indoorOutdoor: "Utomhus",
  travelMinutes: 25,
  publicTransport: true,
});

const museumIndoor = makeDestination({
  id: "museum-indoor",
  category: "Museum",
  indoorOutdoor: "Inomhus",
  travelMinutes: 20,
  cafeAvailable: true,
  publicTransport: true,
});

const beachFar = makeDestination({
  id: "beach-far",
  category: "Badplats",
  indoorOutdoor: "Utomhus",
  travelMinutes: 150,
  seasonTags: ["Sommar"],
  island: true,
});

const destinations = [outdoorNear, museumIndoor, beachFar];

const summer = new Date("2026-07-15T10:00:00Z");
const winter = new Date("2026-01-15T10:00:00Z");

function weather(over: Partial<WeatherSummary>): WeatherSummary {
  return {
    temperatureC: 18,
    maxTemperatureC: 20,
    precipitationMm: 0,
    precipitationChance: 5,
    isWet: false,
    code: 0,
    label: "Klart",
    ...over,
  };
}

describe("weather helpers", () => {
  it("labels WMO codes in Swedish", () => {
    expect(weatherLabel(0)).toBe("Klart");
    expect(weatherLabel(61)).toBe("Regn");
    expect(weatherLabel(75)).toBe("Snö");
  });

  it("detects wet codes", () => {
    expect(isWetCode(0)).toBe(false);
    expect(isWetCode(3)).toBe(false);
    expect(isWetCode(61)).toBe(true);
  });

  it("derives the Swedish season", () => {
    expect(getSeason(summer)).toBe("Sommar");
    expect(getSeason(winter)).toBe("Vinter");
  });
});

describe("season wording", () => {
  it("uses correct Swedish definite forms", () => {
    expect(SEASON_DEFINITE).toEqual({
      "Vår": "våren",
      Sommar: "sommaren",
      "Höst": "hösten",
      Vinter: "vintern",
    });
  });

  it("reads naturally in a recommendation reason", () => {
    const autumn = new Date("2026-10-10T10:00:00Z");
    const [tip] = recommendDestinations(
      [makeDestination({ id: "autumn-walk", seasonTags: ["Höst"] })],
      { weather: null, date: autumn },
    );
    expect(tip!.reason).toContain("fin nu på hösten");
    expect(tip!.reason).not.toContain("höst" + "en" + "en");
  });
});

describe("recommendDestinations", () => {
  it("prefers outdoor places in dry weather", () => {
    const [first] = recommendDestinations(destinations, {
      weather: weather({ isWet: false, temperatureC: 18, maxTemperatureC: 19 }),
      date: summer,
    });
    expect(first!.destination.id).toBe("outdoor-near");
    expect(first!.reason).toContain("torrt väder och utomhus");
    expect(first!.reason.startsWith("Bra idag:")).toBe(true);
  });

  it("prefers indoor places in rainy weather", () => {
    const [first] = recommendDestinations(destinations, {
      weather: weather({
        isWet: true,
        code: 61,
        label: "Regn",
        precipitationMm: 4,
        precipitationChance: 90,
      }),
      date: summer,
    });
    expect(first!.destination.id).toBe("museum-indoor");
    expect(first!.reason).toContain("passar en regnig dag");
  });

  it("prefers indoor and avoids swimming spots when it is cold", () => {
    const results = recommendDestinations(destinations, {
      weather: weather({ temperatureC: -3, maxTemperatureC: 0, isWet: false }),
      date: winter,
    });
    expect(results[0]!.destination.id).toBe("museum-indoor");
    expect(results[0]!.reason).toContain("kallt ute");
    expect(results[results.length - 1]!.destination.id).toBe("beach-far");
  });

  it("falls back to season and travel time without weather", () => {
    const results = recommendDestinations(destinations, {
      weather: null,
      date: summer,
    });
    expect(results).toHaveLength(3);
    expect(results[0]!.reason.startsWith("Tips:")).toBe(true);
    expect(results[0]!.reason).toContain("min bort");
    expect(results[0]!.destination.travelMinutes).toBeLessThanOrEqual(30);
  });

  it("respects the requested count", () => {
    expect(
      recommendDestinations(destinations, { weather: null, date: summer, count: 2 }),
    ).toHaveLength(2);
  });
});
