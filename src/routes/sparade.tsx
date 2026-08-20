import { Suspense, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { SiteHeader } from "@/components/stockholm/SiteHeader";
import { DestinationGrid } from "@/components/stockholm/DestinationGrid";
import { DestinationSheet } from "@/components/stockholm/DestinationSheet";

import {
  destinationsQueryOptions,
  useDestinations,
} from "@/lib/use-destinations";
import { useSavedTrips } from "@/lib/use-saved-trips";

export const Route = createFileRoute("/sparade")({
  head: () => ({
    meta: [
      { title: "Sparade utflykter — Stockholm Escapes" },
      {
        name: "description",
        content:
          "Dina sparade utflyktsmål runt Stockholm, samlade på ett ställe i den här webbläsaren.",
      },
      { property: "og:title", content: "Sparade utflykter — Stockholm Escapes" },
      {
        property: "og:description",
        content: "Samla dina favoritutflykter runt Stockholm inför nästa ledig dag.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(destinationsQueryOptions());
  },
  component: SavedPage,
});

function SavedPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-sand flex items-center justify-center text-ink-muted">
          Laddar sparade…
        </div>
      }
    >
      <Saved />
    </Suspense>
  );
}

function Saved() {
  const { data: destinations } = useDestinations();
  const { savedIds, toggle, isSaved } = useSavedTrips();
  const [activeId, setActiveId] = useState<string | null>(null);

  const saved = useMemo(
    () =>
      savedIds
        .map((id) => destinations.find((d) => d.id === id))
        .filter((d): d is NonNullable<typeof d> => Boolean(d)),
    [savedIds, destinations],
  );

  const activeDestination = useMemo(
    () => destinations.find((d) => d.id === activeId) ?? null,
    [destinations, activeId],
  );

  return (
    <main id="innehall" className="min-h-screen bg-sand text-ink overflow-x-hidden">
      <SiteHeader savedCount={savedIds.length} />

      <section className="px-5 sm:px-12 pt-4 sm:pt-8 pb-8">
        <h1
          style={{ fontFamily: "var(--font-serif)" }}
          className="text-4xl sm:text-6xl font-normal tracking-[-0.02em] text-ink mb-3"
        >
          Dina{" "}
          <em
            style={{ fontFamily: "var(--font-serif)" }}
            className="text-moss italic"
          >
            sparade
          </em>{" "}
          utflykter
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-[60ch]">
          {saved.length > 0
            ? `${saved.length} utflyktsmål sparade i den här webbläsaren.`
            : "Dina favoriter sparas i den här webbläsaren."}
        </p>
      </section>

      {saved.length === 0 ? (
        <section className="px-5 sm:px-12 pb-24">
          <div className="bg-surface rounded-[24px] ring-1 ring-black/5 p-10 sm:p-16 text-center max-w-xl mx-auto">
            <h2 className="text-xl font-medium text-ink mb-2">
              Inget sparat än
            </h2>
            <p className="text-sm text-ink-muted mb-6">
              Klicka på bokmärket på ett kort så hamnar utflykten här.
            </p>
            <Link
              to="/"
              className="inline-flex px-5 py-2.5 bg-moss text-white rounded-full text-sm font-medium"
            >
              Upptäck utflykter
            </Link>
          </div>
        </section>
      ) : (
        <DestinationGrid
          destinations={saved}
          savedIds={savedIds}
          onToggleSave={toggle}
          onOpen={(id) => setActiveId(id)}
          onClear={() => {}}
        />
      )}

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
