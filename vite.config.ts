// `defineConfig` comes from vitest/config, not vite — it is a superset that
// also types the `test` block below. Everything else behaves identically.
import { defineConfig } from "vitest/config";
import type { Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

/**
 * Injects <link rel="preload"> for the resources that decide first-paint speed
 * but are otherwise discovered late.
 *
 * The hero image is the LCP element, and without this the browser can't even
 * learn its URL until the JS has downloaded, parsed, and rendered <HeroBanner>
 * — three serial round trips deep. Preloading starts that download alongside
 * the JS instead.
 *
 * It has to happen at build time because both filenames are content-hashed, so
 * they cannot be written into index.html by hand.
 *
 * The hero is a <picture> with breakpoint-specific sources, so each preload
 * carries the matching `media` — a plain href would download the wrong file on
 * one of the two breakpoints and waste ~105 kB on mobile.
 */
const injectPreloads = (): Plugin => ({
  name: "inject-preloads",
  apply: "build",
  enforce: "post",
  transformIndexHtml(html, ctx) {
    const files = Object.keys(ctx.bundle ?? {});

    const findOne = (pattern: RegExp, label: string) => {
      const matches = files.filter((f) => pattern.test(f));
      if (matches.length !== 1) {
        // Loud on purpose: a rename shouldn't silently drop the optimization
        // and still produce a green build.
        console.warn(
          `\n[inject-preloads] expected exactly 1 match for "${label}", found ${matches.length}. NO PRELOAD EMITTED — first-paint performance will regress.\n`,
        );
        return undefined;
      }
      return matches[0];
    };

    const desktopHero = findOne(
      // `(?!sm-)` excludes hero-image-sm.webp, the smaller variant the
      // brand-story cards use. Without it this matched two files, and the
      // "exactly 1" guard correctly emitted no preload at all.
      /assets\/hero-image-(?!sm-)[\w-]+\.webp$/,
      "hero webp",
    );
    const mobileHero = findOne(/assets\/ripped-[\w-]+\.avif$/, "hero avif");
    const latinFont = findOne(
      /assets\/noto-sans-latin-wght-normal-[\w-]+\.woff2$/,
      "latin font",
    );

    const tags = [];

    if (desktopHero)
      tags.push({
        tag: "link",
        attrs: {
          rel: "preload",
          as: "image",
          media: "(min-width: 768px)",
          imagesrcset: `/${desktopHero}`,
          type: "image/webp",
          fetchpriority: "high",
        },
        injectTo: "head-prepend" as const,
      });

    if (mobileHero)
      tags.push({
        tag: "link",
        attrs: {
          rel: "preload",
          as: "image",
          media: "(max-width: 767px)",
          imagesrcset: `/${mobileHero}`,
          type: "image/avif",
          fetchpriority: "high",
        },
        injectTo: "head-prepend" as const,
      });

    if (latinFont)
      tags.push({
        tag: "link",
        attrs: {
          rel: "preload",
          as: "font",
          href: `/${latinFont}`,
          type: "font/woff2",
          crossorigin: "",
        },
        injectTo: "head-prepend" as const,
      });

    return { html, tags };
  },
});

export default defineConfig({
  plugins: [
    react(),
    injectPreloads(),
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      jpg: { quality: 80 },
      webp: { quality: 80 },
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    // Vitest reuses this whole config, so the `@` alias (80 files), asset
    // imports (28) and CSS imports all resolve exactly as they do in the app —
    // which is the reason for using Vitest over a standalone runner here.
    css: false,
    /**
     * `src/supabase/supabase.tsx` calls createClient() at module scope, so any
     * test that transitively imports the data layer needs these present.
     * createClient does no I/O on construction, so dummy values are fine — and
     * this keeps CI working without real credentials.
     */
    env: {
      VITE_SUPABASE_URL: "http://localhost:54321",
      VITE_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_test",
    },
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.styles.ts",
        "src/**/*.data.*",
        "src/supabase/supabase.types.ts",
      ],
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Split heavy vendors into their own chunks so they cache separately
        // from app code and the main bundle stays under the size warning.
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          supabase: ["@supabase/supabase-js"],
          "framer-motion": ["framer-motion"],
        },
      },
    },
  },
});
