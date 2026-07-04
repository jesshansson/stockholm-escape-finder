import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Bookmark, BookmarkCheck, Clock, MapPin } from "lucide-react";
import type { Destination } from "@/data/types";

type Props = {
  destination: Destination | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  saved: boolean;
  onToggleSave: () => void;
};

export function DestinationSheet({
  destination: d,
  open,
  onOpenChange,
  saved,
  onToggleSave,
}: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-xl overflow-y-auto p-0 bg-sand"
      >
        {d && (
          <>
            <div className="relative">
              <img
                src={d.image}
                alt={d.name}
                width={800}
                height={640}
                className="w-full aspect-[16/10] object-cover"
              />
              <button
                onClick={onToggleSave}
                aria-label={saved ? "Ta bort från sparade" : "Spara"}
                className={[
                  "absolute top-4 right-14 size-10 rounded-full flex items-center justify-center ring-1 transition-colors",
                  saved
                    ? "bg-moss text-white ring-moss"
                    : "bg-surface/95 backdrop-blur text-ink ring-black/5 hover:bg-ink-soft",
                ].join(" ")}
              >
              {d.imageCredit && (
                <div className="absolute bottom-3 left-4 right-4 flex justify-start">
                  <span className="px-2 py-1 rounded bg-black/50 text-white text-[10px] leading-tight backdrop-blur-sm">
                    Foto:{" "}
                    <a
                      href={d.imageCredit.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 hover:text-white/90"
                    >
                      {d.imageCredit.author}
                    </a>
                    {" / "}
                    {d.imageCredit.source}
                    {" · "}
                    {d.imageCredit.licenseUrl ? (
                      <a
                        href={d.imageCredit.licenseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 hover:text-white/90"
                      >
                        {d.imageCredit.license}
                      </a>
                    ) : (
                      d.imageCredit.license
                    )}
                  </span>
                </div>
              )}
            </div>

            <div className="p-7 sm:p-9">
              <SheetHeader className="p-0 mb-6">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-moss mb-1.5 block text-left">
                  {d.category}
                </span>
                <SheetTitle className="text-3xl font-semibold tracking-tight text-ink text-left">
                  {d.name}
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-wrap gap-2 mb-7">
                <Tag>
                  <Clock className="size-3" /> {d.travelTime}
                </Tag>
                <Tag>{d.duration}</Tag>
                <Tag>{d.indoorOutdoor}</Tag>
                {d.publicTransport && <Tag>Bra med kollektivt</Tag>}
                {d.foodAvailable && <Tag>Mat finns</Tag>}
                {d.cafeAvailable && !d.foodAvailable && <Tag>Café</Tag>}
              </div>

              <DetailBlock title="Varför åka hit">{d.whyGo}</DetailBlock>
              <DetailBlock title="Vad man kan göra">{d.whatToDo}</DetailBlock>
              <DetailBlock title="Var man äter eller fikar">
                {d.eatAndCoffee}
              </DetailBlock>
              <DetailBlock title="Hur du tar dig dit">
                <span className="inline-flex items-start gap-2">
                  <MapPin className="size-4 mt-0.5 shrink-0 text-moss" />
                  {d.howToGetThere}
                </span>
              </DetailBlock>
              <DetailBlock title="Tidsåtgång">{d.duration}</DetailBlock>
              <DetailBlock title="Bästa säsong">{d.bestSeason}</DetailBlock>
              <DetailBlock title="Bra att veta">{d.goodToKnow}</DetailBlock>

              <div className="mt-6">
                <h4 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted/70 mb-3">
                  Bra för
                </h4>
                <div className="flex flex-wrap gap-2">
                  {d.bestFor.map((b) => (
                    <Tag key={b}>{b}</Tag>
                  ))}
                </div>
              </div>

              <button
                onClick={onToggleSave}
                className={[
                  "mt-9 w-full py-3 rounded-full text-sm font-medium transition-colors",
                  saved
                    ? "bg-ink-soft text-ink ring-1 ring-black/5"
                    : "bg-moss text-white",
                ].join(" ")}
              >
                {saved ? "Sparad i dina utflykter" : "Spara den här utflykten"}
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-surface ring-1 ring-black/5 rounded-md text-[11px] font-medium text-ink">
      {children}
    </span>
  );
}

function DetailBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <h4 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted/70 mb-2">
        {title}
      </h4>
      <p className="text-sm text-ink leading-relaxed">{children}</p>
    </div>
  );
}
