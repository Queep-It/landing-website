<div align="center">

<img src="public/favicon.svg" alt="" width="88" height="88">

# Queep It — Landing Website

**Keep it. Find it. Use it.**

The marketing site for Queep It, a cross-Apple-platform app for the snippets, images, files and documents worth keeping close.

[**queep.app**](https://www.queep.app) · [Getting started](#getting-started) · [Contributing](.github/CONTRIBUTING.md) · [Changelog](CHANGELOG.md)

[![CI](https://img.shields.io/github/actions/workflow/status/Queep-It/landing-website/ci.yml?branch=main&label=CI&style=flat-square)](https://github.com/Queep-It/landing-website/actions/workflows/ci.yml) [![Release](https://img.shields.io/github/v/release/Queep-It/landing-website?style=flat-square&label=release)](https://github.com/Queep-It/landing-website/releases/latest) [![License](https://img.shields.io/github/license/Queep-It/landing-website?style=flat-square)](LICENSE) [![Nuxt 4](https://img.shields.io/badge/Nuxt-4-00DC82?style=flat-square&logo=nuxt&logoColor=white)](https://nuxt.com) [![Bun](https://img.shields.io/badge/Bun-1.3-000000?style=flat-square&logo=bun&logoColor=white)](https://bun.sh)

</div>

---

## Pages

| Route | What it is |
| --- | --- |
| `/` | Hero, features, the three-verb flow, pricing, FAQ and closing CTA |
| `/contact` | The single public address |
| `/privacy-policy` | What the app stores and what it never uploads |
| `/terms` | Licence, acceptable use, availability, liability |
| `/llms.txt` | Generated from the content registries — see below |

Every route is prerendered. `nitro.prerender.crawlLinks` starts at `/` and
reaches the rest through the footer, so there is no route list to keep in step.

---

## Content lives in two files

Nothing user-facing is written inline in a template.

- **`app/utils/copy.ts`** — every string, plus the per-page `SEO` map. Single
  locale, so components read the constants directly instead of calling a `t()`
  helper; a mistyped key is a type error rather than a raw key on the page.
- **`app/utils/content.ts`** — the registries with structure: `FEATURES`,
  `FLOW`, `PRICING`, `FAQ`.

Both feed three consumers at once — the rendered page, the JSON-LD, and
`/llms.txt` — and none of the three can complain about a bad entry. That is
what `test/unit/content.test.ts` is for: unique ids, exactly one featured
pricing tier, FAQ answers that stand alone as complete sentences, and titles
and descriptions inside the SERP budgets.

Adding a feature or a tier is one entry in `content.ts` and nothing else. It
appears on the page, in `/llms.txt` and in the structured data automatically.

---

## Design

Charcoal on warm cream, with the app icon's amber as the single accent. Plus
Jakarta Sans for display, Inter for everything else.

Colours live as CSS custom properties in `app/assets/scss/base/_global.scss`,
with the dark counterpart of every one in `app/assets/scss/themes/_dark.scss`.
Three rules worth knowing before changing them:

- **The accent is two tokens, not one.** `--accent-solid` is the bookmark's
  yellow and is a **fill only** — buttons, the highlight swipe, the flow ticks
  — with `--accent-contrast` (near-black, 9.8:1 on it) as its foreground.
  `--accent` is the ink role for links and small labels, and it is a far darker
  amber because `#f5b62a` on cream is 1.7:1 and unreadable as text at any size.
- **`--gradient-brand` never touches text.** Amber gradient text on cream tops
  out around 1.8:1. The hero emphasis is a solid-ink phrase over an amber
  highlight swipe drawn behind the glyphs, so the contrast audit always has a
  real colour to measure.
- **The surface scale is inverted.** `--surface-raised` is pure white and
  *lighter* than the cream page, because cards here read as paper lifted off a
  desk rather than as panels cut into it. Elevation is carried by shadow.

Theme preference is system / light / dark, stored in `localStorage` under
`queep-it-theme`, where "system" is the *absence* of the key and of the
`data-theme` attribute. An inline script in `nuxt.config.ts` applies a stored
choice before first paint; without it, dark-mode visitors get a cream flash on
every load.

### The app mark

`app/components/QueepItMark.vue` draws the logo as SVG rather than shipping a
bitmap. It renders at 17px inside the window mock, 28px in the header, 38px in
the footer and 56px in the closing CTA, in two themes — a PNG crisp at all of
those is three files and a `srcset`. Drawing it also lets the knockout around
the bookmark follow the surface it sits on: `gapColor` defaults to `--surface`
and is overridden wherever the mark is not on the page background.

`public/favicon.svg` is deliberately **not** the same artwork. A favicon has no
surface to knock out against, so it is drawn on its own charcoal squircle with
the gap painted in. Editing one does not update the other — see
[`public/README.md`](public/README.md).

---

## Motion

Three mechanisms, and each one degrades to a fully readable page on its own.

- **Scroll entrances** — `app/composables/useReveal.ts`. One
  `IntersectionObserver` for the whole page, set up in the layout. It writes
  the `data-reveal` attribute itself on mount, so the server-rendered HTML
  carries no hidden state at all: a visitor whose JavaScript never runs sees
  everything. Elements are unobserved once they fire — these are entrances,
  not scroll-linked animations.
- **In-page navigation** — plain `<a href="#pricing">` anchors and
  `scroll-behavior: smooth` from the reset. Native handling gives the smooth
  scroll, respects `prefers-reduced-motion` for free, and keeps the position
  linkable. `.section` carries a `scroll-margin-block-start` built from
  `--topbar-height` so a jump lands below the sticky header rather than under
  it.
- **The scroll spy** — `app/composables/useActiveSection.ts`. A second
  observer with a narrow `rootMargin` band near the top of the viewport;
  without that band two adjacent sections both intersect for most of a scroll
  and the nav highlight flickers between them.

`prefers-reduced-motion` is honoured in three places, because the reset zeroing
transitions is not enough on its own — an element hidden by CSS and revealed by
a transition would be stuck invisible. `_reveal.scss` drops the hidden state
outright, `useReveal` skips building the observer, and `HeroSection.vue` never
collapses the swipe.

---

## Tech Stack

- **Framework** — [Nuxt 4](https://nuxt.com)
- **Runtime** — [Bun](https://bun.sh)
- **Language** — TypeScript
- **Styling** — SCSS (7-1 architecture)
- **SEO** — [`@nuxtjs/seo`](https://nuxtseo.com) — sitemap, robots, OG images, schema.org
- **Linting** — ESLint + Stylelint (no Prettier)
- **Testing** — Vitest (`unit`, `nuxt` and `scss` projects)
- **Deployment** — Vercel

---

## Prerequisites

- [Bun](https://bun.sh) `>= 1.3.14`

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/Queep-It/landing-website.git
cd landing-website

# Install dependencies (also sets up the commitguard git hooks automatically)
bun install

# Start development server
bun dev
```

App runs at `http://localhost:3000`

---

## Available Scripts

| Command | Description |
|---|---|
| `bun dev` | Start development server |
| `bun run build` | Build for production |
| `bun preview` | Preview production build locally |
| `bun lint` | Run Stylelint + ESLint across the project |
| `bun lint:fix` | Run both linters and auto-fix issues |
| `bun typecheck` | Run TypeScript type check (`vue-tsc`) |
| `bun run test` | Run the full Vitest suite once |
| `bun test:watch` | Run Vitest in watch mode |
| `bun seo:verify` | Boot the production build and smoke-test every SEO surface |
| `bun seo:lighthouse` | Run Lighthouse CI against the production build |
| `bun clean` | Remove `.nuxt`, `.output` and `dist` |

---

## Project Structure

```
.
├── app/
│   ├── assets/scss/     # 7-1 SCSS architecture (abstracts, base, layout…)
│   ├── components/      # Vue components
│   ├── composables/     # Composition API composables
│   ├── layouts/         # Nuxt layouts
│   ├── pages/           # File-based routing
│   └── utils/           # Auto-imported: copy, content registries, llms.txt
├── public/              # Publicly served static files (see its README)
├── scripts/seo/         # SEO smoke test + Lighthouse CI runners
├── server/routes/       # /llms.txt
├── test/
│   ├── nuxt/            # Tests that need the Nuxt runtime
│   ├── scss/            # sass-true tests for SCSS functions
│   └── unit/            # Plain-Node unit tests
├── .github/             # GitHub templates, Actions, CODEOWNERS
├── nuxt.config.ts       # Nuxt configuration
└── eslint.config.mjs    # ESLint configuration
```

---

## SEO

`@nuxtjs/seo` wires the sitemap, robots, canonicals, dynamic OG images and
schema.org from one `site` block in `nuxt.config.ts`. Three things on top of
the defaults:

- **Two JSON-LD blocks on the homepage**, not one. `SoftwareApplication` earns
  the price/platform rich result; `FAQPage` can surface an individual answer
  directly in the SERP. Google reads them independently, so nesting the FAQ
  inside the application entity makes it ineligible. The offer price is read
  from `PRICING` rather than repeated, so a pricing change cannot leave stale
  markup behind.
- **`/llms.txt`** — the [llmstxt.org](https://llmstxt.org) convention, served
  from `server/routes/llms.txt.ts` and generated by `app/utils/llms.ts`. A
  route rather than a static file so the URL comes from the same site config as
  the sitemap; a preview deploy emits its own host. It is listed explicitly in
  `nitro.prerender.routes` because nothing links to it, so the crawler would
  never reach it.
- **OG images render through Satori**, not Chromium — the `*.satori.vue`
  suffix on `app/components/OgImage/`. Satori is edge- and Bun-safe, where the
  Chromium renderer will not run on this preset. It supports a subset of CSS
  (flexbox, no grid, no `background-clip`), which is why the OG card repeats
  the palette literally and rebuilds the mark from two boxes instead of reusing
  the component's SVG.

### Checking it

```bash
bun seo:verify              # every surface on every route
bun seo:lighthouse          # desktop budgets
bun seo:lighthouse lighthouserc.mobile.json
```

`seo:verify` runs in CI after the build, reading `.output` directly, so it
costs no extra build. When a page is added, add its route to the `ROUTES`
default in `scripts/seo/verify.sh` — otherwise its metadata is never asserted,
which is how a page ships with the fallback title and nobody notices.

---

## Testing

Vitest runs three projects in one pass (see `vitest.config.ts`):

- **`unit`** — plain Node. Import modules relatively, not via `~`.
- **`nuxt`** — real Nuxt runtime, so auto-imports and composables resolve.
- **`scss`** — [sass-true](https://github.com/oddbird/true) suites for the
  SCSS functions in `app/assets/scss/abstracts/`.

```bash
bun run test
```

---

## Git Workflow

See [`.github/BRANCHING.md`](.github/BRANCHING.md) for the full branching strategy.

**Quick summary:**
- `main` is the only long-lived branch — branch off it, and never push to it directly
- Use `type/short-description` branch names (e.g. `feat/pricing-section`)
- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/)
- Open a PR to `main`

---

## Code Style

Enforced on every commit by [commitguard](https://github.com/moulibheemaneti/commitguard)
(see `commitguard.yaml`):

- **ESLint** — TypeScript and Vue rules, and formatting via `@stylistic`
  (there is no Prettier in this project). Three-space indent, double quotes,
  no semicolons.
- **Stylelint** — SCSS rules, including BEM class naming
- **`bun typecheck`** — runs before every commit
- **Conventional commits** — validated on the commit message

---

## Releases

Versioning and `CHANGELOG.md` are automated by
[semantic-release](https://semantic-release.gitbook.io/) (`release.config.mjs`),
driven by the commit history. `main` is the only release branch — every push to
it is evaluated, and `feat:` / `fix:` commits since the last tag decide the
version bump. There is no pre-release channel.

---

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

`NUXT_PUBLIC_DOWNLOAD_URL` is the one worth knowing about. Leave it empty and
every call to action becomes a waitlist link with waitlist wording, handled in
one place by `app/composables/useDownload.ts` — that is what stops a "Get
Queep It" button shipping while it points at nothing.

> ⚠️ Never commit `.env` — it is gitignored.

---

## Deployment

Deployed on **Vercel**. Every push to `main` triggers a production deploy
automatically.

`nuxt.config.ts` deliberately leaves `nitro.preset` **unset** on Vercel. An
explicit preset overrides Nitro's provider auto-detection, so hardcoding `bun`
makes the Vercel build emit a Bun server instead of `.vercel/output/` — Vercel
then can't run it and silently falls back to serving the static SPA shell. The
Bun preset is applied only off-platform, for `bun run .output/server/index.mjs`.

---

## License

[MIT](LICENSE)
