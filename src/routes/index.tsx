import { Suspense, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { Hero } from "@/components/stockholm/Hero";
import { SiteHeader } from "@/components/stockholm/SiteHeader";
import { MoodPills } from "@/components/stockholm/MoodPills";
import { FilterBar } from "@/components/stockholm/FilterBar";
import { DestinationGrid } from "@/components/stockholm/DestinationGrid";
import { DestinationSheet } from "@/components/stockholm/DestinationSheet";
import { DailyTips } from "@/components/stockholm/DailyTips";
import { SiteFooter } from "@/components/stockholm/SiteFooter";

import { destinationsQueryOptions, useDestinations } from "@/lib/use-destinations";
import { useSavedTrips } from "@/lib/use-saved-trips";
import { emptyFilters, filterDestinations, type ActiveFilters } from "@/lib/filter";
import type { MoodTag } from "@/data/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Stockholm Escapes - Hitta din nästa Stockholmsutflykt" },
      {
        name: "description",
        content:
          "Upptäck snabbt naturpärlor, kulturplatser, caféer, restauranger och skärgårdsöar runt Stockholm — baserat på humör, avstånd och tid.",
      },
      { property: "og:title", content: "Stockholm Escapes" },
      {
        property: "og:description",
        content: "Spontana dagsutflykter runt Stockholm — välj efter humör, restid och plats.",
      },
    ],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(destinationsQueryOptions());
  },
  component: IndexPage,
});

function IndexPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-sand flex items-center justify-center text-ink-muted">Laddar utflykter…</div>
      }
    >
      <Discover />
    </Suspense>
  );
}

function Discover() {
  const { data: destinations } = useDestinations();
  const { savedIds, toggle, isSaved } = useSavedTrips();

  const [filters, setFilters] = useState<ActiveFilters>(emptyFilters);
  const [activeId, setActiveId] = useState<string | null>(null);

  const filtered = useMemo(() => filterDestinations(destinations, filters), [destinations, filters]);

  const activeDestination = useMemo(
    () => destinations.find((d) => d.id === activeId) ?? null,
    [destinations, activeId],
  );

  const savedDestinations = useMemo(
    () =>
      savedIds.map((id) => destinations.find((d) => d.id === id)).filter((d): d is NonNullable<typeof d> => Boolean(d)),
    [savedIds, destinations],
  );

  const toggleMood = (mood: MoodTag) => {
    setFilters({
      ...filters,
      moods: filters.moods.includes(mood) ? filters.moods.filter((m) => m !== mood) : [...filters.moods, mood],
    });
  };

  const scrollToResults = () => {
    document.getElementById("upptack")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main id="innehall" className="min-h-screen bg-sand text-ink overflow-x-hidden">
      <SiteHeader savedCount={savedIds.length} />
      <Hero onFindPlace={scrollToResults} />
      <DailyTips destinations={destinations} onOpen={(id) => setActiveId(id)} />
      <MoodPills selected={filters.moods} onToggle={toggleMood} />
      <FilterBar filters={filters} setFilters={setFilters} resultCount={filtered.length} />
      <DestinationGrid
        destinations={filtered}
        savedIds={savedIds}
        onToggleSave={toggle}
        onOpen={(id) => setActiveId(id)}
        onClear={() => setFilters(emptyFilters)}
      />
      <SiteFooter saved={savedDestinations} />

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
