import { describe, expect, it } from "vitest";

import {
  mapVisitStockholmEvents,
  normalizeApiText,
  normalizeApiUrl,
} from "./events";

const ENTITY_PATTERN = /&(?:[a-zA-Z][a-zA-Z0-9]{1,31}|#\d+|#x[0-9a-fA-F]+);/;

describe("normalizeApiText", () => {
  it("decodes named, numeric and hex entities", () => {
    expect(normalizeApiText("Jazz &amp; Blues")).toBe("Jazz & Blues");
    expect(normalizeApiText("&quot;Hej&quot;")).toBe('"Hej"');
    expect(normalizeApiText("It&#39;s &apos;fine&apos;")).toBe("It's 'fine'");
    expect(normalizeApiText("18&ndash;22")).toBe("18–22");
    expect(normalizeApiText("18&#x2013;22")).toBe("18–22");
    expect(normalizeApiText("&lt;b&gt;")).toBe("<b>");
  });

  it("normalizes nbsp and repeated whitespace, keeps Swedish chars", () => {
    expect(normalizeApiText("Kungsträdgården&nbsp;  i  Åre")).toBe(
      "Kungsträdgården i Åre",
    );
    expect(normalizeApiText("Ölandsöar ÅÄÖ åäö")).toBe("Ölandsöar ÅÄÖ åäö");
  });
});

describe("normalizeApiUrl", () => {
  it("decodes entity-encoded query strings", () => {
    expect(
      normalizeApiUrl("https://x.se/e?a=1&amp;b=2&amp;utm=x"),
    ).toBe("https://x.se/e?a=1&b=2&utm=x");
    expect(normalizeApiUrl(undefined)).toBeUndefined();
  });
});

describe("mapVisitStockholmEvents", () => {
  const raw = [
    {
      id: "evt-1",
      title: { sv: "Mat &amp; Dryck &quot;Special&quot;" },
      description: {
        sv: "Gratis&nbsp;entré med  vin &amp; ost &#8211; kom i tid.",
      },
      venue_name: "Rosendals Trädgård &amp; Café",
      address: "Rosendalsterrassen&nbsp;12",
      external_website_url: "https://ex.se/e?id=1&amp;ref=vs",
      categories: [{ slug: "eat-drink", title: "Eat" }],
      schedule: {
        dates: [
          { date: "2026-08-14", start_time: "10:00", end_time: "16:00" },
          { date: "2026-08-15", start_time: "10:00", end_time: "16:00" },
        ],
      },
    },
  ];

  const events = mapVisitStockholmEvents(raw);

  it("normalizes all user-facing strings", () => {
    const e = events[0]!;
    expect(e.title).toBe('Mat & Dryck "Special"');
    expect(e.description).toBe("Gratis entré med vin & ost – kom i tid.");
    expect(e.venue).toBe("Rosendals Trädgård & Café");
    expect(e.neighborhood).toBe("Rosendalsterrassen 12");
    expect(e.url).toBe("https://ex.se/e?id=1&ref=vs");
  });

  it("detects free admission on decoded text", () => {
    expect(events[0]!.isFree).toBe(true);
    expect(events[0]!.priceLabel).toBe("Gratis");
  });

  it("gives every occurrence the same clean values", () => {
    expect(events).toHaveLength(2);
    for (const e of events) {
      for (const value of [
        e.title,
        e.description,
        e.venue,
        e.neighborhood,
        e.time,
        e.url ?? "",
      ]) {
        expect(value).not.toMatch(ENTITY_PATTERN);
      }
    }
  });
});
