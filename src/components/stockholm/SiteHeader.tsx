import { Bookmark, Calendar as CalendarIcon, Map as MapIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";


type Props = {
  onOpenSaved: () => void;
  savedCount: number;
};

export function SiteHeader({ onOpenSaved, savedCount }: Props) {
  return (
    <header className="px-4 sm:px-12 py-4 sm:py-6 flex justify-between items-center gap-3">
      <Link to="/" className="flex items-center gap-2 min-w-0">
        <div className="size-8 shrink-0 rounded-full bg-moss/10 flex items-center justify-center">
          <div className="size-3.5 rounded-sm bg-moss" />
        </div>
        <span className="text-[11px] sm:text-sm font-medium tracking-wide uppercase text-ink truncate">
          Stockholm Day Trips
        </span>
      </Link>
      <nav className="flex items-center gap-1 sm:gap-3 text-sm font-medium shrink-0">
        <Link
          to="/"
          activeOptions={{ exact: true }}
          activeProps={{ className: "text-moss" }}
          className="hidden sm:inline px-3 py-1.5 text-ink-muted hover:text-ink transition-colors"
        >
          Upptäck
        </Link>
        <Link
          to="/karta"
          activeProps={{ className: "text-moss bg-moss/10" }}
          className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-full hover:bg-ink-soft transition-colors text-ink-muted hover:text-ink"
          aria-label="Karta"
        >
          <MapIcon className="size-4" />
          <span className="hidden sm:inline">Karta</span>
        </Link>
        <Link
          to="/evenemang"
          activeProps={{ className: "text-moss bg-moss/10" }}
          className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-full hover:bg-ink-soft transition-colors text-ink-muted hover:text-ink"
          aria-label="Evenemang"
        >
          <CalendarIcon className="size-4" />
          <span className="hidden sm:inline">Evenemang</span>
        </Link>
        <button
          onClick={onOpenSaved}
          className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full hover:bg-ink-soft transition-colors text-ink-muted hover:text-ink"
          aria-label="Sparade"
        >
          <Bookmark className="size-4" />
          <span className="hidden sm:inline">Sparade</span>
          {savedCount > 0 && (
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-moss text-white">
              {savedCount}
            </span>
          )}
        </button>
      </nav>
    </header>
  );
}

