# Stockholm Escapes

En webbapp som hjälper dig hitta en spontan dagsutflykt runt Stockholm — filtrerad på humör, restid, årstid och praktiska behov.

> **Om det här projektet:** en AI-assisterad build. Koden är skriven tillsammans med en AI-agent, medan koncept, kravställning, UX- och innehållsbeslut, prioritering, iteration, test och kodgranskning är styrda av Jessica. Syftet med repot är att visa produkt- och UX-tänk samt teknisk bedömningsförmåga — inte att påstå att varje rad är handskriven.

---

## Problemet

Du har en ledig dag och vill ut, men vet inte vart. Befintliga alternativ är antingen turistguider skrivna för besökare, eller långa blogglistor utan filter. Man vill kunna svara på tre frågor snabbt:

1. Hur långt bort orkar jag åka idag?
2. Vad är jag på humör för — lugnt, aktivt, mysigt, barnvänligt?
3. Funkar det i dagens väder?

Appen är byggd runt de tre frågorna och gör inget mer.

## Produktbeslut (och varför)

- **Kurerat innehåll istället för skrapad data.** Ett mindre, redigerat urval med egen text om varför platsen är värd ett besök slår en lång lista med tunna API-träffar. Det gör innehållet till en produktegenskap, inte en datamängd.
- **Förklarliga rekommendationer, inte AI.** "Dagens tips" väger väder, årstid, inne/ute, restid och kollektivtrafik och skriver ut motiveringen i klartext ("Bra idag: torrt väder och utomhus, lätt med kollektivt och 25 min bort"). Regler går att testa, felsöka och lita på. En chattbot hade varit svårare att verifiera och dyrare att driva.
- **Ingen inloggning.** Sparade utflykter ligger i `localStorage`. Det räcker för användningsfallet och tar bort konton, lösenord och personuppgifter helt.
- **Filter i URL:en.** Ett filtrerat resultat är en länk man kan dela och spara — och som överlever en omladdning.
- **Svenska genomgående.** Målgruppen är folk som bor i Stockholmsområdet, inte turister.
- **Mobilen först.** Beslutet "vart ska vi idag?" tas oftast i soffan med telefonen i handen.

## Funktioner

- Kurerade utflyktsmål med filter för avstånd, typ, humör, praktiska behov och tidsåtgång
- Detaljvy med varför man ska åka, vad man gör på plats, mat och fika, hur man tar sig dit
- Interaktiv karta (Leaflet/OpenStreetMap) med djuplänk till en enskild plats
- Live-evenemang i Stockholm via Visit Stockholms öppna API, med datumväljare och gratis-filter
- Väderbaserade dagstips via Open-Meteo
- Sparade utflykter i webbläsaren

## Teknik

| Område | Val |
| --- | --- |
| Ramverk | TanStack Start (React 19, SSR), TanStack Router, Vite 7 |
| Styling | Tailwind CSS v4 med egna designtokens i `src/styles.css` |
| Data | TanStack Query |
| Karta | Leaflet + OpenStreetMap (inga API-nycklar, ingen leverantörsinlåsning) |
| Externa API:er | Open-Meteo (väder), Visit Stockholm (evenemang) — båda öppna och nyckelfria |
| Test | Vitest |

### Arkitektur

```text
src/
  data/          domänmodell, kurerad data, filteralternativ, evenemangsnormalisering
  lib/           ren logik (filter, rekommendationer, väder) + serverfunktioner
  components/    presentationskomponenter
  routes/        filbaserade routes: /, /karta, /evenemang, /sparade
```

Tre principer styr uppdelningen:

- **Datakällan är utbytbar.** All läsning går genom `src/lib/destinations-repo.ts`. Idag returnerar den en lokal array; att byta till en databas, ett CMS eller ett API rör inte en enda komponent.
- **Affärslogiken är ren och testbar.** `filter.ts`, `recommend.ts`, `weather.ts` och normaliseringen i `events.ts` innehåller ingen React, inget nätverk och inga sidoeffekter.
- **Externa anrop sker på servern.** Väder och evenemang hämtas i TanStack Start-serverfunktioner, så nycklar och tredjepartssvar aldrig behöver hanteras i webbläsaren.

Två detaljer som var medvetna beslut snarare än självklarheter:

- Humörfilter och praktiska filter matchar med **AND** (alla valda humör respektive praktiska krav måste vara uppfyllda). Utan valda humör avgör övriga filter vilka platser som visas. Semantiken är låst med enhetstester.
- Text från Visit Stockholms API normaliseras (HTML-entiteter avkodas, blanksteg kollapsas) vid datagränsen istället för i vyn, så `&amp;` aldrig kan läcka ut i gränssnittet.

## Tillgänglighet

- Skip-länk ("Hoppa till innehåll") som första tabbstopp, mot ett `<main id="innehall">` på varje sida
- Semantisk struktur: ett `<h1>` per sida, ett `<main>`-landmärke, `aria-labelledby` på sektioner
- `aria-pressed` på växlande knappar (spara, filterpiller), `aria-label` på ikonknappar
- Synliga fokusringar, inga nästlade interaktiva element i korten
- `aria-live` på väder- och resultatstatus
- Färger via designtokens med kontroll av kontrast; färg bär aldrig information ensamt

## Test och verifiering

```bash
bun run test    # Vitest: filterlogik, rekommendationer, evenemangsnormalisering
bun run lint    # ESLint
bun run build   # produktionsbygge
```

Enhetstesterna täcker det som faktiskt kan gå sönder tyst: filtersemantiken, URL-serialiseringen (inklusive skräpparametrar), rekommendationsreglerna och svensk formulering, samt entitetsavkodningen av API-text.

## Kända begränsningar

- Sparade utflykter är knutna till webbläsaren — de följer inte med till en annan enhet. Det är avsiktligt (ingen inloggning).
- Datat är kurerat manuellt och uppdateras inte automatiskt; öppettider och priser kan hinna bli inaktuella.
- Restider är ungefärliga och tar inte hänsyn till trafik eller tidtabeller i realtid.
- Evenemangen kommer från Visit Stockholms öppna API. Är det nere visas ett felmeddelande istället för listan.
- Bilder till några destinationer kommer från Wikimedia Commons med attribution; om en extern bild försvinner visas ett tomt kort-utrymme.
- Ingen E2E-testsvit — verifieringen sker via enhetstester på ren logik plus manuell genomgång i mobil- och desktopbredd.

## Kom igång lokalt

```bash
bun install --frozen-lockfile
bun run dev      # http://localhost:8080
```

Inga miljövariabler eller API-nycklar behövs — samtliga externa tjänster är öppna.

## Deploy till Netlify (SSR)

Appen är serverrenderad och behöver en server-runtime — en ren statisk deploy skulle slå ut väder- och evenemangsfunktionerna. Repot är förberett för Netlify:

- `vite.config.ts` väljer Nitros `netlify`-preset när miljövariabeln `NETLIFY` är satt (Netlifys byggmiljö sätter den automatiskt).
- `netlify.toml` kör `bun run build`, publicerar `dist` och låser Node 22 / Bun 1.3.3.

Så här kopplar du upp det:

1. Push:a repot till GitHub och skapa en ny site i Netlify från repot.
2. Netlify läser `netlify.toml` — build command, publish-katalog och versioner behöver inte fyllas i manuellt.
3. Inga miljövariabler behöver läggas till.
4. Deploya.

Bygget producerar:

```text
dist/                                    statiska assets (publish-katalog)
dist/_headers                            cache-headers för /assets/*
.netlify/functions-internal/server/      SSR-handler (main.mjs + server.mjs)
```

Serverfunktionen registreras med `path: "/*"` och `preferStatic`, så **ingen egen `_redirects`-regel ska läggas till** — en SPA-fallback skulle kringgå SSR.

Kontroller efter deploy:

- `/` returnerar serverrenderad HTML (sidinnehållet syns i `view-source`, inte bara en tom root-div).
- "Dagens tips" på startsidan visar en väderbaserad motivering (Open-Meteo via serverfunktion).
- `/evenemang` listar evenemang och datumväljaren fungerar (Visit Stockholm via serverfunktion).
- Direktladdning och omladdning av `/karta`, `/evenemang`, `/sparade` ger 200, inte 404.
- `/finns-inte` visar den svenska 404-sidan.

