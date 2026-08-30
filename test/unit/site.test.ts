import { describe, expect, it } from "vitest"

import { downloadTarget, SOCIAL_LINKS } from "../../app/utils/site"

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

// Mastodon only keeps the profile's website verified for as long as this
// site links back with `rel="me"`. Nothing on the page looks broken if the
// flag is dropped, so the pair is asserted here rather than left to be
// noticed the next time someone opens the profile.
describe("SOCIAL_LINKS", () => {
   it("marks the Mastodon profile, and only that one, with rel=me", () => {
      expect(SOCIAL_LINKS.filter((link) => link.me).map((link) => link.href))
         .toEqual(["https://mastodon.social/@queepit"])
   })

   it("points every entry at an absolute https profile", () => {
      for (const link of SOCIAL_LINKS)
         expect(link.href).toMatch(/^https:\/\//)
   })
})
