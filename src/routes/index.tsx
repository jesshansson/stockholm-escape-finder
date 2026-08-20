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
import {
  emptyFilters,
  filterDestinations,
  filtersToSearch,
  searchToFilters,
  type ActiveFilters,
  type FilterSearch,
} from "@/lib/filter";
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
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://stockholmsutflykter.netlify.app/" },
    ],
    links: [
      { rel: "canonical", href: "https://stockholmsutflykter.netlify.app/" },
    ],
  }),
  // Tolerant by design: unknown/malformed params are normalized away instead
  // of throwing, so an outdated or hand-edited link still renders the page.
  validateSearch: (search: Record<string, unknown>): FilterSearch =>
    filtersToSearch(searchToFilters(search as Partial<FilterSearch>)),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(destinationsQueryOptions());
  },
  component: IndexPage,
});

function IndexPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-sand flex items-center justify-center text-ink-muted">
          Laddar utflykter…
        </div>
      }
    >
      <Discover />
    </Suspense>
  );
}

function Discover() {
  const { data: destinations } = useDestinations();
  const { savedIds, toggle, isSaved } = useSavedTrips();

  // Filters live in the URL, so a filtered view can be shared and survives reload.
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const filters = useMemo(() => searchToFilters(search), [search]);

  const setFilters = (next: ActiveFilters) => {
    // `replace` keeps the back button meaningful (page-level, not per click).
    navigate({ to: ".", search: filtersToSearch(next), replace: true });
  };

  const [activeId, setActiveId] = useState<string | null>(null);

  const filtered = useMemo(
    () => filterDestinations(destinations, filters),
    [destinations, filters],
  );

  const activeDestination = useMemo(
    () => destinations.find((d) => d.id === activeId) ?? null,
    [destinations, activeId],
  );

  const savedDestinations = useMemo(
    () =>
      savedIds
        .map((id) => destinations.find((d) => d.id === id))
        .filter((d): d is NonNullable<typeof d> => Boolean(d)),
    [savedIds, destinations],
  );

  const toggleMood = (mood: MoodTag) => {
    setFilters({
      ...filters,
      moods: filters.moods.includes(mood)
        ? filters.moods.filter((m) => m !== mood)
        : [...filters.moods, mood],
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
