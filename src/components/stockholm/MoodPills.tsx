import { MOOD_OPTIONS } from "@/data/filters";
import type { MoodTag } from "@/data/types";

const accentClasses: Record<number, string> = {
  0: "bg-moss/10 text-moss ring-moss/15 hover:bg-moss/15",
  1: "bg-lichen/15 text-lichen ring-lichen/20 hover:bg-lichen/25",
  2: "bg-archipelago/10 text-archipelago ring-archipelago/15 hover:bg-archipelago/20",
};

type Props = {
  selected: MoodTag[];
  onToggle: (mood: MoodTag) => void;
};

export function MoodPills({ selected, onToggle }: Props) {
  return (
    <section className="px-5 sm:px-12 mb-8 sm:mb-12">
      <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted/70 mb-5">
        Välj humör
      </h2>
      <div className="flex flex-wrap gap-2.5">
        {MOOD_OPTIONS.map((mood, i) => {
          const isActive = selected.includes(mood);
          const idle = accentClasses[i % 3];
          return (
            <button
              key={mood}
              onClick={() => onToggle(mood)}
              className={[
                "px-5 py-2.5 rounded-full text-sm font-medium ring-1 transition-all",
                isActive
                  ? "bg-moss text-white ring-moss shadow-sm shadow-moss/20"
                  : idle,
              ].join(" ")}
            >
              {mood}
            </button>
          );
        })}
      </div>
    </section>
  );
}
