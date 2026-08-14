import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CATEGORY_OPTIONS,
  DISTANCE_OPTIONS,
  DURATION_OPTIONS,
  PRACTICAL_OPTIONS,
} from "@/data/filters";
import type {
  Category,
  DistanceRange,
  Duration,
  PracticalTag,
} from "@/data/types";
import type { ActiveFilters } from "@/lib/filter";
import { countActiveFilters } from "@/lib/filter";

type Props = {
  filters: ActiveFilters;
  setFilters: (next: ActiveFilters) => void;
  resultCount: number;
};

function toggle<T>(arr: T[], val: T): T[] {
  return arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];
}

export function FilterBar({ filters, setFilters, resultCount }: Props) {
  const [open, setOpen] = useState(false);
  const total = countActiveFilters(filters);

  return (
    <section className="px-5 sm:px-12 mb-8 sticky top-2 z-30">
      <div className="bg-surface/85 backdrop-blur-md rounded-2xl ring-1 ring-black/5 p-2 flex items-center gap-2 overflow-x-auto">
        <div className="px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-muted/70 border-r border-ink-soft mr-1 shrink-0">
          Restid
        </div>

        <div className="flex gap-1 shrink-0">
          {DISTANCE_OPTIONS.map((d) => {
            const active = filters.distance.includes(d.id);
            return (
              <button
                key={d.id}
                type="button"
                aria-pressed={active}
                onClick={() =>
                  setFilters({
                    ...filters,
                    distance: toggle<DistanceRange>(filters.distance, d.id),
                  })
                }
                className={[
                  "whitespace-nowrap px-3 py-1.5 rounded-lg text-sm transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss",
                  active
                    ? "bg-moss/10 text-moss font-medium"
                    : "text-ink-muted hover:bg-ink-soft",
                ].join(" ")}
              >
                {d.label}
              </button>
            );
          })}
        </div>

        <div className="h-5 w-px bg-ink-soft mx-1 shrink-0" />

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button className="inline-flex items-center gap-2 whitespace-nowrap px-3 py-1.5 rounded-lg text-sm text-ink hover:bg-ink-soft transition-colors shrink-0">
              <SlidersHorizontal className="size-4" />
              Fler filter
              {total > 0 && (
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-moss text-white">
                  {total}
                </span>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="w-[min(92vw,420px)] max-h-[70vh] overflow-y-auto p-5 rounded-2xl"
          >
            <FilterGroup label="Typ av plats">
              {CATEGORY_OPTIONS.map((c) => (
                <Chip
                  key={c}
                  active={filters.categories.includes(c)}
                  onClick={() =>
                    setFilters({
                      ...filters,
                      categories: toggle<Category>(filters.categories, c),
                    })
                  }
                >
                  {c}
                </Chip>
              ))}
            </FilterGroup>

            <FilterGroup label="Praktiskt">
              {PRACTICAL_OPTIONS.map((p) => (
                <Chip
                  key={p}
                  active={filters.practical.includes(p)}
                  onClick={() =>
                    setFilters({
                      ...filters,
                      practical: toggle<PracticalTag>(filters.practical, p),
                    })
                  }
                >
                  {p}
                </Chip>
              ))}
            </FilterGroup>

            <FilterGroup label="Varaktighet">
              {DURATION_OPTIONS.map((d) => (
                <Chip
                  key={d}
                  active={filters.durations.includes(d)}
                  onClick={() =>
                    setFilters({
                      ...filters,
                      durations: toggle<Duration>(filters.durations, d),
                    })
                  }
                >
                  {d}
                </Chip>
              ))}
            </FilterGroup>

            {total > 0 && (
              <button
                onClick={() =>
                  setFilters({
                    distance: [],
                    categories: [],
                    moods: [],
                    practical: [],
                    durations: [],
                  })
                }
                className="mt-4 inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-ink"
              >
                <X className="size-3" />
                Rensa alla filter
              </button>
            )}
          </PopoverContent>
        </Popover>

        <div className="ml-auto pl-2 text-[11px] text-ink-muted whitespace-nowrap shrink-0">
          {resultCount} platser
        </div>
      </div>
    </section>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5 last:mb-0">
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-muted/70 mb-3">
        {label}
      </h3>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={[
        "px-3 py-1.5 rounded-full text-xs ring-1 transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss focus-visible:ring-offset-2",
        active
          ? "bg-moss text-white ring-moss"
          : "bg-surface text-ink-muted ring-black/5 hover:bg-ink-soft",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
