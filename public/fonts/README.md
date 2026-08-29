# Fonts

Nothing is committed here yet, and that is a deliberate half-measure worth
understanding before it is changed.

The two families — **Plus Jakarta Sans** for display and **Inter** for body
— are declared in `nuxt.config.ts` under `fonts.families` with weights but
**no `src`**. That means `@nuxt/fonts` resolves them from its default
providers at build time, downloads the subsets, and serves them from the
build output. Two consequences:

- **Builds need network access.** A fully offline build cannot resolve the
  families and will fall back to the system stack.
- **The exact files can change** between builds if a provider updates its
  subsets, which makes a build one degree less reproducible than it could
  be.

## Pinning them

Drop the `.woff2` files in this folder and give each family an explicit
`src` in `nuxt.config.ts`:

```ts
{
   name: "Inter",
   src: "/fonts/inter-latin-variable.woff2",
   weight: "400 700",
   fallbacks: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
}
```

That makes builds offline-capable and byte-for-byte reproducible. Keep each
family's OFL licence text alongside its file when you do — both fonts are
SIL Open Font License 1.1, which requires the licence to travel with them.

## Do not remove `fallbacks`

It is the load-bearing key in that config. It makes the module emit
metric-override fallback faces (`size-adjust`, `ascent-override`…) so the
system font stands in at the same measurements as the webfont. Without
them the text reflows the moment the webfont swaps in — which is exactly
the layout shift the Lighthouse CLS budget fails the build over.
