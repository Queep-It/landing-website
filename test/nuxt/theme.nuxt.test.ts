// @vitest-environment nuxt
import { beforeEach, describe, expect, it } from "vitest"

import { THEME_STORAGE_KEY, useTheme } from "../../app/composables/useTheme"

/// "System" is the absence of both the stored key and the `data-theme`
/// attribute — that is what lets the `prefers-color-scheme` media query in
/// `themes/_dark.scss` decide. Storing the string "system" instead would
/// pin every visitor to today's default forever, which is the bug these
/// assertions exist to catch.

describe("useTheme", () => {
   beforeEach(() => {
      localStorage.clear()
      document.documentElement.removeAttribute("data-theme")
   })

   it("defaults to system", () => {
      const { preference } = useTheme()

      expect(preference.value).toBe("system")
   })

   it("writes an explicit choice to the attribute and to storage", () => {
      const { preference, setTheme } = useTheme()

      setTheme("dark")

      expect(preference.value).toBe("dark")
      expect(document.documentElement.getAttribute("data-theme")).toBe("dark")
      expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark")
   })

   it("stores system as the absence of the key", () => {
      const { setTheme } = useTheme()

      setTheme("dark")
      setTheme("system")

      expect(document.documentElement.hasAttribute("data-theme")).toBe(false)
      expect(localStorage.getItem(THEME_STORAGE_KEY)).toBeNull()
   })

   it("falls back to system when storage holds something unrecognised", () => {
      localStorage.setItem(THEME_STORAGE_KEY, "sepia")

      const { preference, sync } = useTheme()

      sync()

      expect(preference.value).toBe("system")
   })
})
