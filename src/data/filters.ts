// All filter options, in one place. UI components map over these arrays so
// adding/removing a filter never requires touching a component.

import type {
  Category,
  DistanceRange,
  Duration,
  MoodTag,
  PracticalTag,
} from "./types";

export const DISTANCE_OPTIONS: { id: DistanceRange; label: string }[] = [
  { id: "0-30", label: "0–30 min" },
  { id: "30-60", label: "30–60 min" },
  { id: "60-120", label: "1–2 timmar" },
  { id: "120+", label: "2+ timmar / skärgårdsäventyr" },
];

export const CATEGORY_OPTIONS: Category[] = [
  "Natur",
  "Kultur",
  "Skärgårdsö",
  "Museum",
  "Slott / historisk plats",
  "Utsiktsplats",
  "Vandringsled",
  "Badplats",
  "Café",
  "Restaurang",
  "Småstad / by",
];

export const MOOD_OPTIONS: MoodTag[] = [
  "Lugn & vacker",
  "Mysig",
  "Romantisk",
  "Barnvänlig",
  "Aktiv",
  "Regnig dag",
  "Solig dag",
  "Budgetvänlig",
  "Lite lyxigt",
  "Fotovänlig",
];

export const PRACTICAL_OPTIONS: PracticalTag[] = [
  "Inomhus",
  "Utomhus",
  "Lätt med kollektivtrafik",
  "Mat finns",
  "Café i närheten",
  "Hundvänligt",
  "Barnvänligt",
  "Bra på vintern",
  "Bra på sommaren",
];

export const DURATION_OPTIONS: Duration[] = [
  "1-2 timmar",
  "Halvdag",
  "Heldag",
];
