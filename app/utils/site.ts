/// --------------------------------------------------
/// utils/site.ts
/// --------------------------------------------------
/// Site-wide constants that are not part of Nuxt's own `site` config.
/// Auto-imported, so use them directly in components and pages.
/// --------------------------------------------------

/** The single public contact address — shown in the footer and the policy. */
export const SITE_EMAIL = "queepit.app@gmail.com"

/**
 * Where the "Download on the App Store" badge points.
 *
 * TODO: placeholder — replace before launch.
 *   1. Swap this for the real listing URL once the app has an App Store ID.
 *      The `id000000000` below is deliberately invalid so a shipped
 *      placeholder 404s loudly rather than looking plausible.
 *   2. Replace the drawn badge in `AppStoreBadge.vue` with Apple's official
 *      artwork. Apple's marketing guidelines require the supplied badge, not
 *      a recreation, and set minimum sizes and clear space around it — a
 *      hand-drawn approximation is not compliant for production.
 *   3. Fold this into `NUXT_PUBLIC_DOWNLOAD_URL` / `useDownload` so the badge
 *      obeys the same pre-release guard as every other call to action. Right
 *      now it does not: the badge renders and links out even while the rest
 *      of the page is still showing waitlist wording.
 */
export const APP_STORE_URL = "https://apps.apple.com/app/queep-it/id000000000"

/**
 * The public social profiles, in the order they appear in the footer.
 *
 * Kept here beside the other outward-facing constants rather than in
 * `copy.ts`: the label is not copy to reword, it is the platform's own
 * name and the accessible name of the link.
 */
export interface SocialLink {
   /** Platform name — used as the link's accessible name. */
   label: string
   href: string
   icon: SocialIconName
}

export type SocialIconName = "x" | "instagram"

export const SOCIAL_LINKS: SocialLink[] = [
   { label: "X", href: "https://x.com/queepitapp", icon: "x" },
   { label: "Instagram", href: "https://www.instagram.com/queepit.app/", icon: "instagram" },
]

/** Minimum OS versions, quoted in the hero note and the FAQ. */
export const REQUIREMENTS = {
   macos: "macOS 14 Sonoma",
   ios: "iOS 17",
} as const

/**
 * Where every "Get Queep It" button points, and whether it is a real download
 * yet.
 *
 * Returns a discriminated union rather than a bare string so callers cannot
 * forget the pre-release case: a component that reads `.href` has to have
 * narrowed on `.available` first, which is the whole reason an empty
 * `NUXT_PUBLIC_DOWNLOAD_URL` cannot ship a dead button.
 */
export type DownloadTarget
   = | { available: true, href: string }
     | { available: false, href: null }

export const downloadTarget = (url: string): DownloadTarget =>
   (url.trim().length > 0 ? { available: true, href: url.trim() } : { available: false, href: null })
