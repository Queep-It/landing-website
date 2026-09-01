<template>
   <NuxtLink class="site-brand" to="/">
      <!-- Fixed box, set in rem rather than left to the SVG's intrinsic
           size: the topbar is sticky and inside the CLS budget, so the
           lockup's footprint has to be reserved before anything paints.
           The two values are the lockup's 431.6:128 ratio, sized so the
           wordmark's cap height matches the 19px it used to be set at. -->
      <span class="site-brand__logo">
         <QueepitLogo />
      </span>
      <!-- The lockup draws the name as outlines, so the link would
           otherwise have no accessible name at all. -->
      <span class="visually-hidden">{{ siteName }}</span>
   </NuxtLink>
</template>

<script lang="ts" setup>
/// The topbar brand: the horizontal lockup, linked home.

// Read into a binding rather than reached for in the template, so the
// auto-import is resolved by the script transform like everywhere else.
const siteName = COPY.site.name
</script>

<style scoped lang="scss">
@use "../assets/scss/abstracts" as *;

.site-brand {
   display: inline-flex;
   align-items: center;
   border-radius: var(--radius-sm);
   color: var(--ink);

   &:focus-visible {
      outline: 2px solid var(--accent-solid);
      outline-offset: 4px;
   }

   &__logo {
      display: block;
      flex-shrink: 0;
      inline-size: px-to-rem(115);
      block-size: px-to-rem(34);
   }
}
</style>
