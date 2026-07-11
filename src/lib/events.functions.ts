import { createServerFn } from "@tanstack/react-start";

import { mapVisitStockholmEvents } from "@/data/events";

export const fetchVisitStockholmEvents = createServerFn({ method: "GET" })
  .handler(async () => {
    try {
      const response = await fetch(
        "https://api.visitstockholm.com/api/public-v1/events/?size=1000",
        {
          headers: {
            Accept: "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error(
          `Visit Stockholm API returned ${response.status} ${response.statusText}`,
        );
      }

      const json = (await response.json()) as { results?: unknown[] };
      const apiEvents = Array.isArray(json.results) ? json.results : [];

      return {
        events: mapVisitStockholmEvents(apiEvents),
        error: undefined as string | undefined,
      };
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Kunde inte hämta evenemang just nu.";

      return {
        events: [],
        error: message,
      };
    }
  });
