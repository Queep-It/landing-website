<template>
   <NuxtLink class="site-brand" to="/">
      <!-- Fixed box, set in rem rather than left to the SVG's intrinsic
           size: the topbar is sticky and inside the CLS budget, so the
           mark's footprint has to be reserved before anything paints. -->
      <span class="site-brand__mark">
         <QueepMark :gap-color="gapColor" />
      </span>
      <span class="site-brand__name">{{ COPY.site.name }}</span>
   </NuxtLink>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
   /**
    * The knockout colour around the bookmark. The header sits on the
    * translucent veil rather than on `--surface`, and in the footer the
    * mark sits on the sunken band — both need their own backdrop passed
    * in, or the gap shows as a cream notch on the wrong colour.
    */
   gapColor?: string
}>(), {
   gapColor: "var(--surface)",
})
</script>

<style scoped lang="scss">
@use "../assets/scss/abstracts" as *;

.site-brand {
   display: inline-flex;
   align-items: center;
   gap: var(--space-2xs);
   border-radius: var(--radius-sm);
   color: var(--ink);

   &:focus-visible {
      outline: 2px solid var(--accent-solid);
      outline-offset: 4px;
   }

   &__mark {
      display: block;
      flex-shrink: 0;
      inline-size: px-to-rem(28);
      block-size: px-to-rem(28);
   }

   &__name {
      font-family: var(--font-display);
      font-size: px-to-rem(19);
      font-weight: var(--weight-heading);
      letter-spacing: -0.02em;
   }
}
</style>
