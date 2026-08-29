<template>
   <div class="app-shell">
      <!-- First tab stop on every page. The topbar is sticky and holds
           five focusable things; without this a keyboard user tabs
           through all of them on every navigation. -->
      <a class="skip-link" href="#content">{{ COPY.nav.skip }}</a>

      <header class="app-shell__topbar">
         <SiteBrand class="app-shell__brand" gap-color="var(--surface)" />
         <SiteNav class="app-shell__nav" />

         <div class="app-shell__actions">
            <!-- The toggle's selected option comes from localStorage, which
                 the server cannot see, so rendering it during SSR would
                 hydrate wrong. The fallback reserves the identical
                 footprint — without it the header reflows on hydration,
                 which is precisely the layout shift the CLS budget fails
                 builds over. -->
            <ClientOnly>
               <ThemeToggle class="app-shell__toggle" />
               <template #fallback>
                  <div aria-hidden="true" class="app-shell__toggle app-shell__toggle-placeholder" />
               </template>
            </ClientOnly>

            <a class="button button--ink app-shell__cta" :href="href">
               {{ ctaLabel }}
            </a>
         </div>

         <SiteMenu class="app-shell__menu" />
      </header>

      <main id="content">
         <slot />
      </main>

      <SiteFooter />
   </div>
</template>

<script lang="ts" setup>
const { href, label } = useDownload()

const ctaLabel = label(COPY.hero.primary, COPY.hero.primaryPending)

// One observer for the whole page, set up at the layout level so every
// route gets the entrances without opting in.
useReveal()
</script>

<style scoped lang="scss">
@use "../assets/scss/abstracts" as *;

/// The width at which brand, nav, theme control and CTA stop competing for
/// one row.
///
/// Measured, not guessed. Brand 152px, theme toggle 200px, CTA pill 118px,
/// two 24px gaps and two 32px gutters come to 582px of overhead; the four
/// nav items measure 268px. One row therefore needs 850px, and 52rem
/// (832px at the default root size) is the nearest step below that where
/// the nav's own horizontal padding absorbs the difference.
///
/// Below it, everything except the brand moves into the sheet behind the
/// hamburger. There is no intermediate arrangement: a two-row header on a
/// tablet spends more viewport on chrome than the four links are worth.
$single-row: 52rem;

.app-shell {
   // Column shell so the footer is pushed to the bottom of short pages
   // instead of floating mid-viewport. The page's <main> takes the slack.
   display: flex;
   flex-direction: column;
   min-block-size: 100dvh;

   > main {
      flex: 1;
   }

   &__topbar {
      position: sticky;
      inset-block-start: 0;
      z-index: 30;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-md);
      min-block-size: var(--topbar-height);
      padding: var(--space-2xs) var(--page-gutter);
      border-block-end: 1px solid transparent;
      // Translucent over scrolling content. `--surface-veil` carries the
      // alpha; the solid background-color underneath is the fallback for
      // browsers without backdrop-filter, where a 72% veil would let text
      // show through.
      background-color: var(--surface);
      transition: border-color var(--duration) var(--ease);
   }

   @supports (backdrop-filter: blur(14px)) {
      &__topbar {
         border-block-end-color: var(--line);
         background-color: var(--surface-veil);
         backdrop-filter: blur(14px) saturate(160%);
      }
   }

   &__nav,
   &__actions {
      display: none;
   }

   &__menu {
      display: block;
   }

   @media (width >= $single-row) {
      &__nav {
         display: block;
      }

      &__actions {
         display: flex;
         align-items: center;
         gap: var(--space-xs);
      }

      &__menu {
         display: none;
      }
   }

   // The header CTA is a smaller pill than the hero's: it is a persistent
   // affordance rather than the page's main ask, and matching the hero
   // button here would have two identical primary actions on screen at
   // the same moment.
   &__cta {
      min-block-size: px-to-rem(38);
      padding-inline: var(--space-sm);
      font-size: px-to-rem(14);
   }

   // Matches ThemeToggle's rendered box: 3px padding + 1px border either
   // side, around a 24px row of options. Measured from the mounted
   // control; keep it in step with that padding, or hydration moves the
   // CTA sideways under the reader.
   &__toggle-placeholder {
      inline-size: px-to-rem(200);
      block-size: px-to-rem(32);
   }
}
</style>
