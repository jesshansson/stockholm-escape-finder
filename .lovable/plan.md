# Audit: Stockholm Escapes as a portfolio case

Verified against the current code: 5 routes (`/`, `/karta`, `/evenemang`, `/sparade`), pure logic modules (`filter.ts`, `recommend.ts`, `weather.ts`, `events.ts`), Vitest with two test files (`src/lib/recommend.test.ts`, `src/data/events.test.ts`), Leaflet map, live Visit Stockholm events with an inline error banner, localStorage saved trips.

What is already strong and should not be touched: the data/repo separation, the explainable recommendation scoring, entity normalization, Leaflet/OSM independence, per-route `head()` metadata, mobile-first layout.

## Must (highest value per credit)

### 1. Filters and mood live in the URL on `/`
Today all filter state is local `useState`, so a filtered result set cannot be shared, bookmarked, or restored on back-navigation. `/karta` already proves the pattern with `validateSearch`. This is the single clearest usability + technical-credibility gain.
- Files: `src/routes/index.tsx`, `src/lib/filter.ts` (add `parseFilters` / `serializeFilters` helpers), new `src/lib/filter.test.ts`.
- Acceptance: selecting filters updates the query string; reloading or sharing the URL restores exactly the same result set; "Rensa filter" clears the query string; invalid/unknown values are dropped instead of crashing; round-trip covered by unit tests.

### 2. Swedish, on-brand 404 and error pages
`__root.tsx` still ships the English default shell ("Page not found", "Go home", `bg-background`/`text-foreground` tokens) inside a `lang="sv"` document. A recruiter hitting a bad URL sees a different, unfinished product.
- Files: `src/routes/__root.tsx`.
- Acceptance: 404 and error boundary are in Swedish, use the sand/ink/moss tokens and the serif headline, and offer links back to start and to `/karta`.

### 3. Test the filter logic (the app's core rule set)
`filter.ts` is the most business-logic-dense pure module and has zero tests, while `recommend.ts` has good ones. Notably practical tags are AND-matched while moods are OR-matched — an intentional rule worth pinning down.
- Files: new `src/lib/filter.test.ts`.
- Acceptance: tests cover empty filters, AND vs OR semantics, combined filters, and `countActiveFilters`.

### 4. Accessibility pass: skip link and heading order
No skip link exists, and the header nav is repeated on every page before content.
- Files: `src/routes/__root.tsx` (or `SiteHeader.tsx`), `src/styles.css` for the focus-visible reveal.
- Acceptance: first Tab reveals "Hoppa till innehåll" and jumps to the main content; every route has exactly one `<h1>`; no keyboard trap in the destination sheet.

### 5. A README that explains the product decisions
There is no README at all. For a portfolio case this is the highest-leverage artifact: it is what a recruiter reads first.
- Files: new `README.md`.
- Acceptance: covers the problem, the three product decisions (curated data over a scraped feed, explainable non-AI recommendations, no login by design), architecture (repo pattern, pure logic modules, server functions for Open-Meteo and Visit Stockholm), how to run and test, and known limitations.

## Strong value (do after the Must batch)

- **Remote image fallback.** Wikimedia URLs are third-party and can 404; a broken image in a card is the most visible failure mode. Add an `onError` fallback tile in `DestinationCard`/`DestinationSheet`.
- **Dead file cleanup.** `src/components/stockholm/SurpriseFab.tsx` is unused after the feature was removed. Delete it.
- **Empty state on `/sparade`** with a clear route back to discovery (verify current wording).
- **`public/robots.txt` + a static `sitemap.xml`** for the four routes, plus an `og:image`.

## Skip (explicitly not worth it here)

- Auth, database, AI chat, paid APIs — out of scope and maintenance-heavy.
- E2E test suite (Playwright) — high setup cost, low incremental signal next to unit tests on pure logic.
- i18n/English toggle — doubles content maintenance and weakens the Swedish local-product story.
- Redesign, dark mode, new destination categories, PWA/offline.
- Rewriting the map or the events integration; both work.

## Credit-efficient batch (one prompt)

Do Must items 1–5 together, then verify:
1. `src/lib/filter.ts` — add `filtersToSearch` / `searchToFilters` with tolerant parsing.
2. `src/routes/index.tsx` — `validateSearch` + drive `filters` from search params via `useNavigate`.
3. `src/routes/__root.tsx` — Swedish 404/error components, skip link.
4. `src/lib/filter.test.ts` — new tests.
5. `README.md` — product case write-up.

Verification in the same pass: `bunx vitest run` (all three test files green), a TypeScript check, and a production build. Plus a Playwright check at 1280px and 360px that filtering updates the URL and a reload restores the same results.
