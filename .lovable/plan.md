# Netlify-deployment av Stockholm Escapes (SSR bevarad)

Audit av det faktiska bygget i repot. Slutsats: appen kan flyttas till Netlify med SSR och serverfunktioner intakta, och det krävs mycket lite. Ingen kod i `src/` behöver ändras.

## Vad bygget faktiskt gör idag

- `vite.config.ts` använder `@lovable.dev/vite-tanstack-config` (v2.13.1, publikt paket på npm), som internt lägger till `tanstackStart`, React, Tailwind v4, tsconfig-paths och **Nitro** (`nitro` 3.0.260603-beta ligger i devDependencies).
- Inuti Lovables sandlåda tvingas Nitro alltid till presetet `cloudflare-module` med output `dist/client` + `dist/server` (verifierat i paketets kod och i `dist/nitro.json`). Utanför sandlådan gäller det preset man själv anger.
- SSR-entrypunkten är `src/server.ts` (felhanteringswrapper), inkopplad via `tanstackStart.server.entry`.
- Serverfunktioner: `src/lib/weather.functions.ts` (Open-Meteo) och `src/lib/events.functions.ts` (Visit Stockholm). Båda anropar öppna API:er utan nycklar via `fetch` — inga Node-specifika beroenden, inga hemligheter.
- Inget i `src/` refererar till Lovable, inga `/api/public/*`-routes, inga miljövariabler behövs (`config.server.ts` läser bara `NODE_ENV`).

Nitro har ett inbyggt `netlify`-preset i den installerade versionen. Det skriver serverhandlern till `.netlify/functions-internal/server/` och statiska filer till `dist/`, och genererar `_redirects` och `_headers` automatiskt.

## Ändringar som behövs

### 1. `vite.config.ts` — välj Netlify-preset utanför Lovable

```ts
export default defineConfig({
  tanstackStart: { server: { entry: "server" } },
  nitro: process.env.NETLIFY ? { preset: "netlify" } : undefined,
});
```

`NETLIFY` sätts automatiskt av Netlifys byggmiljö. I Lovables sandlåda ignoreras inställningen ändå (cloudflare tvingas), så preview fortsätter fungera oförändrat under uppsägningstiden.

### 2. `netlify.toml` (ny fil i repo-roten)

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "22"
```

- `publish = "dist"` (inte `dist/client`) — Netlify-presetet lägger de statiska filerna direkt i `dist/`.
- Ingen `functions`-inställning behövs: `.netlify/functions-internal/` plockas upp automatiskt.
- **Ingen egen redirect-fil ska skrivas.** Nitro genererar `dist/_redirects` med `/* → /.netlify/functions/server 200`. En handskriven SPA-redirect skulle döda SSR.

### 3. Lockfile / paketerare

Repot har bara `bun.lock`. Två alternativ:
- **A (rekommenderat):** behåll Bun — sätt build command till `bun install && bun run build` och `BUN_VERSION = "1.2"` i `[build.environment]`. Netlify stöder Bun natively.
- **B:** generera en `package-lock.json` lokalt och committa den, och kör `npm run build`.

Välj ett; blanda inte.

### 4. `bunfig.toml`

`minimumReleaseAge`-regeln är en Lovable-specifik supply chain-spärr. Den fungerar även på Netlify men kan försena installation av helt nya versioner. Kan lämnas som den är eller tas bort — inget hinder.

## Runtime- och miljökrav

- **Node 22** (Nitro kräver `^20.19 || >=22.12`; Netlify-funktioner kör Node 22 som standard).
- Inga miljövariabler eller API-nycklar krävs — Open-Meteo och Visit Stockholm är öppna.
- devDependencies måste installeras i bygget (Netlifys standard) eftersom `@lovable.dev/vite-tanstack-config` och `nitro` ligger där.
- Utgående nätverkstrafik från funktionen till `api.open-meteo.com` och `api.visitstockholm.com` — tillåtet på Netlify utan konfiguration.

## Verifiering efter deploy

1. `/` returnerar serverrenderad HTML: `curl -s https://<site>.netlify.app/ | grep -c "Hitta din nästa"` ska ge > 0 (inte en tom SPA-shell).
2. **Väder:** öppna `/` och kontrollera att "Dagens tips" visar en väderbaserad motivering, inte ett felmeddelande. I Netlify → Logs → Functions ska `server`-funktionen ha loggat anropet utan fel.
3. **Evenemang:** öppna `/evenemang`, byt datum och kontrollera att listan fylls från API:et samt att "Gratis"-filtret fungerar.
4. **Deep links:** ladda om direkt på `/karta?d=<id>`, `/evenemang` och `/sparade` — 200, inte 404 (bevisar att redirecten till funktionen finns).
5. **404:** besök `/finns-inte` — svensk 404-sida ska renderas.
6. Kontrollera att `dist/_redirects` och `.netlify/functions-internal/server/server.mjs` finns i bygglogg/artefakter.

## Att göra manuellt innan Pro sägs upp

1. **Exportera koden till GitHub** från Lovable (GitHub-kopplingen ägs av Lovable-projektet) och bekräfta att repot innehåller allt inklusive `src/`, `vite.config.ts` och lockfile.
2. Gör ändring 1–3 ovan i en branch och verifiera **en riktig Netlify-deploy** medan Lovable fortfarande är aktivt, så det finns en fungerande fallback.
3. Peka om ev. domän till Netlify (DNS) och avpublicera Lovable-siten först efter att Netlify verifierats.
4. Notera att `@lovable.dev/vite-tanstack-config` fortsätter hämtas från npm — den fungerar utan Lovable-konto, men om du vill klippa bandet helt går det senare att ersätta den med explicita plugins (`tanstackStart`, `viteReact`, `tailwindcss`, `tsConfigPaths`, `nitro`). Inte nödvändigt för deployen.

## Vad som är knutet till Lovable och slutar fungera

- **Preview-URL:er** (`id-preview--*.lovable.app`), share-preview-länkar och publiceringsflödet i Lovable.
- **Lovable-badge** och Lovables analytics/redigeringsöverlägg.
- **Sandlådans byggbeteende**: det tvingade `cloudflare-module`-presetet och Lovables felloggning i editorn.
- **`/api/public/*`-undantaget** från Lovables inloggningsskydd — irrelevant här, appen har inga sådana routes.
- **Lovable AI Gateway / `LOVABLE_API_KEY`** — används inte i projektet, så inget bortfall.
- Ingen appfunktion i övrigt är beroende av Lovable: karta (Leaflet/OSM), väder, evenemang, sparade utflykter (localStorage) och bilder (Wikimedia) är alla externa eller lokala.

## Acceptanskriterier

- Netlify-bygget lyckas med Node 22 och producerar både `dist/` (statiskt) och `.netlify/functions-internal/server/`.
- Serverrenderad HTML på alla fyra routes; inga 404 vid direktladdning eller omladdning.
- Väder- och evenemangsfunktioner returnerar riktig data i produktion.
- Ingen visuell eller innehållsmässig skillnad mot Lovable-previewen.
- `bun run test`, typkontroll och `bun run build` fortsatt gröna lokalt.

## Rollback

- Ändringarna är isolerade till `vite.config.ts` (villkorad på `NETLIFY`) och en ny `netlify.toml`, så Lovable-bygget påverkas inte — rollback = återställ dessa två filer.
- Behåll Lovable-publiceringen aktiv tills Netlify-deployen är verifierad; DNS-bytet görs sist och kan pekas tillbaka.
- Netlify har "Rollback to previous deploy" per deploy om något går fel efter cutover.

## Risker / öppna frågor

- Netlify-presetet i denna Nitro-beta är mindre bevandrat än cloudflare-presetet; det är därför steg 2 (testdeploy före uppsägning) är obligatoriskt, inte valfritt.
- Om Bun-installationen strular på Netlify: byt till alternativ B (committad `package-lock.json`).
