import { Shuffle, Compass } from "lucide-react";

type Props = {
  onFindPlace: () => void;
  onSurprise: () => void;
};

export function Hero({ onFindPlace, onSurprise }: Props) {
  return (
      <div className="max-w-4xl">
        <h1 className="font-[var(--font-serif)] text-5xl sm:text-7xl font-normal tracking-[-0.02em] leading-[1.02] text-balance mb-6 text-ink">
          Hitta din nästa <em className="not-italic text-moss font-[var(--font-serif)] italic">Stockholms</em>utflykt
        </h1>
        <p className="text-lg sm:text-xl text-ink-muted max-w-[56ch] text-pretty leading-relaxed mb-10">
          Upptäck snabbt naturpärlor, kulturplatser, caféer, restauranger och
          skärgårdsöar — baserat på hur långt du vill åka, vilket humör du är
          på och vilken sorts dag du vill ha.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={onFindPlace}
            className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-sand rounded-full font-medium text-sm ring-1 ring-ink hover:-translate-y-px transition-transform"
          >
            <Compass className="size-4" />
            Hitta en plats
          </button>
          <button
            onClick={onSurprise}
            className="inline-flex items-center gap-2 px-6 py-3 bg-surface text-ink rounded-full font-medium text-sm ring-1 ring-black/5 hover:-translate-y-px transition-transform"
          >
            <Shuffle className="size-4" />
            Överraska mig
          </button>
        </div>
      </div>
    </section>
  );
}
