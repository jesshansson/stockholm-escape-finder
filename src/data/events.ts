import { decode } from "he";
import { z } from "zod";

/**
 * Decode HTML entities from API text and normalise whitespace.
 * Pure and SSR-safe (no DOM access, no dangerouslySetInnerHTML).
 */
export function normalizeApiText(input: string | null | undefined): string {
  if (!input) return "";
  let text = decode(input);
  // Decode once more for double-encoded input (e.g. "&amp;quot;").
  if (/&(#\d+|#x[0-9a-fA-F]+|[a-zA-Z][a-zA-Z0-9]{1,31});/.test(text)) {
    text = decode(text);
  }
  return text
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/[ \t]*\n[ \t]*/g, "\n")
    .trim();
}

/** Same decoding for URLs, but without whitespace collapsing inside the URL. */
export function normalizeApiUrl(input: string | null | undefined): string | undefined {
  if (!input) return undefined;
  const decoded = decode(decode(input)).replace(/\s+/g, "").trim();
  return decoded || undefined;
}

export type EventCategory =
  | "Musik"
  | "Konst"
  | "Mat & Dryck"
  | "Familj"
  | "Sport"
  | "Marknad"
  | "Scen"
  | "Uteliv"
  | "Övrigt";

export type StockholmEvent = {
  id: string;
  title: string;
  category: EventCategory;
  venue: string;
  neighborhood: string;
  time: string;
  description: string;
  priceLabel: string;
  /** True when the event description/title indicates free admission */
  isFree: boolean;
  /** ISO date (YYYY-MM-DD) in Europe/Stockholm */
  date: string;
  /** URL to the event's official page / ticket site */
  url?: string;
};

export const ALL_CATEGORIES: EventCategory[] = [
  "Musik",
  "Konst",
  "Mat & Dryck",
  "Familj",
  "Sport",
  "Marknad",
  "Scen",
  "Uteliv",
  "Övrigt",
];

const apiEventSchema = z.object({
  id: z.string(),
  title: z
    .object({
      sv: z.string().nullable().optional(),
      en: z.string().nullable().optional(),
    })
    .default({}),
  description: z
    .object({
      sv: z.string().nullable().optional(),
      en: z.string().nullable().optional(),
    })
    .default({}),
  external_website_url: z.string().optional(),
  url: z.string().optional(),
  venue_name: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  closest_station: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  start_time: z.string().nullable().optional(),
  end_time: z.string().nullable().optional(),
  categories: z
    .array(
      z.object({
        slug: z.string(),
        title: z.string(),
      }),
    )
    .default([]),
  schedule: z
    .object({
      range: z.string().nullable().optional(),
      dates: z
        .array(
          z.object({
            date: z.string(),
            start_time: z.string().nullable().optional(),
            end_time: z.string().nullable().optional(),
          }),
        )
        .default([]),
    })
    .default({}),
});

const CATEGORY_MAP: Record<string, EventCategory> = {
  music: "Musik",
  "stage-film": "Scen",
  "eat-drink": "Mat & Dryck",
  family: "Familj",
  sports: "Sport",
  fairs: "Marknad",
  exhibitions: "Konst",
  "clubs-parties": "Uteliv",
  festivals: "Scen",
  "guided-tours": "Scen",
  "networking-community": "Uteliv",
  "science-tech": "Familj",
  "careers-leadership": "Övrigt",
};

function mapCategory(slug: string): EventCategory {
  return CATEGORY_MAP[slug] ?? "Övrigt";
}

function formatTime(
  start: string | null | undefined,
  end: string | null | undefined,
): string {
  if (start && end) return `${start}–${end}`;
  if (start) return start;
  if (end) return `slutar ${end}`;
  return "Tid ej angiven";
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max).trimEnd().replace(/\s+\S*$/, "") + "…";
}

const FREE_KEYWORDS = [
  "gratis",
  "fri entré",
  "fri entre",
  "free admission",
  "free entry",
  "kostnadsfri",
  "kostnadsfritt",
  "fritt inträde",
  "fritt intrade",
  "ingen avgift",
  "free of charge",
];

function detectFree(title: string, description: string): boolean {
  const text = `${title} ${description}`.toLowerCase();
  return FREE_KEYWORDS.some((keyword) => text.includes(keyword));
}

export function mapVisitStockholmEvents(apiEvents: unknown[]): StockholmEvent[] {
  const occurrences: StockholmEvent[] = [];

  for (const raw of apiEvents) {
    const parsed = apiEventSchema.safeParse(raw);
    if (!parsed.success) continue;

    const event = parsed.data;
    const title =
      normalizeApiText(event.title.sv) ||
      normalizeApiText(event.title.en) ||
      "Evenemang";
    const description =
      normalizeApiText(event.description.sv) ||
      normalizeApiText(event.description.en) ||
      "";
    const category =
      event.categories.length > 0
        ? mapCategory(event.categories[0].slug)
        : "Övrigt";

    const venue = normalizeApiText(event.venue_name) || "Plats ej angiven";
    const neighborhood =
      normalizeApiText(event.address) ||
      normalizeApiText(event.city) ||
      normalizeApiText(event.closest_station) ||
      "";

    const scheduleDates =
      event.schedule.dates.length > 0
        ? event.schedule.dates
        : [
            {
              date: event.start_date,
              start_time: event.start_time,
              end_time: event.end_time,
            },
          ];

    const isFree = detectFree(title, description);

    for (const slot of scheduleDates) {
      if (!slot.date) continue;
      const time = normalizeApiText(formatTime(slot.start_time, slot.end_time));
      occurrences.push({
        id: `${event.id}--${slot.date}--${slot.start_time ?? "hel"}`,
        title,
        category,
        venue,
        neighborhood,
        time,
        description: truncate(description, 220),
        priceLabel: isFree ? "Gratis" : "Prisinfo på hemsidan",
        isFree,
        date: slot.date,
        url: normalizeApiUrl(event.external_website_url) || normalizeApiUrl(event.url),
      });
    }
  }

  // Sort by date, then time for a stable list.
  occurrences.sort((a, b) => {
    const dateDiff = a.date.localeCompare(b.date);
    if (dateDiff !== 0) return dateDiff;
    return a.time.localeCompare(b.time);
  });

  return occurrences;
}

export const EVENT_SOURCE_ATTRIBUTION = {
  text: "Evenemang från Visit Stockholm",
  url: "https://www.visitstockholm.se/",
  license: "CC BY 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
};
