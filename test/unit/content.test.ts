import { describe, expect, it } from "vitest"

import { FAQ, FEATURES, FLOW, PRICING } from "../../app/utils/content"
import { COPY, SEO } from "../../app/utils/copy"
import { SEO_DESCRIPTION_MAX, SEO_TITLE_MAX } from "../../app/utils/seo"

/// The registries are consumed by the page, by the JSON-LD and by
/// `/llms.txt`, and none of those three can complain about a bad entry —
/// a duplicate id renders two elements with the same anchor, an empty
/// answer emits an empty `acceptedAnswer`, and both ship silently.

const ids = <T extends { id: string }>(entries: T[]): string[] => entries.map((entry) => entry.id)

describe("features", () => {
   it("has unique ids", () => {
      expect(new Set(ids(FEATURES)).size).toBe(FEATURES.length)
   })

   // The ids are used as `#fragment` anchors from `/llms.txt`, so anything
   // that needs URL-encoding would produce a link that does not resolve.
   it("uses ids that are safe as URL fragments", () => {
      for (const feature of FEATURES) {
         expect(feature.id).toMatch(/^[a-z][a-z0-9-]*$/)
      }
   })

   it("gives every feature a title and a body", () => {
      for (const feature of FEATURES) {
         expect(feature.title.length).toBeGreaterThan(0)
         expect(feature.body.length).toBeGreaterThan(0)
      }
   })
})

describe("flow", () => {
   it("has exactly the three verbs from the tagline", () => {
      const verbs = FLOW.map((step) => step.verb)

      expect(verbs).toEqual(["Keep", "Find", "Use"])
      // The tagline is the section heading, so a fourth step would leave
      // the heading describing something the section no longer does.
      expect(COPY.flow.title).toBe("Keep it. Find it. Use it.")
   })
})

describe("pricing", () => {
   it("has unique ids", () => {
      expect(new Set(ids(PRICING)).size).toBe(PRICING.length)
   })

   // The card styling, the JSON-LD offer and the "Most popular" badge all
   // key off this. Two featured tiers renders two badges; zero leaves the
   // JSON-LD offer reading the first tier's price instead.
   it("marks exactly one tier as featured", () => {
      expect(PRICING.filter((tier) => tier.featured)).toHaveLength(1)
   })

   it("gives every tier at least one feature and a call to action", () => {
      for (const tier of PRICING) {
         expect(tier.features.length).toBeGreaterThan(0)
         expect(tier.cta.length).toBeGreaterThan(0)
      }
   })

   // `pages/index.vue` strips everything but digits and a decimal point to
   // build the schema.org offer, so a price with no digits at all would
   // emit `"price": ""`.
   it("has a price containing a parseable number", () => {
      for (const tier of PRICING) {
         expect(tier.price.replace(/[^0-9.]/g, "")).not.toBe("")
      }
   })
})

describe("faq", () => {
   it("has unique ids", () => {
      expect(new Set(ids(FAQ)).size).toBe(FAQ.length)
   })

   // Answers are emitted as JSON-LD `acceptedAnswer` text, where they are
   // read with no surrounding page. A fragment leaning on the section
   // above it reads as a non-answer in a rich result.
   it("answers as complete sentences", () => {
      for (const entry of FAQ) {
         expect(entry.question.endsWith("?")).toBe(true)
         expect(entry.answer.length).toBeGreaterThan(40)
         expect(entry.answer.trimEnd().endsWith(".")).toBe(true)
      }
   })
})

describe("seo copy", () => {
   it("stays within the SERP budgets", () => {
      for (const [key, entry] of Object.entries(SEO)) {
         expect(entry.title.length, `${key} title`).toBeLessThanOrEqual(SEO_TITLE_MAX)
         expect(entry.description.length, `${key} description`)
            .toBeLessThanOrEqual(SEO_DESCRIPTION_MAX)
      }
   })

   it("gives every page a distinct title", () => {
      const titles = Object.values(SEO).map((entry) => entry.title)

      expect(new Set(titles).size).toBe(titles.length)
   })
})
