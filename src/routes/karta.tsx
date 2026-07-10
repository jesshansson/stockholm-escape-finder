import { Suspense, useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { SiteHeader } from "@/components/stockholm/SiteHeader";
import { DestinationMap } from "@/components/stockholm/DestinationMap";
import { DestinationSheet } from "@/components/stockholm/DestinationSheet";
import { SavedTripsSheet } from "@/components/stockholm/SavedTripsSheet";
import { destinationCoordinates } from "@/data/coordinates";
import { useDestinations } from "@/lib/use-destinations";
import { useSavedTrips } from "@/lib/use-saved-trips";

export const Route = createFileRoute("/karta")({
  head: () => ({
    meta: [
      { title: "Karta — Stockholm Day Trips" },
      {
        name: "description",
        content:
          "Se alla utflyktsmål runt Stockholm på en interaktiv karta — välj en pin för att läsa mer om platsen.",
      },
      { property: "og:title", content: "Karta — Stockholm Day Trips" },
      {
        property: "og:description",
        content:
          "Interaktiv karta över dagsutflykter runt Stockholm — naturpärlor, skärgårdsöar, slott och småstäder.",
      },
    ],
  }),
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
  const { data: destinations } = useDestinations();
  const { savedIds, toggle, remove, isSaved } = useSavedTrips();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [savedOpen, setSavedOpen] = useState(false);

  const mapped = destinations.filter((d) => destinationCoordinates[d.id]);
  const activeDestination = destinations.find((d) => d.id === activeId) ?? null;
  const savedDestinations = savedIds
    .map((id) => destinations.find((d) => d.id === id))
    .filter((d): d is NonNullable<typeof d> => Boolean(d));

  return (
    <main className="min-h-screen flex flex-col bg-sand text-ink">
      <SiteHeader
        onOpenSaved={() => setSavedOpen(true)}
        savedCount={savedIds.length}
      />
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
      <SavedTripsSheet
        open={savedOpen}
        onOpenChange={setSavedOpen}
        destinations={savedDestinations}
        onOpen={(id) => {
          setSavedOpen(false);
          setActiveId(id);
        }}
        onRemove={remove}
      />
    </main>
  );
}
