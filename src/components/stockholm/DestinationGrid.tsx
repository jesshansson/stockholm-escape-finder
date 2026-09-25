import type { Destination } from "@/data/types";
import { DestinationCard } from "./DestinationCard";

type Props = {
  destinations: Destination[];
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onOpen: (id: string) => void;
  onClear: () => void;
};

export function DestinationGrid({
  destinations,
  savedIds,
  onToggleSave,
  onOpen,
  onClear,
}: Props) {
  if (destinations.length === 0) {
    return (
      <section id="upptack" className="px-5 sm:px-12 pb-36 sm:pb-32">
        <div className="bg-surface rounded-[24px] ring-1 ring-black/5 p-10 sm:p-16 text-center max-w-xl mx-auto">
          <h3 className="text-xl font-medium text-ink mb-2">
            Inga platser matchar
          </h3>
          <p className="text-sm text-ink-muted mb-6">
            Testa att rensa några filter — det finns gott om utflykter att välja på.
          </p>
          <button
            onClick={onClear}
            className="px-5 py-2.5 bg-moss text-white rounded-full text-sm font-medium"
          >
            Rensa filter
          </button>
        </div>
      </section>
    );
  }

  // Rotate the spotlight daily: a different destination is featured each day.
  const now = new Date();
  const dayIndex = Math.floor(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86_400_000,
  );
  const start = dayIndex % destinations.length;
  const ordered = [...destinations.slice(start), ...destinations.slice(0, start)];

  return (
    <section id="upptack" className="px-5 sm:px-12 pb-36 sm:pb-32">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">

        {ordered.map((d, i) => (
          <DestinationCard
            key={d.id}
            destination={d}
            variant={i === 0 ? "featured" : "default"}
            saved={savedIds.includes(d.id)}
            onToggleSave={() => onToggleSave(d.id)}
            onOpen={() => onOpen(d.id)}
          />
        ))}
      </div>
    </section>
  );
}
