
# Riktiga bilder + attribution för destinationerna

Kombinerar A och B: vi lägger till stöd för bildkreditering i datamodellen *och* fyller på med riktiga bild-URL:er från Wikimedia Commons / Unsplash för alla destinationer.

Detta är rätt väg eftersom Wikimedia kräver attribution — vi måste ändå ha ett fält för det, och då kan vi lika gärna fylla i data samtidigt.

## Vad som byggs

### 1. Utöka datamodellen
I `src/data/types.ts`, lägg till på `Destination`:
```ts
imageCredit?: {
  author: string;      // t.ex. "Arild Vågen"
  source: "Wikimedia Commons" | "Unsplash" | "Pexels" | "Flickr" | "Egen";
  sourceUrl: string;   // länk till originalsidan
  license: string;     // t.ex. "CC BY-SA 4.0", "Unsplash License"
  licenseUrl?: string; // valfri länk till licenstext
};
```
Fältet är valfritt så inget kraschar under tiden vi fyller på.

### 2. Visa krediteringen diskret
- **`DestinationCard.tsx`**: liten "Foto: Namn / Källa" i hörnet av bilden (10px, semitransparent).
- **`DestinationSheet.tsx`**: en rad under huvudbilden med författare, licens och länk till källan (klickbar).
- Om `imageCredit` saknas → ingen text visas.

### 3. Hämta bilder för alla ~19 destinationer
För varje destination:
- Sök Wikimedia Commons först (bäst för slott, öar, kyrkor, museer, historiska platser).
- Faller tillbaka på Unsplash/Pexels för stämningsbilder där Wikimedia saknar bra motiv.
- Använd direkta bildlänkar (Wikimedia: `upload.wikimedia.org/...`, Unsplash: `images.unsplash.com/...`).
- Fyll i `image`-URL:en och `imageCredit`-blocket i `src/data/destinations.ts`.

Jag använder web-search-subagents parallellt för att hitta lämpliga bilder per destination, verifierar att URL:erna svarar, och samlar allt i en enda edit av `destinations.ts`.

### 4. Behåll picsum som fallback
Om en destination inte får en bra riktig bild i första svepet behåller vi picsum-placeholdern så inget går sönder. Jag rapporterar vilka som ev. saknas så du kan välja bild manuellt sen.

## Filer som ändras
- `src/data/types.ts` — nytt `imageCredit`-fält
- `src/data/destinations.ts` — riktiga `image`-URL:er + `imageCredit` per post
- `src/components/stockholm/DestinationCard.tsx` — liten fotokredit på kortet
- `src/components/stockholm/DestinationSheet.tsx` — fotokredit under detaljbilden

## Vad som INTE ändras
- Ingen ny sida, inget nytt filter, ingen ändring i kartan/routing.
- Inga AI-genererade bilder (alternativ C) — vi kör bara gratis riktiga foton.

Klicka **Implementera plan** så sätter jag igång.
