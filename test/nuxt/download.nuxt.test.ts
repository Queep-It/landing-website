// @vitest-environment nuxt
import { describe, expect, it } from "vitest"

import { useDownload } from "../../app/composables/useDownload"

/// With no `NUXT_PUBLIC_DOWNLOAD_URL` configured — the state the repo
/// ships in — every call to action has to become a waitlist link with
/// waitlist wording. The failure this guards is a pill reading "Get Queepit"
/// that points at nothing.

describe("useDownload", () => {
   it("reports unavailable when no URL is configured", () => {
      const { available } = useDownload()

      expect(available.value).toBe(false)
   })

   it("falls back to the contact page rather than to a fragment", () => {
      const { href } = useDownload()

      expect(href.value).toBe("/contact")
   })

   it("picks the pending label while unavailable", () => {
      const { label } = useDownload()

      expect(label("Get Queepit", "Join the beta").value).toBe("Join the beta")
   })
})
