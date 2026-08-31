import { describe, expect, it } from "vitest"

import { FEATURES, PRICING } from "../../app/utils/content"
import { llmsTxt } from "../../app/utils/llms"

const SITE = "https://queepit.com"

describe("llmsTxt", () => {
   it("opens with an H1 and a blockquote summary", () => {
      const lines = llmsTxt(SITE).split("\n")

      expect(lines[0]).toBe("# Queepit")
      expect(lines[2]?.startsWith("> ")).toBe(true)
   })

   it("lists every feature and every pricing tier", () => {
      const output = llmsTxt(SITE)

      for (const feature of FEATURES) {
         expect(output).toContain(`(${SITE}/#${feature.id})`)
      }

      for (const tier of PRICING) {
         expect(output).toContain(tier.name)
      }
   })

   // The whole point of taking the URL as an argument: a preview deploy
   // must emit its own host, not production's.
   it("roots every link at the URL it is given", () => {
      const output = llmsTxt("https://preview.example.com")

      expect(output).not.toContain(SITE)
      expect(output).toContain("https://preview.example.com/contact")
   })

   // `site.url` may legally carry a trailing slash, which would double up
   // against the leading slash on every path.
   it("tolerates a trailing slash on the site URL", () => {
      expect(llmsTxt(`${SITE}/`)).not.toContain("//contact")
   })

   it("ends with exactly one newline", () => {
      const output = llmsTxt(SITE)

      expect(output.endsWith("\n")).toBe(true)
      expect(output.endsWith("\n\n")).toBe(false)
   })
})
