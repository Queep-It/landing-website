<template>
   <svg
      aria-hidden="true"
      class="queep-it-mark"
      fill="none"
      focusable="false"
      role="presentation"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
   >
      <!-- The ring. One path with `evenodd`, rather than a stroked circle,
           so the counter is a real hole — a stroke would paint over
           whatever sits behind the mark. -->
      <path
         :fill="inkColor"
         fill-rule="evenodd"
         clip-rule="evenodd"
         d="M28 4a24 24 0 1 0 0 48 24 24 0 0 0 0-48Zm0 12a12 12 0 1 0 0 24 12 12 0 0 0 0-24Z"
      />
      <!-- The tail. A capsule at 45°, starting inside the counter so it
           reads as part of the letter rather than as a tick beside it. -->
      <path
         :fill="inkColor"
         d="M31.6 27.9a4 4 0 0 1 5.66 0l8.84 8.84a4 4 0 1 1-5.66 5.66l-8.84-8.84a4 4 0 0 1 0-5.66Z"
      />
      <!-- The bookmark. Stroked in the surface colour rather than sitting
           on an opaque plate, so the gap between it and the Q is a real
           hole and the mark stays usable on any background — a plate
           would show as a pale rectangle the moment it is not on cream. -->
      <path
         d="M42 37h15a2 2 0 0 1 2 2v20l-9.5-6L40 59V39a2 2 0 0 1 2-2Z"
         :fill="accentColor"
         :stroke="gapColor"
         stroke-width="4"
         stroke-linejoin="round"
      />
   </svg>
</template>

<script lang="ts" setup>
/// The app mark, drawn rather than shipped as a bitmap.
///
/// It appears at 28px in the header, 40px in the footer and 96px in the
/// hero, in two themes, and a PNG that is crisp at all six of those is
/// three files and a `srcset`. It is also the only way the gap around the
/// bookmark can follow the surface it is drawn on: `gapColor` defaults to
/// `--surface`, so the mark re-cuts itself when the theme flips.

withDefaults(defineProps<{
   /** The Q and its tail. Defaults to the current text colour. */
   inkColor?: string
   /** The bookmark fill. Holds still across themes — it is the brand. */
   accentColor?: string
   /** The knockout between bookmark and Q. Match the backdrop. */
   gapColor?: string
}>(), {
   inkColor: "currentColor",
   accentColor: "var(--accent-solid)",
   gapColor: "var(--surface)",
})
</script>

<style scoped lang="scss">
.queep-it-mark {
   display: block;
   inline-size: 100%;
   block-size: 100%;
}
</style>
