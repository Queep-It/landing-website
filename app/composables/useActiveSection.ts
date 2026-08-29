/// --------------------------------------------------
/// composables/useActiveSection.ts
/// --------------------------------------------------
/// Which section the reader is currently in, for the nav's active state.
///
/// An IntersectionObserver again rather than comparing `scrollY` against
/// every section's `offsetTop` on every frame — same reasoning as
/// `useReveal`, and here it also removes the need to recompute offsets on
/// resize or when a font swap changes a section's height.
///
/// The observer's `rootMargin` is what makes it read correctly: the top
/// inset pushes the detection line below the sticky topbar, and the large
/// negative bottom inset narrows the "current" band to a strip near the
/// top of the viewport. Without that strip, two adjacent sections are both
/// intersecting for most of a scroll and the highlight flickers between
/// them.
/// --------------------------------------------------

/**
 * Track the hashes in `hashes` (`["#features", "#pricing", …]`) and return
 * the one currently in view, or an empty string above the first section.
 */
export const useActiveSection = (hashes: string[]): ComputedRef<string> => {
   const active = ref("")

   onMounted(() => {
      if (typeof IntersectionObserver === "undefined") return

      const sections = hashes
         .map((hash) => document.querySelector<HTMLElement>(hash))
         .filter((element): element is HTMLElement => element !== null)

      if (sections.length === 0) return

      const observer = new IntersectionObserver((entries) => {
         for (const entry of entries) {
            if (!entry.isIntersecting) continue

            active.value = `#${entry.target.id}`
         }
      }, {
         // Top inset clears the sticky bar; the bottom inset closes the
         // band to roughly the upper fifth of the viewport.
         rootMargin: "-20% 0px -70% 0px",
         threshold: 0,
      })

      for (const section of sections) observer.observe(section)

      onBeforeUnmount(() => observer.disconnect())
   })

   return computed(() => active.value)
}
