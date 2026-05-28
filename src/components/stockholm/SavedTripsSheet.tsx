import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { X } from "lucide-react";
import type { Destination } from "@/data/types";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  destinations: Destination[];
  onOpen: (id: string) => void;
  onRemove: (id: string) => void;
};

export function SavedTripsSheet({
  open,
  onOpenChange,
  destinations,
  onOpen,
  onRemove,
}: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md overflow-y-auto bg-sand"
      >
        <SheetHeader>
          <SheetTitle className="text-2xl font-semibold tracking-tight text-ink">
            Sparade utflykter
          </SheetTitle>
          <SheetDescription>
            Dina favoriter sparas i den här webbläsaren.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-3">
          {destinations.length === 0 && (
            <div className="bg-surface rounded-2xl ring-1 ring-black/5 p-6 text-center">
              <p className="text-sm text-ink-muted">
                Du har inte sparat något än. Klicka på bokmärket på ett kort för
                att lägga till det här.
              </p>
            </div>
          )}
          {destinations.map((d) => (
            <div
              key={d.id}
              className="bg-surface rounded-2xl ring-1 ring-black/5 p-3 flex items-center gap-3"
            >
              <button
                onClick={() => onOpen(d.id)}
                className="size-16 rounded-xl overflow-hidden shrink-0"
                aria-label={`Öppna ${d.name}`}
              >
                <img
                  src={d.image}
                  alt={d.name}
                  width={128}
                  height={128}
                  className="size-full object-cover"
                />
              </button>
              <button
                onClick={() => onOpen(d.id)}
                className="flex-1 min-w-0 text-left"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-muted/70">
                  {d.category}
                </p>
                <p className="text-sm font-medium text-ink truncate">{d.name}</p>
                <p className="text-xs text-ink-muted truncate">{d.travelTime}</p>
              </button>
              <button
                onClick={() => onRemove(d.id)}
                aria-label="Ta bort"
                className="size-8 rounded-full hover:bg-ink-soft flex items-center justify-center text-ink-muted"
              >
                <X className="size-4" />
              </button>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
