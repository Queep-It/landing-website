/// --------------------------------------------------
/// utils/llms.ts
/// --------------------------------------------------
/// The body of `/llms.txt` — the llmstxt.org convention, which is to a
/// language model roughly what `sitemap.xml` is to a crawler: one plain
/// Markdown file, at a fixed path, listing what the site offers and where.
///
/// Generated from `SEO`, `FEATURES` and `PRICING` rather than authored as
/// a static file in `public/`. Those registries already have to stay in
/// step with the page, so deriving the listing from them means a new
/// feature or tier cannot ship with a card on the page and no line here —
/// the failure mode a hand-maintained copy always ends in.
///
/// The server route is the thin half: it supplies the site URL and sets
/// the content type. Everything that decides what the file *says* is here,
/// where it runs in plain Node and is testable without Nitro.
///
/// Auto-imported by Nuxt. Tests import it relatively (see test/unit).
/// --------------------------------------------------

// Imported rather than left to Nuxt's auto-import, which the other utils
// rely on: this module is unit-tested in plain Node, where there is none.
import { FEATURES, PRICING } from "./content"
import { COPY, SEO, type PageKey } from "./copy"

/**
 * The pages, in the order they are listed.
 *
 * Hardcoded because there are four of them and they have no registry.
 * `PageKey` still keys them, so a renamed page is a type error.
 */
const PAGES: { key: PageKey, path: string }[] = [
   { key: "home", path: "/" },
   { key: "contact", path: "/contact" },
]

/**
 * Pages a model may skip when it needs a shorter context — the "Optional"
 * section llmstxt.org reserves for exactly that. The policy and the terms
 * are worth publishing and worth nobody's last thousand tokens.
 */
const OPTIONAL_PAGES: { key: PageKey, path: string }[] = [
   { key: "privacy", path: "/privacy-policy" },
   { key: "terms", path: "/terms" },
]

/**
 * One H2 and its rows. The blank line under the heading is not needed to
 * parse, but every example on llmstxt.org carries it, and a file whose
 * whole job is to be read by something else is the wrong place to be
 * clever about whitespace.
 */
const section = (heading: string, rows: string[]): string =>
   `## ${heading}\n\n${rows.join("\n")}`

/** One `- [Name](url): description` row. */
const link = (name: string, url: string, description: string): string =>
   `- [${name}](${url}): ${description}`

/**
 * Render `/llms.txt` for the site rooted at `siteUrl`.
 *
 * Takes the URL as an argument rather than reading site config directly so
 * the output is a pure function of its input: the preview deploys and the
 * production build differ only in this one string, and a test can assert
 * on absolute URLs without standing up Nitro.
 */
export const llmsTxt = (siteUrl: string): string => {
   // Trailing slashes are legal in `site.url` and would double up against
   // the leading slash every path here carries.
   const base = siteUrl.replace(/\/+$/, "")
   const absolute = (path: string): string => `${base}${path}`

   const sections: string[] = [
      `# ${COPY.site.name}`,
      `> ${COPY.site.tagline} — ${COPY.site.blurb}`,
      // The two things a model should know before recommending the app,
      // and neither is inferable from a list of links.
      "Queepit is a native app for macOS, iPadOS and iOS. Libraries are stored locally and "
      + "synced through the user's own iCloud account; there is no Queepit server and no "
      + "Queepit account.",
   ]

   sections.push(section("Features", FEATURES.map((feature) =>
      link(feature.title, absolute(`/#${feature.id}`), feature.body),
   )))

   sections.push(section("Pricing", PRICING.map((tier) =>
      link(`${tier.name} — ${tier.price} ${tier.period}`, absolute("/#pricing"), tier.blurb),
   )))

   sections.push(section("Pages", PAGES.map(({ key, path }) =>
      link(SEO[key].title, absolute(path), SEO[key].description),
   )))

   sections.push(section("Optional", OPTIONAL_PAGES.map(({ key, path }) =>
      link(SEO[key].title, absolute(path), SEO[key].description),
   )))

   // Blank line between blocks, and a trailing newline: this is a text file
   // served from a URL, and a file that does not end in one is a papercut
   // for every tool that concatenates it.
   return `${sections.join("\n\n")}\n`
}
