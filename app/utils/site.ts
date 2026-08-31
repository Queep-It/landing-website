/// --------------------------------------------------
/// utils/site.ts
/// --------------------------------------------------
/// Site-wide constants that are not part of Nuxt's own `site` config.
/// Auto-imported, so use them directly in components and pages.
/// --------------------------------------------------

/** The single public contact address — shown in the footer and the policy. */
export const SITE_EMAIL = "queepit.app@gmail.com"

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
   /**
    * Whether the rendered link carries `rel="me"`.
    *
    * Mastodon verifies the website on a profile by fetching that site and
    * looking for a `rel="me"` link pointing back at the profile — the
    * green tick is only granted when both halves of the pair exist. So
    * this footer link is load-bearing: drop it, or drop the `rel`, and the
    * profile silently loses its verification on Mastodon's next re-check.
    *
    * Only set where a platform actually consumes it. It is a claim that
    * the profile and this site are the same identity, and marking links we
    * have no verification arrangement with just makes the claim noise.
    */
   me?: boolean
}

export type SocialIconName = "x" | "instagram" | "facebook" | "linkedin" | "mastodon" | "bluesky"

export const SOCIAL_LINKS: SocialLink[] = [
   { label: "X", href: "https://x.com/queepitapp", icon: "x" },
   { label: "Instagram", href: "https://www.instagram.com/queepit.app/", icon: "instagram" },
   { label: "Facebook", href: "https://www.facebook.com/queepitapp", icon: "facebook" },
   { label: "LinkedIn", href: "https://www.linkedin.com/company/queep-it/", icon: "linkedin" },
   { label: "Mastodon", href: "https://mastodon.social/@queepit", icon: "mastodon", me: true },
   // No `me` here: Bluesky verifies by making the handle a domain you
   // control (DNS or `/.well-known/atproto-did`), not by a link back, and
   // the handle above is still the default `.bsky.social` one.
   { label: "Bluesky", href: "https://bsky.app/profile/queepit.bsky.social", icon: "bluesky" },
]

/** Minimum OS versions, quoted in the hero note and the FAQ. */
export const REQUIREMENTS = {
   macos: "macOS 14 Sonoma",
   ios: "iOS 17",
} as const

/**
 * Where every "Get Queepit" button points, and whether it is a real download
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
