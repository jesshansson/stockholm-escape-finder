## Stockholm Day Trips — byggplan (svenska, utbytbar datakälla)

Varm, skandinavisk upptäcktsapp för spontana dagsutflykter runt Stockholm. Mobile-first single-page-upplevelse byggd på vald designriktning **Playful discovery board**. **Allt UI och innehåll på svenska.** Datalagret är strikt separerat från UI så att källan senare kan bytas till Supabase, CMS, JSON eller en extern Places-API utan att komponenter behöver ändras.

### Datalager (kärnan i denna plan)

Mappstruktur:

```
src/data/
  types.ts            // Destination + alla taggade unioner
  destinations.ts     // Lokal curated dataset (12+ platser)
  filters.ts          // Filter-konstanter på svenska (id + label)
src/lib/
  destinations-repo.ts  // Repository-interface + lokal implementation
  filter.ts             // Ren filtreringslogik
  use-destinations.ts   // React-hook som läser via repo
  use-saved-trips.ts    // localStorage-hook
```

**`types.ts`** — en typad `Destination`-modell med alla fält användaren listat:

```ts
export type Destination = {
  id: string;
  name: string;
  category: Category;              // "Natur" | "Kultur" | "Skärgårdsö" | ...
  description: string;
  travelTime: string;              // "ca 25 min med bil"
  travelMinutes: number;           // för sortering
  distanceRange: DistanceRange;    // "0-30" | "30-60" | "60-120" | "120+"
  indoorOutdoor: "Inomhus" | "Utomhus" | "Både och";
  moodTags: MoodTag[];
  practicalTags: PracticalTag[];
  seasonTags: SeasonTag[];
  foodAvailable: boolean;
  cafeAvailable: boolean;
  publicTransport: boolean;
  island: boolean;
  costLevel: 1 | 2 | 3;            // budget → lyx
  duration: "1-2h" | "Halvdag" | "Heldag";
  bestFor: string[];
  howToGetThere: string;
  goodToKnow: string;
  // detaljvy
  whyGo: string;
  whatToDo: string;
  eatAndCoffee: string;
  bestSeason: string;
  image: string;                   // importerad asset-URL
};
```

Alla unioner (Category, MoodTag, PracticalTag, SeasonTag, DistanceRange) deklareras i `types.ts` så ny data valideras av TypeScript.

**`destinations.ts`** — exporterar `localDestinations: Destination[]` med 12 curated platser: Vaxholm, Fjäderholmarna, Artipelag, Tyresta nationalpark, Drottningholm, Hellasgården, Millesgården, Sigtuna, Grinda, Sandhamn, Nackareservatet, Rosendals Trädgård. All copy på svenska. Bilder importeras från `src/assets/destinations/` (genererade via imagegen).

**`destinations-repo.ts`** — repository-mönster så datakällan är utbytbar:

```ts
export interface DestinationsRepository {
  list(): Promise<Destination[]>;
  getById(id: string): Promise<Destination | null>;
}

export const localRepository: DestinationsRepository = { ... };

// Framtida implementationer (bara stubs/kommentar i v1):
// export const supabaseRepository: DestinationsRepository = { ... }
// export const cmsRepository: DestinationsRepository = { ... }
// export const placesApiRepository: DestinationsRepository = { ... }

export const destinationsRepo: DestinationsRepository = localRepository;
```

UI importerar **endast** `destinationsRepo` — aldrig `localDestinations` direkt. Byte till Supabase senare = ändra en rad.

**`use-destinations.ts`** — TanStack Query-hook:

```ts
export const destinationsQuery = () => ({
  queryKey: ["destinations"],
  queryFn: () => destinationsRepo.list(),
});
export function useDestinations() { return useQuery(destinationsQuery()); }
```

**`filter.ts`** — ren `filterDestinations(destinations, filters): Destination[]`-funktion. Testbar utan UI.

**`filters.ts`** — alla filtergrupper som konstanter (id + svensk label) som UI mappar över. Lägga till ett filter = redigera en array, inte komponenten.

### Designtokens

Verbatim från vald prototyp in i `src/styles.css` som `oklch` semantiska tokens:
sand-bakgrund, moss primär accent, lichen, archipelago-blå, birch, zinc-textskala. Typsnitt Instrument Sans laddas via `<link>` i `__root.tsx`. `<html lang="sv">`.

### Routes

Single-page — allt på `/`. Detalj och Sparade öppnas som shadcn Sheets, inte separata routes.

- `src/routes/index.tsx` — discovery-sidan, svensk `head()`-metadata.
- `src/routes/__root.tsx` — uppdaterad titel, språk, Instrument Sans.

### UI-komponenter (`src/components/stockholm/`)

Alla läser data via `useDestinations()` + `filterDestinations()`. Inga hårdkodade platser.

1. **SiteHeader** — logotyp + nav (Upptäck / Sparade / Om).
2. **Hero** — "Hitta din nästa Stockholmsutflykt" + subtext + "Hitta en plats" + "Överraska mig".
3. **MoodPills** — humörpiller från `filters.ts` (Lugn & vacker, Mysig, Romantisk, Barnvänlig, Aktiv, Regnig dag, Solig dag, Budgetvänlig, Lite lyxigt, Fotovänlig).
4. **FilterBar** — sticky pillrad, backdrop blur. Grupper drivna av `filters.ts`:
   - Restid: 0–30 min · 30–60 min · 1–2 timmar · 2+ timmar / skärgårdsäventyr
   - Typ: Natur · Kultur · Skärgårdsö · Museum · Slott/historisk plats · Utsiktsplats · Vandringsled · Badplats · Café · Restaurang · Småstad/by
   - Praktiskt: Inomhus · Utomhus · Lätt med kollektivtrafik · Mat finns · Café i närheten · Hundvänligt · Barnvänligt · Bra på vintern · Bra på sommaren
   - Varaktighet: 1–2 timmar · Halvdag · Heldag
   Överflöd samlas i en "Fler filter"-Popover för mobil.
5. **DestinationGrid** — 1/2/3-kol responsivt rutnät. Första kortet kan vara `featured` (2-kol). Tomtillstånd: "Inga platser matchar — testa att rensa några filter."
6. **DestinationCard** — bild, kategorietikett, namn, kort beskrivning, restidschip, Spara-hjärta, "Detaljer →".
7. **DestinationSheet** — expanderad detaljvy med Varför åka hit, Vad man kan göra, Var man äter eller fikar, Hur du tar dig dit, Tidsåtgång, Bästa säsong, Bra att veta.
8. **SavedTripsSheet** — sparade destinationer + snabb borttagning.
9. **SurpriseFAB** — fast knapp nederst "Överraska mig idag", slumpar inom aktiva filter och öppnar detalj-sheet.
10. **SiteFooter** — "Sparat till senare"-miniatyrer + tagline.

### State

- `filters` — local React state i index-sidan.
- `savedIds` — `useSavedTrips`-hook med `localStorage`-persistens. (Senare: Supabase per-user.)
- `activeDetailId`, `savedOpen` — UI state.

### Bilder

12 platsbilder genereras via `imagegen` (fast, ~800×600 .jpg), sparas i `src/assets/destinations/`, importeras i `destinations.ts`. Senare: när data flyttas till Supabase/CMS pekar `image`-fältet helt enkelt på en remote-URL — modellen ändras inte.

### Migration senare (inget arbete i v1, bara designat för)

- **Supabase**: skapa `destinations`-tabell som speglar `Destination`-typen, byt `destinationsRepo = supabaseRepository`. Lovable Cloud aktiveras då.
- **CMS** (Sanity/Contentful): `cmsRepository` mappar CMS-respons → `Destination`.
- **JSON-fil**: `destinationsRepo = { list: () => fetch("/destinations.json").then(r => r.json()) }`.
- **Places API** (Google/Foursquare): `placesApiRepository` mappar API-respons → `Destination` och cachar via TanStack Query.

Endast repository-filen ändras. UI, filter, sparade och surprise-me fortsätter fungera oförändrat.

### Utanför scope (v1)

Riktig väderdata, riktiga SL-restider, inloggning, bokning, kartvy, server-persistens.
