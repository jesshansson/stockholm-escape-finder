import { Bookmark, BookmarkCheck, Clock } from "lucide-react";
import { DestinationImage } from "./DestinationImage";
import type { Destination } from "@/data/types";

type Props = {
  destination: Destination;
  variant?: "default" | "featured";
  saved: boolean;
  onToggleSave: () => void;
  onOpen: () => void;
};

export function DestinationCard({
  destination: d,
  variant = "default",
  saved,
  onToggleSave,
  onOpen,
}: Props) {
  if (variant === "featured") {
    return (
      <article className="col-span-1 md:col-span-2 bg-surface rounded-[24px] ring-1 ring-black/5 overflow-hidden flex flex-col md:flex-row group">
        <div className="md:w-1/2 relative overflow-hidden">
          <button
            type="button"
            onClick={onOpen}
            className="block w-full h-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss focus-visible:ring-inset"
            aria-label={`Öppna ${d.name}`}
          >
            <DestinationImage
              src={d.image}
              name={d.name}
              width={800}
              height={640}
              className="h-full w-full min-h-[260px] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </button>
          {d.imageCredit && (
            <span className="pointer-events-none absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-black/45 text-white text-[9px] font-medium tracking-wide backdrop-blur-sm">
              Foto: {d.imageCredit.author} / {d.imageCredit.source}
            </span>
          )}
        </div>
        <div className="md:w-1/2 p-7 sm:p-9 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-moss mb-1.5 block">
                {d.category}
              </span>
              <h3 className="text-2xl font-medium tracking-tight text-ink">
                {d.name}
              </h3>
            </div>
            <SaveButton saved={saved} onClick={onToggleSave} />
          </div>
          <p className="text-ink-muted text-sm leading-relaxed mb-6 max-w-[44ch] text-pretty">
            {d.description}
          </p>

          <ul className="space-y-2.5 mb-7 text-xs text-ink">
            <li className="flex items-center gap-2.5">
              <Clock className="size-3.5 text-ink-muted shrink-0" />
              {d.travelTime}
            </li>
            <li className="flex items-center gap-2.5">
              <span className="size-1.5 rounded-full bg-moss shrink-0 ml-1" />
              Bra för: {d.bestFor.slice(0, 2).join(", ")}
            </li>
            {(d.foodAvailable || d.cafeAvailable) && (
              <li className="flex items-center gap-2.5">
                <span className="size-1.5 rounded-full bg-lichen shrink-0 ml-1" />
                {d.foodAvailable ? "Restaurang" : "Café"} på plats
              </li>
            )}
          </ul>

          <div className="mt-auto flex gap-2.5">
            <button
              onClick={onOpen}
              className="flex-1 py-2.5 px-4 bg-ink text-sand rounded-lg text-sm font-medium ring-1 ring-ink hover:-translate-y-px transition-transform"
            >
              Visa detaljer
            </button>
            <button
              onClick={onToggleSave}
              className="px-4 py-2.5 bg-ink-soft text-ink rounded-lg text-sm font-medium ring-1 ring-black/5 hover:bg-birch transition-colors"
            >
              {saved ? "Sparad" : "Spara"}
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="bg-surface rounded-[24px] ring-1 ring-black/5 overflow-hidden flex flex-col group">
      {/* "Öppna" and "Spara" are siblings — never nested interactive elements. */}
      <div className="relative overflow-hidden">
        <button
          type="button"
          onClick={onOpen}
          className="block w-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss focus-visible:ring-inset"
          aria-label={`Öppna ${d.name}`}
        >
          <DestinationImage
            src={d.image}
            name={d.name}
            width={800}
            height={640}
            loading="lazy"
            className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </button>
        <div className="absolute top-3 right-3">
          <SaveButton saved={saved} onClick={onToggleSave} />
        </div>
        {d.imageCredit && (
          <span className="pointer-events-none absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-black/45 text-white text-[9px] font-medium tracking-wide backdrop-blur-sm">
            Foto: {d.imageCredit.author} / {d.imageCredit.source}
          </span>
        )}
      </div>
      <div className="p-5 flex flex-col">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted/70 mb-1.5">
          {d.category}
        </span>
        <h3 className="text-xl font-medium tracking-tight text-ink mb-2">
          {d.name}
        </h3>
        <p className="text-ink-muted text-sm leading-relaxed mb-5 line-clamp-3">
          {d.description}
        </p>
        <div className="mt-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium py-1 px-2 bg-ink-soft rounded-md text-ink">
            <Clock className="size-3" />
            {d.travelTime}
          </span>
          <button
            onClick={onOpen}
            className="w-full py-2.5 px-4 bg-ink text-sand rounded-lg text-sm font-medium ring-1 ring-ink hover:-translate-y-px transition-transform"
          >
            Visa detaljer
          </button>
        </div>
      </div>
    </article>
  );
}

function SaveButton({
  saved,
  onClick,
}: {
  saved: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-pressed={saved}
      aria-label={saved ? "Ta bort från sparade" : "Spara"}
      className={[
        "size-9 rounded-full flex items-center justify-center transition-colors ring-1",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
        saved
          ? "bg-moss text-white ring-moss"
          : "bg-surface/95 backdrop-blur text-ink ring-black/5 hover:bg-ink-soft",
      ].join(" ")}
    >
      {saved ? (
        <BookmarkCheck className="size-4" />
      ) : (
        <Bookmark className="size-4" />
      )}
    </button>
  );
}
