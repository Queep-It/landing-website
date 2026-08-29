/// --------------------------------------------------
/// utils/content.ts
/// --------------------------------------------------
/// The registries behind the three list-shaped sections: features, the
/// three-step flow, pricing tiers and the FAQ.
///
/// Kept apart from `copy.ts` because these are *records with structure*
/// rather than loose strings — a feature has an icon key and an id the
/// section anchors off, a tier has a price and an ordered feature list.
/// `test/unit/content.test.ts` asserts the invariants that a template
/// cannot: unique ids, exactly one featured tier, non-empty answers.
///
/// Auto-imported by Nuxt. Tests import it relatively (see test/unit).
/// --------------------------------------------------

// Imported explicitly rather than left to Nuxt's auto-import: `utils/llms.ts`
// pulls this module into the Nitro route for `/llms.txt`, and the server TS
// project has none of the app-side auto-import globals.
import { REQUIREMENTS } from "./site"

/** Keys into the sprite in `components/AppIcon.vue`. */
export type IconName
   = | "bolt"
     | "search"
     | "layers"
     | "shield"
     | "sparkles"
     | "devices"
     | "clipboard"
     | "tag"

export interface Feature {
   id: string
   icon: IconName
   title: string
   body: string
}

export interface FlowStep {
   id: string
   /** The verb from the tagline. Rendered as the step's display number. */
   verb: string
   title: string
   body: string
}

export interface PricingTier {
   id: string
   name: string
   price: string
   period: string
   blurb: string
   features: string[]
   cta: string
   /** Exactly one tier carries this — see the test. */
   featured: boolean
}

export interface FaqEntry {
   id: string
   question: string
   answer: string
}

/**
 * The feature grid.
 *
 * Ordered by how early a new visitor needs to hear it, not by how clever
 * the feature is: capture speed first, because that is the objection
 * ("another app to open"), and sync last, because nobody buys on sync but
 * everybody checks for it.
 */
export const FEATURES: Feature[] = [
   {
      id: "capture",
      icon: "bolt",
      title: "Capture without switching",
      body: "A global hotkey and a menu bar shelf. Copy, drag or share anything into "
        + "Queep without leaving the app you are in — no window to find, no folder to pick.",
   },
   {
      id: "types",
      icon: "layers",
      title: "Text, images, files, documents",
      body: "Each type gets a real preview and the actions that suit it. Code keeps its "
        + "syntax highlighting, PDFs open to the right page, images scale to fit the tile.",
   },
   {
      id: "search",
      icon: "search",
      title: "Find it before you finish typing",
      body: "Search runs across names, contents and extracted text from images and PDFs. "
        + "Results narrow on every keystroke, and the top hit is usually the right one.",
   },
   {
      id: "organise",
      icon: "tag",
      title: "Collections that tag themselves",
      body: "Queep suggests a collection and a few tags the moment something lands. Accept "
        + "with Return, change it with a keystroke, or ignore it entirely — untagged still works.",
   },
   {
      id: "reuse",
      icon: "clipboard",
      title: "Paste straight back out",
      body: "Pick an item and it goes to the clipboard in the format you need — plain text, "
        + "rich text, a file path, or the file itself, dropped where your cursor is.",
   },
   {
      id: "sync",
      icon: "devices",
      title: "The same shelf on every device",
      body: "Saved on the Mac, there on the iPhone. Sync runs through your own iCloud "
        + "account, so there is no Queep server holding your library and no account to create.",
   },
]

/** The three-verb loop from the tagline, expanded. */
export const FLOW: FlowStep[] = [
   {
      id: "keep",
      verb: "Keep",
      title: "Save it in one motion",
      body: "Hit the hotkey or drop it on the menu bar icon. Queep takes the thing, works "
        + "out what it is, and gets out of the way.",
   },
   {
      id: "find",
      verb: "Find",
      title: "Get it back in a keystroke",
      body: "Open the shelf, start typing. Search reads inside documents and images, so "
        + "you can look for the words you remember rather than the filename you did not choose.",
   },
   {
      id: "use",
      verb: "Use",
      title: "Put it where it needs to go",
      body: "Return pastes it into whatever is in front of you. Drag it into a message, a "
        + "document or a folder. The shelf closes itself behind you.",
   },
]

/**
 * Pricing.
 *
 * One free tier and two paid, and deliberately no per-seat or per-month
 * ladder: this is a utility opened fifty times a day, and a recurring
 * charge for one is the thing the FAQ has to answer defensively. The paid
 * tier is a one-off licence with a year of updates.
 */
export const PRICING: PricingTier[] = [
   {
      id: "free",
      name: "Free",
      price: "$0",
      period: "forever",
      blurb: "Everything you need to decide whether Queep belongs in your day.",
      features: [
         "Up to 100 saved items",
         "Text, image and file capture",
         "Global hotkey and menu bar shelf",
         "Full-text and filename search",
         "Local library, no account needed",
      ],
      cta: "Start free",
      featured: false,
   },
   {
      id: "pro",
      name: "Pro",
      price: "$29",
      period: "one-time",
      blurb: "The whole app, on every device you own, with a year of updates included.",
      features: [
         "Unlimited saved items",
         "Text extracted from images and PDFs",
         "Automatic collections and tag suggestions",
         "iCloud sync across Mac, iPhone and iPad",
         "Quick Look previews and paste formats",
         "One year of updates, yours to keep",
      ],
      cta: "Get Pro",
      featured: true,
   },
   {
      id: "team",
      name: "Team",
      price: "$19",
      period: "per seat, one-time",
      blurb: "Pro for everyone, bought once, with shared collections on top.",
      features: [
         "Everything in Pro",
         "Shared collections across the team",
         "Volume licensing from five seats",
         "Priority support",
      ],
      cta: "Talk to us",
      featured: false,
   },
]

/**
 * The FAQ.
 *
 * Rendered as JSON-LD `FAQPage` as well as on the page (see
 * `pages/index.vue`), which is why the answers are written as complete
 * sentences with no "see above" — a rich result shows one answer with no
 * surrounding page to lean on.
 */
export const FAQ: FaqEntry[] = [
   {
      id: "difference",
      question: "How is this different from Notes or Finder?",
      answer: "Notes is for things you write and Finder is for files you have already "
        + "decided where to put. Queep is for the gap between them — the snippet, screenshot "
        + "or attachment you want to keep for the next few days without naming it, filing it, "
        + "or deciding which of the two it belongs in.",
   },
   {
      id: "storage",
      question: "Where is my data stored?",
      answer: "On your device, in a local library. If you turn sync on, it moves through "
        + "your own iCloud account between your devices. There is no Queep server holding "
        + "your library, and there is no Queep account to create.",
   },
   {
      id: "offline",
      question: "Does it work offline?",
      answer: "Yes. Capture, search and paste are all local operations and none of them "
        + "need a network. Sync catches up the next time your devices are online.",
   },
   {
      id: "requirements",
      question: "What do I need to run it?",
      answer: `Queep needs ${REQUIREMENTS.macos} or later on the Mac, and ${REQUIREMENTS.ios} `
        + "or later on iPhone and iPad. It runs natively on both Apple silicon and Intel Macs.",
   },
   {
      id: "subscription",
      question: "Is there a subscription?",
      answer: "No. Pro is a one-time purchase that includes a year of updates, and the "
        + "version you bought keeps working after that year whether or not you buy another. "
        + "The free tier has no time limit.",
   },
   {
      id: "import",
      question: "Can I get my things out again?",
      answer: "Any time. Everything exports to plain files and folders, with text as "
        + "Markdown and metadata alongside it as JSON. Nothing you save is locked into a "
        + "format only Queep can read.",
   },
]
