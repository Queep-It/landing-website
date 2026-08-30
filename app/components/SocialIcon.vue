<template>
   <svg
      aria-hidden="true"
      class="social-icon"
      focusable="false"
      role="presentation"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
   >
      <path :d="PATHS[name]" fill="currentColor" fill-rule="evenodd" />
   </svg>
</template>

<script lang="ts" setup>
import type { SocialIconName } from "~/utils/site"

/// Brand marks, kept apart from `AppIcon`.
///
/// `AppIcon` is a 1.75-stroke UI set drawn on a 24px grid, and these are
/// not that: a logo is a fixed shape whose weight is the owner's decision,
/// so redrawing X and Instagram as strokes to match would produce two
/// marks that are recognisably wrong. Filled paths in their own component
/// keeps that difference explicit instead of bending `AppIcon`'s rules.
///
/// Sized by `font-size` at the call site rather than fixed here, so the
/// footer row can set both marks to one optical size.

defineProps<{
   name: SocialIconName
}>()

/// `fill-rule: evenodd` on both, because each mark is a solid outer shape
/// with counters punched out of it — the ring and lens on Instagram, the
/// two crossing strokes on X. Under the default `nonzero` the counters
/// fill in and both read as a blob.
///
/// Template literals rather than concatenated string pieces. SVG treats a
/// newline in path data as a separator, so wrapping is free here — whereas
/// `"…3.05-.76" + "1.42 0…"` silently glues two numbers into `-.761.42`
/// and bends the curve. Every break below falls before a command letter,
/// which self-delimits, so no line can split a coordinate.
const PATHS: Record<SocialIconName, string> = {
   // The X mark: two crossing strokes with mitred ends.
   x: `M18.9 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.21-6.82-5.96 6.82H1.35
      l7.73-8.84L.93 2.25h6.83l4.71 6.23 5.43-6.23Zm-1.16 17.52h1.83L6.65 4.13
      H4.68l13.06 15.64Z`,

   // The camera: rounded square, lens, and the small lamp top-right.
   instagram: `M12 2.25
      c-2.65 0-2.99.01-4.03.06-1.04.05-1.75.21-2.37.46-.64.25-1.19.58-1.73 1.13-.55.54-.88 1.09-1.13 1.73-.25.62-.41 1.33-.46 2.37-.05 1.04-.06 1.38-.06 4.06
      s.01 3.02.06 4.06
      c.05 1.04.21 1.75.46 2.37.25.64.58 1.19 1.13 1.73.54.55 1.09.88 1.73 1.13.62.25 1.33.41 2.37.46 1.04.05 1.38.06 4.03.06
      s2.99-.01 4.03-.06
      c1.04-.05 1.75-.21 2.37-.46.64-.25 1.19-.58 1.73-1.13.55-.54.88-1.09 1.13-1.73.25-.62.41-1.33.46-2.37.05-1.04.06-1.38.06-4.06
      s-.01-3.02-.06-4.06
      c-.05-1.04-.21-1.75-.46-2.37-.25-.64-.58-1.19-1.13-1.73-.54-.55-1.09-.88-1.73-1.13-.62-.25-1.33-.41-2.37-.46-1.04-.05-1.38-.06-4.03-.06
      Zm0 1.77
      c2.6 0 2.92.01 3.95.06.95.04 1.47.2 1.81.34.46.18.78.39 1.12.73.34.34.55.66.73 1.12.14.34.3.86.34 1.81.05 1.03.06 1.34.06 3.95
      s-.01 2.92-.06 3.95
      c-.04.95-.2 1.47-.34 1.81-.18.46-.39.78-.73 1.12-.34.34-.66.55-1.12.73-.34.14-.86.3-1.81.34-1.03.05-1.35.06-3.95.06
      s-2.92-.01-3.95-.06
      c-.95-.04-1.47-.2-1.81-.34-.46-.18-.78-.39-1.12-.73-.34-.34-.55-.66-.73-1.12-.14-.34-.3-.86-.34-1.81-.05-1.03-.06-1.34-.06-3.95
      s.01-2.92.06-3.95
      c.04-.95.2-1.47.34-1.81.18-.46.39-.78.73-1.12.34-.34.66-.55 1.12-.73.34-.14.86-.3 1.81-.34 1.03-.05 1.35-.06 3.95-.06
      ZM12 15.24a3.24 3.24 0 1 1 0-6.48 3.24 3.24 0 0 1 0 6.48Zm0-8.23
      a4.99 4.99 0 1 0 0 9.98 4.99 4.99 0 0 0 0-9.98Zm6.35-.2
      a1.17 1.17 0 1 1-2.33 0 1.17 1.17 0 0 1 2.33 0Z`,
}
</script>

<style scoped lang="scss">
.social-icon {
   display: block;
   inline-size: 1em;
   block-size: 1em;
}
</style>
