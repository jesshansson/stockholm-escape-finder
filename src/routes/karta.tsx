import { Suspense, useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { SiteHeader } from "@/components/stockholm/SiteHeader";
import { DestinationMap } from "@/components/stockholm/DestinationMap";
import { DestinationSheet } from "@/components/stockholm/DestinationSheet";
import { destinationCoordinates } from "@/data/coordinates";
import { useDestinations } from "@/lib/use-destinations";
import { useSavedTrips } from "@/lib/use-saved-trips";

export const Route = createFileRoute("/karta")({
  head: () => ({
    meta: [
      { title: "Karta — Stockholm Escapes" },
      {
        name: "description",
        content:
          "Se alla utflyktsmål runt Stockholm på en interaktiv karta — välj en pin för att läsa mer om platsen.",
      },
      { property: "og:title", content: "Karta — Stockholm Escapes" },
      {
        property: "og:description",
        content:
          "Interaktiv karta över dagsutflykter runt Stockholm — naturpärlor, skärgårdsöar, slott och småstäder.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://stockholmsutflykter.netlify.app/karta" },
    ],
    links: [
      { rel: "canonical", href: "https://stockholmsutflykter.netlify.app/karta" },
    ],
  }),
  validateSearch: z.object({ d: z.string().optional() }),
  component: MapPage,
});

function MapPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-sand flex items-center justify-center text-ink-muted">
          Laddar karta…
        </div>
      }
    >
      <MapView />
    </Suspense>
  );
}

function MapView() {
  const { d: initialId } = Route.useSearch();
  const { data: destinations } = useDestinations();
  const { savedIds, toggle, isSaved } = useSavedTrips();
  const [activeId, setActiveId] = useState<string | null>(initialId ?? null);

  useEffect(() => {
    if (initialId) setActiveId(initialId);
  }, [initialId]);

  // Stable identity — a new array each render would tear down and rebuild
  // every map marker (and close the open popup) on unrelated state changes.
  const mapped = useMemo(
    () => destinations.filter((d) => destinationCoordinates[d.id]),
    [destinations],
  );
  const activeDestination = destinations.find((d) => d.id === activeId) ?? null;

  return (
    <main id="innehall" className="min-h-screen flex flex-col bg-sand text-ink">
      <SiteHeader savedCount={savedIds.length} />
      <section className="px-5 sm:px-12 pb-4 sm:pb-6">
        <h1
          style={{ fontFamily: "var(--font-serif)" }}
          className="text-3xl sm:text-5xl font-normal tracking-[-0.02em] text-ink mb-2"
        >
          Utflykter på <em style={{ fontFamily: "var(--font-serif)" }} className="text-moss italic">kartan</em>
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-[60ch]">
          Klicka på en pin för att läsa mer om platsen. {mapped.length} utflyktsmål
          runt Stockholm.
        </p>
      </section>
      <div className="flex-1 px-5 sm:px-12 pb-12">
        <div className="h-[calc(100vh-260px)] min-h-[420px] w-full rounded-3xl overflow-hidden ring-1 ring-black/5 bg-surface">
          <DestinationMap
            destinations={mapped}
            activeId={activeId}
            onSelect={(id) => setActiveId(id)}
          />
        </div>
      </div>

      <DestinationSheet
        destination={activeDestination}
        open={activeId !== null}
        onOpenChange={(open) => !open && setActiveId(null)}
        saved={activeDestination ? isSaved(activeDestination.id) : false}
        onToggleSave={() => activeDestination && toggle(activeDestination.id)}
      />
    </main>
  );
}
