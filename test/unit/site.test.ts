import { describe, expect, it } from "vitest"

import { downloadTarget } from "../../app/utils/site"

describe("downloadTarget", () => {
   it("reports unavailable for an unset URL", () => {
      expect(downloadTarget("")).toEqual({ available: false, href: null })
   })

   // Env vars picked up from a `.env` file routinely arrive with trailing
   // whitespace, and a whitespace-only value must not read as configured.
   it("treats whitespace as unset", () => {
      expect(downloadTarget("   ").available).toBe(false)
   })

   it("trims a configured URL", () => {
      expect(downloadTarget("  https://apps.apple.com/app/queep  ")).toEqual({
         available: true,
         href: "https://apps.apple.com/app/queep",
      })
   })
})
