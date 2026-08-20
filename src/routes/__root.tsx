import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <main
      id="innehall"
      className="flex min-h-screen items-center justify-center bg-sand px-5 text-ink"
    >
      <div className="max-w-md text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-moss">404</p>
        <h1
          style={{ fontFamily: "var(--font-serif)" }}
          className="mt-3 text-4xl sm:text-5xl font-normal tracking-[-0.02em] text-ink"
        >
          Den här sidan finns inte
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          Sidan du letar efter har flyttat eller har aldrig funnits. Men det finns gott om utflykter
          kvar att upptäcka.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-2.5">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-sand ring-1 ring-ink transition-transform hover:-translate-y-px"
          >
            Till startsidan
          </Link>
          <Link
            to="/karta"
            className="inline-flex items-center justify-center rounded-full bg-surface px-5 py-2.5 text-sm font-medium text-ink ring-1 ring-black/5 transition-colors hover:bg-birch"
          >
            Visa kartan
          </Link>
        </div>
      </div>
    </main>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <main
      id="innehall"
      className="flex min-h-screen items-center justify-center bg-sand px-5 text-ink"
    >
      <div className="max-w-md text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-moss">
          Något gick fel
        </p>
        <h1
          style={{ fontFamily: "var(--font-serif)" }}
          className="mt-3 text-3xl sm:text-4xl font-normal tracking-[-0.02em] text-ink"
        >
          Sidan kunde inte laddas
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          Det kan vara ett tillfälligt fel. Försök igen, eller gå tillbaka till startsidan.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-2.5">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-sand ring-1 ring-ink transition-transform hover:-translate-y-px"
          >
            Försök igen
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-surface px-5 py-2.5 text-sm font-medium text-ink ring-1 ring-black/5 transition-colors hover:bg-birch"
          >
            Till startsidan
          </a>
        </div>
      </div>
    </main>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Stockholm Escapes - Hitta din nästa Stockholmsutflykt" },
      {
        name: "description",
        content:
          "Upptäck snabbt naturpärlor, kulturplatser, caféer, restauranger och skärgårdsöar runt Stockholm — baserat på humör, avstånd och tid.",
      },
      { property: "og:title", content: "Stockholm Escapes" },
      {
        property: "og:description",
        content: "Spontana dagsutflykter runt Stockholm — välj efter humör, restid och plats.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Instrument+Sans:ital,wght@0,400..600;1,400..600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Skip link: first tab stop on every route, targets #innehall. */}
      <a
        href="#innehall"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-sand focus:outline-none focus:ring-2 focus:ring-moss focus:ring-offset-2"
      >
        Hoppa till innehåll
      </a>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
