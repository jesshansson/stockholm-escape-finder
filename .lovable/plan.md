Mål: Ersätta de påhittade mock-evenemangen på `/evenemang` med riktiga evenemang från Visit Stockholms öppna API (`https://api.visitstockholm.com/api/public-v1/events/`). Sidan ska fortfarande öppnas på dagens datum, och användaren ska kunna välja dag i kalendern.

## Vad jag bygger

1. **Serverfunktion för evenemangshämtning**
   - Skapa `src/lib/events.functions.ts` med en `createServerFn({ method: "GET" })` som hämtar alla evenemang från Visit Stockholm (`?size=1000`, just nu ~774 st).
   - Mappa API:ns fält till appens befintliga `StockholmEvent`-typ:
     - `title.sv` → `title`
     - `description.sv` → `description`
     - `venue_name` + `city`/`address` → `venue` + `neighborhood`
     - `schedule.dates[]` används för att avgöra vilken tid evenemanget har på vald dag
     - API-kategorier (t.ex. `music`, `stage-film`, `eat-drink`, `family`, `sports`, `fairs`, `exhibitions`, `clubs-parties`) mappas till appens svenska kategorier.
   - Vid fel returneras ett tomt resultat med ett fallback-meddelande, så sidan aldrig kraschar.

2. **Uppdatera data-modellen**
   - I `src/data/events.ts` behålls `EventCategory`, `StockholmEvent` och kategorilistan.
   - Mock-seed-listan tas bort och ersätts av en mappningsfunktion som serverfunktionen använder.
   - Eventuellt läggs en liten hjälpfunktion till för att hitta rätt tidslucka för ett specifikt datum.

3. **Refaktorera `/evenemang`-sidan**
   - Byt från statisk import av `events` till TanStack Query-mönstret: `loader` med `context.queryClient.ensureQueryData(...)` + `useSuspenseQuery(...)`.
   - Filtreringen efter vald dag sker mot de rika datumen i `schedule.dates` (flerdagars-evenemang syns på varje dag de pågår).
   - Varje evenemangskort får en tydlig extern länk till arrangörens/biljettsida (`external_website_url`).
   - Lägg till `errorComponent` och `notFoundComponent` på routen.
   - Behåll dagens datum som förval och kategorifiltreringen som den är.

4. **Attribution**
   - Lägg till en diskret textrad längst ner: “Evenemang från Visit Stockholm” med länk till `https://www.visitstockholm.se/` och en notis om CC BY 4.0-licens.

5. **Verifiering**
   - Kör `tsgo` för att säkerställa att alla nya typer och mappningar är korrekta.

## Tekniska detaljer

- API:et kräver ingen API-nyckel och har CC BY 4.0-licens.
- Eftersom API:et inte har ett dedikerat datumfilter hämtas alla evenemang på en gång och filtreras i appen.
- Serverfunktionen körs på servern, så vi slipper CORS-problem i webbläsaren.
- Tidigare användes `useState` för vald dag; det behålls i UI:t men datan laddas via serverfunktionen istället för statisk mock-data.

## Resultat

`/evenemang` visar riktiga, aktuella evenemang i Stockholm. Användaren kan fortfarande välja dag och kategori, och varje evenemang leder vidare till arrangörens sida.