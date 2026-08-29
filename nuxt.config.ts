// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

   modules: [
      "@nuxt/eslint",
      "@nuxt/fonts",
      "@nuxt/image",
      "@nuxtjs/seo",
      // Vercel Analytics + Speed Insights load `/_vercel/*` scripts that only
      // exist on the Vercel platform. Off-platform they 404 and log console
      // errors, which lowers the local Lighthouse "Best Practices" score.
      // Gating on `VERCEL` (set automatically on Vercel) keeps them out of
      // every build that is not the deployed site.
      ...(process.env.VERCEL ? ["@vercel/analytics", "@vercel/speed-insights"] : []),
      "@nuxt/test-utils/module",
   ],

   devtools: { enabled: true },

   app: {
      head: {
         // title and description are managed by Nuxt SEO (site config).
         // `lang` is set explicitly: the site is single-locale, and with no
         // i18n module in play nothing else would emit it — a missing lang
         // is a screen-reader pronunciation bug and an a11y audit failure.
         htmlAttrs: { lang: "en" },
         link: [
            { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
            // iOS reads this rather than any SVG favicon. Flattened onto the
            // brand cream because iOS composites transparency against black.
            { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
         ],
         meta: [
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            // Mobile browser chrome follows the OS setting. This tracks the
            // `prefers-color-scheme` default rather than a manual override —
            // a stored override is not knowable at SSR, and guessing wrong
            // paints the wrong colour on the very first frame.
            { name: "theme-color", content: "#faf7f2", media: "(prefers-color-scheme: light)" },
            { name: "theme-color", content: "#14161a", media: "(prefers-color-scheme: dark)" },
         ],
         script: [
            {
               // Applies a stored theme choice BEFORE the first paint.
               //
               // This cannot wait for Vue: by the time the app hydrates the
               // page has already painted, so a visitor who chose dark would
               // see a cream flash on every single navigation. It cannot be
               // an external file either — that would race the stylesheet.
               // Inline, blocking, and first in <head> is the whole point.
               //
               // Reads the key owned by `composables/useTheme.ts`; the two
               // must stay in step. Wrapped in try/catch because localStorage
               // throws outright when a browser blocks site data.
               innerHTML: "(function(){try{var t=localStorage.getItem(\"queep-theme\");if(t===\"dark\"||t===\"light\")document.documentElement.setAttribute(\"data-theme\",t)}catch(e){}})()",
               tagPosition: "head",
               tagPriority: "critical",
            },
         ],
      },

      // Cross-route fade. Paired with `.page-enter-active` in
      // `layout/_page.scss`, and disabled wholesale under
      // prefers-reduced-motion by the reset.
      pageTransition: { name: "page", mode: "out-in" },
   },

   css: [
      "~/assets/scss/main.scss",
   ],

   // Site-wide identity — single source of truth for all Nuxt SEO modules
   // (sitemap, robots, og-image, schema.org, canonical URLs).
   site: {
      url: process.env.NUXT_SITE_URL || "https://www.queep.app",
      name: "Queep",
      description: "Keep it. Find it. Use it. One place on your Mac, iPhone and iPad for the snippets, images, files and documents worth keeping close.",
      defaultLocale: "en",
   },

   runtimeConfig: {
      public: {
         // Where the hero and CTA buttons point. Empty until the beta opens,
         // which switches every call to action to the waitlist copy instead
         // of a dead download link — see `utils/site.ts`.
         downloadUrl: "",
      },
   },

   // YYYY-MM-DD
   compatibilityDate: "2026-08-29",

   nitro: {
      // Every route is static: nothing here fetches at request time, so
      // there is no per-request work for a server to do. `crawlLinks`
      // rather than a hardcoded list — the footer links every page, so
      // starting at "/" reaches all of them.
      prerender: {
         crawlLinks: true,
         // `/llms.txt` is listed explicitly because nothing links to it:
         // the convention is a fixed path a client asks for directly, so
         // the crawler would never reach it from "/" and the route would
         // 404 on a fully static deploy.
         routes: ["/", "/llms.txt"],
      },

      // Force the Bun preset ONLY for local/self-hosted builds
      // (`bun run .output/server/index.mjs`). On Vercel we must NOT set a
      // preset: an explicit `preset` overrides Nitro's provider auto-detection,
      // so hardcoding "bun" makes the Vercel build emit a Bun server instead
      // of `.vercel/output/`. Vercel then can't run it and falls back to
      // serving the static SPA shell, so nothing server-rendered survives.
      ...(process.env.VERCEL ? {} : { preset: "bun" }),
   },

   typescript: {
      // typeCheck: true,
      strict: true,
   },

   eslint: {
      config: {
         stylistic: true,
      },
   },

   // `fallbacks` is the load-bearing part: it makes the module emit
   // metric-override fallback faces (size-adjust, ascent-override…) so the
   // system font stands in at the same measurements as the webfont. Without
   // them the text reflows the moment the webfont swaps in, which is exactly
   // the layout shift the Lighthouse CLS budget fails the build over.
   //
   // Resolved and self-hosted at build time by @nuxt/fonts — see
   // `public/fonts/README.md` before pinning these to local files.
   fonts: {
      families: [
         {
            name: "Plus Jakarta Sans",
            weights: [500, 600, 700, 800],
            fallbacks: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
         },
         {
            name: "Inter",
            weights: [400, 500, 600],
            fallbacks: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
         },
      ],
   },

   // Dynamic Open Graph images. Use the Satori renderer (via the installed
   // `satori` + `@resvg/resvg-js` deps and the `*.satori.vue` component
   // suffix) because it is edge/serverless-safe; the chromium renderer will
   // not run on the Bun/Nitro preset.
   ogImage: {
      defaults: {
         width: 1200,
         height: 630,
      },
   },

   // Schema.org identity used by useSchemaOrg() across pages.
   schemaOrg: {
      identity: {
         type: "Organization",
         name: "Queep",
         url: "https://www.queep.app",
      },
   },
})
