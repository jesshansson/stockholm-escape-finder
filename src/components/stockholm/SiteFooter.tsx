import { Link } from "@tanstack/react-router";
import { DestinationImage } from "./DestinationImage";
import type { Destination } from "@/data/types";

type Props = {
  saved: Destination[];
};

export function SiteFooter({ saved }: Props) {
  return (
    <footer className="px-5 sm:px-12 py-12 sm:py-14 border-t border-black/5">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <div>
          <h4 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted/70 mb-4">
            Sparat till senare
          </h4>
          <div className="flex gap-3 flex-wrap">
            {saved.slice(0, 5).map((d) => (
              <Link
                key={d.id}
                to="/sparade"
                className="size-16 rounded-xl ring-1 ring-black/5 overflow-hidden"
                aria-label={d.name}
              >
                <DestinationImage
                  src={d.image}
                  name={d.name}
                  width={128}
                  height={128}
                  loading="lazy"
                  className="size-full object-cover"
                />
              </Link>
            ))}
            <Link
              to="/sparade"
              className="size-16 rounded-xl border-2 border-dashed border-ink-muted/30 flex items-center justify-center text-ink-muted/60 hover:border-ink-muted/50 transition-colors"
            >
              <span className="text-xl font-light">+</span>
            </Link>
          </div>
        </div>
        <div className="max-w-xs">
          <p className="text-xs text-ink-muted leading-relaxed">
            Stockholm Escapes — spontana utflykter runt staden, valda efter
            humör, restid och vad du har lust med just idag.
          </p>
        </div>
      </div>
    </footer>
  );
}
