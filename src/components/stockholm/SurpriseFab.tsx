import { Shuffle } from "lucide-react";
import { useState } from "react";

type Props = {
  onSurprise: () => void;
};

export function SurpriseFab({ onSurprise }: Props) {
  const [spin, setSpin] = useState(false);
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
      <button
        onClick={() => {
          setSpin(true);
          onSurprise();
          setTimeout(() => setSpin(false), 600);
        }}
        className="group flex items-center gap-3 pl-5 pr-6 py-3.5 bg-moss text-white rounded-full shadow-xl shadow-moss/20 hover:bg-moss/90 transition-transform hover:scale-[1.02] active:scale-100"
      >
        <Shuffle
          className={[
            "size-4 transition-transform duration-500",
            spin ? "rotate-180" : "group-hover:rotate-12",
          ].join(" ")}
        />
        <span className="font-medium text-sm">Överraska mig idag</span>
      </button>
    </div>
  );
}
