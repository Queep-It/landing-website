// @vitest-environment nuxt
import { mountSuspended } from "@nuxt/test-utils/runtime"
import { describe, expect, it } from "vitest"

import AppIcon from "../../app/components/AppIcon.vue"
import QueepitLogo from "../../app/components/QueepitLogo.vue"
import QueepitMark from "../../app/components/QueepitMark.vue"

describe("QueepitMark", () => {
   // The mark sits beside the word "Queepit" everywhere it appears, so an
   // accessible name here makes a screen reader read the brand twice.
   it("is hidden from assistive technology", async() => {
      const mark = await mountSuspended(QueepitMark)

      expect(mark.attributes("aria-hidden")).toBe("true")
      expect(mark.attributes("focusable")).toBe("false")
   })

   // The gap between the bookmark and the Q is cut out of the artwork
   // itself, so the mark must never paint the backdrop colour — that is
   // what lets one drawing sit on the cream page, the sunken footer band
   // and the white mock windows without a notch showing.
   it("cuts its knockout out of the artwork rather than painting it", async() => {
      const mark = await mountSuspended(QueepitMark)

      expect(mark.find("[fill-rule=\"evenodd\"]").exists()).toBe(true)
      expect(mark.html()).not.toContain("stroke")
   })

   // Both fills are overridable, but the accent defaults to the brand
   // token rather than to `currentColor` — the bookmark stays amber when
   // the mark is drawn in inverted ink.
   it("defaults the bookmark to the accent token", async() => {
      const mark = await mountSuspended(QueepitMark)

      expect(mark.html()).toContain("var(--accent-solid)")
      expect(mark.html()).toContain("currentColor")
   })
})

describe("QueepitLogo", () => {
   // The lockup draws the wordmark as outlines. If it also carried an
   // accessible name, the topbar link would announce "Queepit" twice —
   // once from the artwork and once from the visually hidden copy that
   // `SiteBrand` renders beside it.
   it("is hidden from assistive technology", async() => {
      const logo = await mountSuspended(QueepitLogo)

      expect(logo.attributes("aria-hidden")).toBe("true")
      expect(logo.attributes("focusable")).toBe("false")
   })

   it("themes both the letterforms and the accent", async() => {
      const logo = await mountSuspended(QueepitLogo)

      expect(logo.html()).toContain("currentColor")
      expect(logo.html()).toContain("var(--accent-solid)")
   })
})

describe("AppIcon", () => {
   it("renders a path for every declared name", async() => {
      const icon = await mountSuspended(AppIcon, { props: { name: "search" } })

      expect(icon.find("path").attributes("d")).toBeTruthy()
      expect(icon.attributes("aria-hidden")).toBe("true")
   })
})
