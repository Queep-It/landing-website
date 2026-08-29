/// --------------------------------------------------
/// utils/site.ts
/// --------------------------------------------------
/// Site-wide constants that are not part of Nuxt's own `site` config.
/// Auto-imported, so use them directly in components and pages.
/// --------------------------------------------------

/** The single public contact address — shown in the footer and the policy. */
export const SITE_EMAIL = "queepit.app@gmail.com"

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
