<template>
   <svg
      aria-hidden="true"
      class="app-icon"
      fill="none"
      focusable="false"
      role="presentation"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.75"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
   >
      <path :d="PATHS[name]" />
   </svg>
</template>

<script lang="ts" setup>
import type { IconName } from "~/utils/content"

/// A hand-rolled 24px stroke set rather than an icon package.
///
/// Eight glyphs are needed and every icon library ships a few hundred; the
/// tree-shaken ones still add a runtime, and the ones that do not add
/// ~40KB to a page whose entire budget is the reason the Lighthouse gate
/// exists. Adding a glyph means one line here and one key in `IconName`,
/// so a typo is a type error rather than an empty box on the page.

defineProps<{
   name: IconName
}>()

/// Single-path glyphs on a 24px grid, drawn to the same 1.75 stroke and
/// the same optical weight. Multi-path shapes are deliberately avoided:
/// one `d` per name keeps the template a single element.
const PATHS: Record<IconName, string> = {
   // Lightning bolt — capture speed.
   bolt: "M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5Z",
   // Magnifier.
   search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm5 12 5 5",
   // Stacked sheets — the mixed content types.
   layers: "m12 3 8.5 4.5L12 12 3.5 7.5 12 3Zm8.5 9L12 16.5 3.5 12m17 4.5L12 21l-8.5-4.5",
   // Shield.
   shield: "M12 3 5 6v5.5c0 4.2 2.9 8.1 7 9.5 4.1-1.4 7-5.3 7-9.5V6l-7-3Z",
   // Sparkle.
   sparkles: "M12 3.5 13.6 9l5.4 1.6L13.6 12 12 17.5 10.4 12 5 10.6 10.4 9 12 3.5Z",
   // Laptop and phone.
   devices: "M3 5h13v9H3V5Zm-1.5 12h16M18 9h4.5v10H18V9Z",
   // Clipboard.
   clipboard: "M9 4h6v3H9V4Zm-1 1H6v16h12V5h-2M9 12h6m-6 4h4",
   // Tag.
   tag: "M3.5 11.5 11 4h7.5V11.5L11 19l-7.5-7.5ZM15 8.5h.01",
}
</script>

<style scoped lang="scss">
.app-icon {
   display: block;
   inline-size: 1.25em;
   block-size: 1.25em;
}
</style>
