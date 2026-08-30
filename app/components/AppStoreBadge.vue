<template>
   <!-- The accessible name is spelled out rather than left to the two
        spans below. They are separate flex items with no whitespace
        between them, so the computed name came out as "Download on theApp
        Store" — one word to a screen reader, and being recognisable by
        that exact phrase is the badge's whole job. -->
   <a
      aria-label="Download on the App Store"
      class="store-badge"
      :href="APP_STORE_URL"
      rel="noopener"
      target="_blank"
   >
      <svg
         aria-hidden="true"
         class="store-badge__logo"
         focusable="false"
         role="presentation"
         viewBox="0 0 24 24"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path :d="APPLE_BODY" fill="currentColor" />
         <path :d="APPLE_LEAF" fill="currentColor" />
      </svg>

      <span class="store-badge__text">
         <span class="store-badge__kicker">Download on the</span>
         <span class="store-badge__wordmark">App Store</span>
      </span>
   </a>
</template>

<script lang="ts" setup>
/// The App Store download badge.
///
/// Drawn rather than shipped as the PNG for the same reason every other
/// mark on this page is: it stays crisp at any zoom, re-themes with the
/// page, and costs no request in the hero.
///
/// That trade is the one thing to revisit before launch. Apple's marketing
/// guidelines require their supplied artwork rather than a recreation of
/// it, so this is a stand-in — see the TODO on `APP_STORE_URL` in
/// `utils/site.ts`, which also covers the placeholder link and the
/// pre-release guard this badge currently sidesteps.
///
/// The wording is hardcoded rather than pulled from `COPY`: "Download on
/// the App Store" is Apple's prescribed string, not copy of ours to edit,
/// and it is not translated by us either.

/// The Apple mark, on the same 24px grid as `AppIcon` so the two sit at
/// matching optical weight. Two paths because the leaf is a separate
/// shape — the one place a single `d` would have meant a bridge between
/// them that is not in the mark.
const APPLE_BODY = "M16.36 12.68c-.02-2.35 1.92-3.48 2.01-3.53-1.1-1.6-2.8-1.82-3.4-1.84"
  + "-1.45-.15-2.83.85-3.56.85-.74 0-1.87-.83-3.08-.81-1.58.02-3.05.92-3.87 2.34"
  + "-1.65 2.86-.42 7.09 1.19 9.41.79 1.14 1.72 2.41 2.94 2.36 1.18-.05 1.63-.76 3.05-.76"
  + " 1.42 0 1.83.76 3.07.74 1.27-.02 2.07-1.16 2.85-2.3.9-1.32 1.27-2.6 1.29-2.66"
  + "-.03-.01-2.47-.95-2.49-3.8Z"

const APPLE_LEAF = "M14.04 5.63c.65-.79 1.09-1.88.97-2.97-.94.04-2.07.63-2.74 1.41"
  + "-.6.7-1.14 1.8-1 2.87 1.05.08 2.12-.53 2.77-1.31Z"
</script>

<style scoped lang="scss">
@use "../assets/scss/abstracts" as *;

/// Apple ships the badge in two fills — black for light backgrounds, white
/// for dark — rather than one that tries to work on both. The tokens
/// follow that: `--store-badge-*` flips with the theme in
/// `themes/_dark.scss`, so the badge is always the high-contrast one for
/// the surface it lands on.
.store-badge {
   display: inline-flex;
   align-items: center;
   gap: px-to-rem(9);
   padding: px-to-rem(8) px-to-rem(15) px-to-rem(9);
   border: 1px solid var(--store-badge-line);
   // Apple's own badge corner, which is squarer than this site's pills.
   // Left alone on purpose: the badge is a borrowed object and reads as
   // one, the way the app mocks do.
   border-radius: px-to-rem(9);
   background-color: var(--store-badge-surface);
   color: var(--store-badge-ink);
   text-decoration: none;
   transition:
      transform 180ms var(--ease-entrance),
      opacity 180ms var(--ease-entrance);

   &:hover {
      opacity: 0.88;
      transform: translateY(#{px-to-rem(-1)});
   }

   &:active {
      transform: none;
   }
}

.store-badge__logo {
   display: block;
   flex-shrink: 0;
   // Optically centred rather than boxed: the mark's leaf pushes its mass
   // low, so it sits a hair high against a two-line text block.
   inline-size: px-to-rem(26);
   block-size: px-to-rem(26);
   margin-block-start: px-to-rem(-2);
}

.store-badge__text {
   display: flex;
   flex-direction: column;
   // Apple sets the two lines tight enough to read as one lockup.
   line-height: 1.1;
   text-align: start;
}

.store-badge__kicker {
   font-size: px-to-rem(10.5);
   letter-spacing: 0.01em;
}

.store-badge__wordmark {
   font-family: var(--font-display);
   font-size: px-to-rem(19);
   font-weight: var(--weight-heading);
   letter-spacing: -0.02em;
}
</style>
