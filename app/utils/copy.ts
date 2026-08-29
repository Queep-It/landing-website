/// --------------------------------------------------
/// utils/copy.ts
/// --------------------------------------------------
/// Every user-facing string on the site, in one place.
///
/// The site is single-locale English, so there is no translation layer:
/// components read these constants directly instead of calling a `t()`
/// helper. Keeping the copy here rather than inline in templates preserves
/// the one property that matters — all wording is reviewable and editable
/// from a single file — while making a mistyped key a type error rather
/// than a raw key rendered to the page.
///
/// Auto-imported by Nuxt. Tests import it relatively (see test/unit).
/// --------------------------------------------------

// Imported explicitly rather than left to Nuxt's auto-import: `utils/llms.ts`
// pulls this module into the Nitro route for `/llms.txt`, and the server TS
// project has none of the app-side auto-import globals.
import { REQUIREMENTS } from "./site"

/** Pages that carry their own search metadata. */
export type PageKey = "home" | "privacy" | "terms" | "contact"

export interface SeoCopy {
   /** Rendered as <title>. Budget: SEO_TITLE_MAX. */
   title: string
   /** Rendered as <meta name="description">. Budget: SEO_DESCRIPTION_MAX. */
   description: string
}

export const COPY = {
   site: {
      name: "Queep",
      tagline: "Keep it. Find it. Use it.",
      blurb: "Queep is the place for the things worth keeping close. Save anything "
        + "quickly, find it fast, and use it whenever you need.",
   },

   nav: {
      label: "Primary",
      menuOpen: "Open menu",
      menuClose: "Close menu",
      skip: "Skip to content",
      links: [
         { label: "Features", href: "#features" },
         { label: "How it works", href: "#how-it-works" },
         { label: "Pricing", href: "#pricing" },
         { label: "FAQ", href: "#faq" },
      ],
   },

   hero: {
      eyebrow: "For macOS, iPadOS and iOS",
      // Split so the middle phrase can carry the amber swipe on its own.
      titleBefore: "Everything worth",
      titleAccent: "keeping close",
      titleAfter: ", in one place",
      lede: "Snippets, screenshots, files and documents scatter across a dozen apps the "
        + "moment you save them. Queep catches all of it in one shelf — and gets it back "
        + "to you in a keystroke.",
      primary: "Get Queep",
      primaryPending: "Join the beta",
      secondary: "See how it works",
      note: `Free while in beta · Requires ${REQUIREMENTS.macos} or later`,
   },

   features: {
      eyebrow: "One shelf",
      title: "Four kinds of thing, one way to handle them",
      lede: "Text, images, files and documents each get the treatment they deserve — "
        + "without four separate apps, four sync setups and four places to look.",
   },

   flow: {
      eyebrow: "The whole loop",
      title: "Keep it. Find it. Use it.",
      lede: "Three verbs, and Queep is built around exactly those. Nothing in the app "
        + "exists that does not serve one of them.",
   },

   pricing: {
      eyebrow: "Pricing",
      title: "Free to start, one price to own",
      lede: "No subscription treadmill for a utility you use fifty times a day. Pay once "
        + "for the version you have, keep it forever.",
      billingNote: "Prices in USD. Regional pricing applies on the App Store.",
   },

   faq: {
      eyebrow: "Questions",
      title: "The things people ask first",
      lede: "Still stuck? Write to us — the address on the contact page reaches a human.",
   },

   cta: {
      title: "Stop losing the good stuff",
      lede: "Queep takes about a minute to set up and roughly no time at all to learn. "
        + "Save one thing today and see whether you go back.",
      primary: "Get Queep",
      primaryPending: "Join the beta",
      secondary: "Read the FAQ",
   },

   footer: {
      rights: "All rights reserved.",
      navLabel: "Footer",
      tagline: "Keep it. Find it. Use it.",
      groups: {
         product: "Product",
         company: "Company",
      },
      privacy: "Privacy",
      terms: "Terms",
      contact: "Contact",
   },

   theme: {
      legend: "Colour theme",
      system: "Auto",
      light: "Light",
      dark: "Dark",
   },

   error: {
      home: "Back to the homepage",
      notFound: {
         code: "404",
         heading: "This page is not on the shelf",
         lede: "The link may be out of date, or the page may have moved. Everything the "
           + "site has is one click away from the homepage.",
      },
      unexpected: {
         code: "500",
         heading: "Something went wrong",
         lede: "An unexpected error interrupted the page. Reloading usually clears it; "
           + "if it does not, the contact page reaches us.",
      },
   },

   contact: {
      heading: "Contact",
      lede: "One address, read by a person. Bug reports, feature requests, press and "
        + "anything else all land in the same inbox.",
      responseNote: "We answer most messages within two working days.",
   },
} as const

/**
 * Search metadata, one block per indexable page.
 *
 * Written out rather than generated because there are four of them and each
 * one is hand-tuned against a different query. `PageKey` keys the record, so
 * adding a page without its metadata is a type error rather than a page that
 * silently ships with the site-wide fallback title.
 */
export const SEO: Record<PageKey, SeoCopy> = {
   home: {
      title: "Queep — Keep it. Find it. Use it.",
      description: "One place on your Mac, iPhone and iPad for the snippets, images, files "
        + "and documents worth keeping close. Save fast, find faster, reuse anywhere.",
   },
   privacy: {
      title: "Privacy Policy | Queep",
      description: "What Queep stores, what it never uploads, and the choices you have. "
        + "Your library stays on your devices and in your own iCloud account.",
   },
   terms: {
      title: "Terms of Use | Queep",
      description: "The terms covering your use of Queep and this website, in plain "
        + "language: licence, acceptable use, availability and liability.",
   },
   contact: {
      title: "Contact | Queep",
      description: "Reach the Queep team about bugs, feature requests, billing or press. "
        + "One address, read by a person, answered within two working days.",
   },
}
