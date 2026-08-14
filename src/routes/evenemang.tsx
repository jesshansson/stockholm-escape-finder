import { useMemo, useState } from "react";
import {
  createFileRoute,
  Link,
  useRouter,
} from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { format, isSameDay, parseISO } from "date-fns";
import { sv } from "date-fns/locale";
import {
  CalendarIcon,
  Clock,
  ExternalLink,
  MapPin,
  Ticket,
} from "lucide-react";

import { SiteHeader } from "@/components/stockholm/SiteHeader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  ALL_CATEGORIES,
  EVENT_SOURCE_ATTRIBUTION,
  type EventCategory,
  type StockholmEvent,
} from "@/data/events";
import { fetchVisitStockholmEvents } from "@/lib/events.functions";
import { useSavedTrips } from "@/lib/use-saved-trips";

const eventsQueryOptions = queryOptions({
  queryKey: ["visit-stockholm-events"],
  queryFn: () => fetchVisitStockholmEvents(),
  staleTime: 5 * 60 * 1000,
});

export const Route = createFileRoute("/evenemang")({
  head: () => ({
    meta: [
      { title: "Evenemang i Stockholm — Stockholm Escapes" },
      {
        name: "description",
        content:
          "Vad händer i Stockholm idag? Konserter, marknader, utställningar och uteliv — välj dag i kalendern.",
      },
      { property: "og:title", content: "Evenemang i Stockholm" },
      {
        property: "og:description",
        content:
          "Utforska evenemang i Stockholm dag för dag — musik, konst, mat och mer.",
      },
    ],
  }),
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(eventsQueryOptions),
  component: EventsPage,
  errorComponent: EventsError,
  notFoundComponent: EventsNotFound,
});

function EventsError({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-sand text-ink">
      <SiteHeader onOpenSaved={() => {}} savedCount={0} />
      <div className="px-5 sm:px-12 pt-8 pb-32">
        <div className="bg-surface rounded-[24px] ring-1 ring-black/5 p-10 sm:p-16 text-center max-w-xl mx-auto">
          <h2 className="text-xl font-medium text-ink mb-2">
            Evenemangen kunde inte laddas
          </h2>
          <p className="text-sm text-ink-muted mb-6">
            {error.message || "Något gick fel när vi hämtade evenemangen."}
          </p>
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="px-5 py-2.5 bg-moss text-white rounded-full text-sm font-medium"
          >
            Försök igen
          </button>
        </div>
      </div>
    </main>
  );
}

function EventsNotFound() {
  return (
    <main className="min-h-screen bg-sand text-ink">
      <SiteHeader onOpenSaved={() => {}} savedCount={0} />
      <div className="px-5 sm:px-12 pt-8 pb-32">
        <div className="bg-surface rounded-[24px] ring-1 ring-black/5 p-10 sm:p-16 text-center max-w-xl mx-auto">
          <h2 className="text-xl font-medium text-ink mb-2">
            Inga evenemang hittades
          </h2>
          <p className="text-sm text-ink-muted">
            Prova en annan dag eller ta bort några kategorier.
          </p>
        </div>
      </div>
    </main>
  );
}

function EventsPage() {
  const { savedIds } = useSavedTrips();
  const { data } = useSuspenseQuery(eventsQueryOptions);
  const { events, error } = data;

  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  const [activeCats, setActiveCats] = useState<EventCategory[]>([]);
  const [freeOnly, setFreeOnly] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);

  const dayEvents = useMemo<StockholmEvent[]>(() => {
    return events
      .filter((e: StockholmEvent) => isSameDay(parseISO(e.date), selectedDate))
      .filter(
        (e: StockholmEvent) =>
          activeCats.length === 0 || activeCats.includes(e.category),
      )
      .filter((e: StockholmEvent) => !freeOnly || e.isFree)
      .sort((a: StockholmEvent, b: StockholmEvent) =>
        a.time.localeCompare(b.time),
      );
  }, [events, selectedDate, activeCats, freeOnly]);

  const isToday = isSameDay(selectedDate, new Date());

  const toggleCat = (c: EventCategory) => {
    setActiveCats((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c],
    );
  };

  return (
    <main className="min-h-screen bg-sand text-ink">
      <SiteHeader onOpenSaved={() => {}} savedCount={savedIds.length} />

      <section className="px-5 sm:px-12 pt-4 sm:pt-8 pb-8">
        <h1
          style={{ fontFamily: "var(--font-serif)" }}
          className="text-4xl sm:text-6xl font-normal tracking-[-0.02em] text-ink mb-3"
        >
          Vad händer i{" "}
          <em
            style={{ fontFamily: "var(--font-serif)" }}
            className="text-moss italic"
          >
            Stockholm
          </em>
        </h1>
        <p className="text-sm sm:text-base text-ink-muted max-w-[60ch]">
          Välj en dag i kalendern för att se konserter, marknader, utställningar
          och annat som pågår runt om i stan.
        </p>
      </section>

      <section className="px-5 sm:px-12 mb-6 flex flex-wrap items-center gap-3">
        <Popover open={pickerOpen} onOpenChange={setPickerOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "h-11 rounded-full bg-surface ring-1 ring-black/5 border-0 px-5 gap-2 text-sm font-medium",
              )}
            >
              <CalendarIcon className="size-4 text-moss" />
              {format(selectedDate, "EEEE d MMMM", { locale: sv })}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 rounded-2xl" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(d) => {
                if (d) {
                  setSelectedDate(d);
                  setPickerOpen(false);
                }
              }}
              initialFocus
              locale={sv}
              weekStartsOn={1}
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>

        {!isToday && (
          <button
            onClick={() => setSelectedDate(new Date())}
            className="h-11 rounded-full px-4 text-sm text-ink-muted hover:text-ink hover:bg-ink-soft transition-colors"
          >
            Tillbaka till idag
          </button>
        )}

        <div className="ml-auto text-[11px] text-ink-muted">
          {dayEvents.length} evenemang
        </div>
      </section>

      <section className="px-5 sm:px-12 mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setFreeOnly((v) => !v)}
          className={cn(
            "px-3 py-1.5 rounded-full text-xs ring-1 transition-colors",
            freeOnly
              ? "bg-moss text-white ring-moss"
              : "bg-surface text-ink-muted ring-black/5 hover:bg-ink-soft",
          )}
        >
          Gratis
        </button>
        {ALL_CATEGORIES.map((c) => {
          const active = activeCats.includes(c);
          return (
            <button
              key={c}
              onClick={() => toggleCat(c)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs ring-1 transition-colors",
                active
                  ? "bg-moss text-white ring-moss"
                  : "bg-surface text-ink-muted ring-black/5 hover:bg-ink-soft",
              )}
            >
              {c}
            </button>
          );
        })}
      </section>

      {error && (
        <section className="px-5 sm:px-12 mb-6">
          <div className="bg-surface rounded-2xl ring-1 ring-black/5 p-4 text-sm text-ink-muted">
            Obs: {error}
          </div>
        </section>
      )}

      <section className="px-5 sm:px-12 pb-32">
        {dayEvents.length === 0 ? (
          <div className="bg-surface rounded-[24px] ring-1 ring-black/5 p-10 sm:p-16 text-center max-w-xl mx-auto">
            <h3 className="text-xl font-medium text-ink mb-2">
              Inga evenemang hittades
            </h3>
            <p className="text-sm text-ink-muted mb-6">
              Prova en annan dag, ta bort några kategorier eller slå av
              Gratis-filtret.
            </p>
            <button
              onClick={() => {
                setSelectedDate(new Date());
                setActiveCats([]);
                setFreeOnly(false);
              }}
              className="px-5 py-2.5 bg-moss text-white rounded-full text-sm font-medium"
            >
              Visa idag
            </button>
          </div>
        ) : (
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {dayEvents.map((e: StockholmEvent) => (
              <li
                key={e.id}
                className="bg-surface rounded-3xl ring-1 ring-black/5 p-6 flex flex-col gap-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-moss">
                    {e.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink">
                    <Clock className="size-3.5 text-ink-muted" />
                    {e.time}
                  </span>
                </div>
                <h2
                  style={{ fontFamily: "var(--font-serif)" }}
                  className="text-2xl leading-tight text-ink"
                >
                  {e.title}
                </h2>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {e.description}
                </p>
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-ink-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-3.5" />
                    {e.venue}
                    {e.neighborhood ? `, ${e.neighborhood}` : null}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Ticket className="size-3.5" />
                    {e.priceLabel}
                  </span>
                </div>
                {e.url ? (
                  <a
                    href={e.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 self-start rounded-full bg-moss/10 px-4 py-2 text-sm font-medium text-moss hover:bg-moss/20 transition-colors"
                  >
                    Läs mer
                    <ExternalLink className="size-3.5" />
                  </a>
                ) : null}
              </li>
            ))}
          </ol>
        )}
      </section>

      <div className="px-5 sm:px-12 pb-8 text-center">
        <p className="text-xs text-ink-muted mb-4">
          <a
            href={EVENT_SOURCE_ATTRIBUTION.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-ink"
          >
            {EVENT_SOURCE_ATTRIBUTION.text}
          </a>
          {" "}— licensierat under{" "}
          <a
            href={EVENT_SOURCE_ATTRIBUTION.licenseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-ink"
          >
            {EVENT_SOURCE_ATTRIBUTION.license}
          </a>
          .
        </p>
        <Link
          to="/"
          className="text-sm text-ink-muted hover:text-ink transition-colors"
        >
          ← Tillbaka till utflykter
        </Link>
      </div>
    </main>
  );
}
