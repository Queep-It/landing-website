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

   // The "in" letters only, without the enclosing square the full logo
   // has. The square would out-weigh the marks beside it — a solid tile in
   // a row of open shapes reads as the odd one out rather than as the same
   // set. Mastodon below is the one exception, because its shield has no
   // open variant to drop to.
   linkedin: `M6.94 21.5H2.5V9.02h4.44V21.5Z
      M4.72 7.06a2.58 2.58 0 1 1 0-5.16 2.58 2.58 0 0 1 0 5.16Z
      M21.5 21.5h-4.43v-6.07c0-1.45-.03-3.31-2.02-3.31-2.02 0-2.33 1.58-2.33 3.21V21.5
      H8.29V9.02h4.25v1.7h.06c.59-1.12 2.04-2.3 4.19-2.3 4.48 0 5.31 2.95 5.31 6.79V21.5Z`,

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

   // The "f" alone, without the blue disc the full logo sits in — the same
   // call the "in" above makes, and for the same reason: dropped in beside
   // these open shapes, the filled disc reads as a button rather than as a
   // member of the set. Scaled to the LinkedIn mark's optical box (y 1.95
   // to 21.55) and centred, so the row does not step in weight.
   facebook: `M16.018 6.295h2.352V2.211
      C17.962 2.154 16.565 1.95 14.94 1.95
      c-3.389 0-5.717 2.131-5.717 6.043V11.75H5.63v4.573h3.593V21.55h4.41v-5.227h3.446l.547-4.573h-3.994V8.443
      c0-1.323 .359-2.148 2.385-2.148Z`,

   // The rounded shield with the "m" punched out of it. Unlike the marks
   // above, this one is not redrawn: it is Mastodon's own artwork verbatim
   // from Simple Icons (CC0-1.0), which already publishes it on the same
   // 24px grid this component uses. Kept as the original rather than
   // traced because the shoulders of the "m" are the whole mark — an
   // approximation of them reads as a different logo, which is the same
   // reason the note above gives for not restyling X and Instagram.
   mastodon: `M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03
      c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127.64 6.412.61 7.837.661 9.143
      c.074 1.874.088 3.745.26 5.611.118 1.24.325 2.47.62 3.68.55 2.237 2.777 4.098 4.96 4.857 2.336.792 4.849.923 7.256.38.265-.061.527-.132.786-.213.585-.184 1.27-.39 1.774-.753
      a.057.057 0 0 0 .023-.043v-1.809
      a.052.052 0 0 0-.02-.041.053.053 0 0 0-.046-.01 20.282 20.282 0 0 1-4.709.545
      c-2.73 0-3.463-1.284-3.674-1.818a5.593 5.593 0 0 1-.319-1.433.053.053 0 0 1 .066-.054
      c1.517.363 3.072.546 4.632.546.376 0 .75 0 1.125-.01 1.57-.044 3.224-.124 4.768-.422.038-.008.077-.015.11-.024 2.435-.464 4.753-1.92 4.989-5.604.008-.145.03-1.52.03-1.67.002-.512.167-3.63-.024-5.545
      zm-3.748 9.195h-2.561V8.29c0-1.309-.55-1.976-1.67-1.976-1.23 0-1.846.79-1.846 2.35v3.403
      h-2.546V8.663c0-1.56-.617-2.35-1.848-2.35-1.112 0-1.668.668-1.67 1.977v6.218H4.822V8.102
      c0-1.31.337-2.35 1.011-3.12.696-.77 1.608-1.164 2.74-1.164 1.311 0 2.302.5 2.962 1.498
      l.638 1.06.638-1.06
      c.66-.999 1.65-1.498 2.96-1.498 1.13 0 2.043.395 2.74 1.164.675.77 1.012 1.81 1.012 3.12z`,

   // The butterfly, verbatim from Simple Icons (CC0-1.0) on the same grid,
   // for the reason given above the Mastodon mark. One unbroken outline
   // with no counters, so `evenodd` leaves it solid.
   bluesky: `M5.202 2.857C7.954 4.922 10.913 9.11 12 11.358c1.087-2.247 4.046-6.436 6.798-8.501
      C20.783 1.366 24 .213 24 3.883
      c0 .732-.42 6.156-.667 7.037-.856 3.061-3.978 3.842-6.755 3.37 4.854.826 6.089 3.562 3.422 6.299-5.065 5.196-7.28-1.304-7.847-2.97-.104-.305-.152-.448-.153-.327 0-.121-.05.022-.153.327-.568 1.666-2.782 8.166-7.847 2.97-2.667-2.737-1.432-5.473 3.422-6.3-2.777.473-5.899-.308-6.755-3.369
      C.42 10.04 0 4.615 0 3.883c0-3.67 3.217-2.517 5.202-1.026`,

}
</script>

<style scoped lang="scss">
.social-icon {
   display: block;
   inline-size: 1em;
   block-size: 1em;
}
</style>
