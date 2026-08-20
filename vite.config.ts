// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import process from "node:process";

import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Netlify sets NETLIFY=true in its build image. Outside Lovable we therefore
// build with Nitro's netlify preset (SSR + server functions as a Netlify
// function). Inside the Lovable sandbox this option is ignored — the wrapper
// forces cloudflare-module — so preview/publish behaviour is unchanged.
const isNetlifyBuild = Boolean(process.env.NETLIFY);

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  ...(isNetlifyBuild ? { nitro: { preset: "netlify" as const } } : {}),
});

