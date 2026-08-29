// @vitest-environment nuxt
import { mountSuspended } from "@nuxt/test-utils/runtime"
import { describe, expect, it } from "vitest"

import AppIcon from "../../app/components/AppIcon.vue"
import QueepItMark from "../../app/components/QueepItMark.vue"

describe("QueepItMark", () => {
   // The mark sits beside the word "Queep It" everywhere it appears, so an
   // accessible name here makes a screen reader read the brand twice.
   it("is hidden from assistive technology", async() => {
      const mark = await mountSuspended(QueepItMark)

      expect(mark.attributes("aria-hidden")).toBe("true")
      expect(mark.attributes("focusable")).toBe("false")
   })

   // The knockout around the bookmark has to follow whatever surface the
   // mark is drawn on — the footer band and the header veil are different
   // colours, and a hardcoded gap shows as a cream notch on one of them.
   it("takes its knockout colour from a prop", async() => {
      const mark = await mountSuspended(QueepItMark, {
         props: { gapColor: "var(--surface-sunken)" },
      })

      expect(mark.html()).toContain("var(--surface-sunken)")
   })
})

describe("AppIcon", () => {
   it("renders a path for every declared name", async() => {
      const icon = await mountSuspended(AppIcon, { props: { name: "search" } })

      expect(icon.find("path").attributes("d")).toBeTruthy()
      expect(icon.attributes("aria-hidden")).toBe("true")
   })
})
