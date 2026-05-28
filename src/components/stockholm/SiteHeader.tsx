import { Bookmark } from "lucide-react";

type Props = {
  onOpenSaved: () => void;
  savedCount: number;
};

export function SiteHeader({ onOpenSaved, savedCount }: Props) {
  return (
    <header className="px-6 sm:px-12 py-6 flex justify-between items-center">
      <div className="flex items-center gap-2.5">
        <div className="size-8 rounded-full bg-moss/10 flex items-center justify-center">
          <div className="size-3.5 rounded-sm bg-moss" />
        </div>
        <span className="text-sm font-medium tracking-wide uppercase text-ink">
          Stockholm Day Trips
        </span>
      </div>
      <nav className="flex items-center gap-2 sm:gap-6 text-sm font-medium">
        <a href="#upptack" className="hidden sm:inline text-ink hover:text-moss transition-colors">
          Upptäck
        </a>
        <button
          onClick={onOpenSaved}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-ink-soft transition-colors text-ink-muted hover:text-ink"
        >
          <Bookmark className="size-4" />
          <span>Sparade</span>
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
