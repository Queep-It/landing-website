/// --------------------------------------------------
/// composables/useReveal.ts
/// --------------------------------------------------
/// Scroll-triggered entrances.
///
/// An IntersectionObserver rather than a scroll listener: the browser does
/// the intersection maths off the main thread, so a page with thirty
/// revealing blocks costs nothing per frame. A scroll handler doing the
/// same work would run on every one of them.
///
/// Two decisions worth knowing before changing this:
///
///   1. **The hidden state is added by JavaScript, not by CSS.** The
///      `data-reveal` attribute is written here on mount, so the
///      server-rendered HTML has no hidden state at all. Anyone whose
///      JavaScript fails still gets a fully readable page, which for a
///      marketing site is the only acceptable failure mode.
///   2. **Elements are unobserved once they fire.** These are entrances,
///      not scroll-linked animations — an element that has arrived should
///      stay arrived, and re-hiding it on scroll-up is the "clever"
///      behaviour every visitor finds annoying.
/// --------------------------------------------------

interface RevealOptions {
   /**
    * How far into the viewport an element must come before it fires,
    * as the bottom inset of the observer's root margin.
    *
    * Negative, so the trigger point is *inside* the viewport rather than
    * at its edge — an element that animates in exactly as it clips the
    * bottom of the screen is already half-read by the time it settles.
    */
   rootMargin?: string
   /**
    * Cap on the stagger index. Past this the delay stops growing, because
    * the last tile in a long list otherwise waits long enough that the
    * page reads as broken rather than as choreographed.
    */
   maxStagger?: number
}

const DEFAULTS = {
   rootMargin: "0px 0px -12% 0px",
   maxStagger: 6,
} as const

/**
 * Reveal every `[data-reveal-group] > *` inside `root` as it scrolls into
 * view, staggering siblings by their index.
 *
 * Call it once per page from `onMounted`. It returns nothing to clean up —
 * the observer disconnects itself on unmount.
 */
export const useReveal = (options: RevealOptions = {}): void => {
   const { rootMargin, maxStagger } = { ...DEFAULTS, ...options }

   onMounted(() => {
      // Belt and braces alongside the media query in `_reveal.scss`: with
      // reduced motion requested there is nothing to observe, so skip the
      // observer entirely rather than build one that only ever no-ops.
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal-target]"))

      if (reduced || targets.length === 0) return

      // `IntersectionObserver` is available everywhere the site's baseline
      // reaches, but a prerendered page can also be scraped by tooling
      // that runs a partial DOM — cheaper to check than to throw.
      if (typeof IntersectionObserver === "undefined") return

      const observer = new IntersectionObserver((entries) => {
         for (const entry of entries) {
            if (!entry.isIntersecting) continue

            const element = entry.target as HTMLElement

            element.setAttribute("data-revealed", "")
            // Entrances fire once. Unobserving here rather than
            // disconnecting the whole observer keeps later sections live.
            observer.unobserve(element)
         }
      }, { rootMargin, threshold: 0 })

      for (const element of targets) {
         // Index within its own group, so each section restarts the
         // stagger instead of inheriting a delay from the section above.
         const siblings = Array.from(element.parentElement?.children ?? [])
         const index = Math.min(siblings.indexOf(element), maxStagger)

         element.style.setProperty("--reveal-index", String(Math.max(index, 0)))
         // Written here, not in the template: this is what keeps the
         // hidden state out of the server-rendered HTML.
         element.setAttribute("data-reveal", "")
         observer.observe(element)
      }

      onBeforeUnmount(() => observer.disconnect())
   })
}
