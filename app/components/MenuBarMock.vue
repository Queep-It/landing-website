<template>
   <div aria-hidden="true" class="menubar" role="presentation">
      <!-- The system bar. Only the Queep icon is ours; the rest is enough
           macOS furniture to place the shelf, drawn flat rather than
           imitated in detail. -->
      <div class="menubar__bar">
         <span class="menubar__app">
            <QueepMark gap-color="var(--mock-sunken)" />
         </span>

         <span class="menubar__status">
            <span class="menubar__glyph menubar__glyph--wifi" />
            <span class="menubar__glyph menubar__glyph--control" />
            <span class="menubar__battery" />
            <span class="menubar__clock">{{ CLOCK }}</span>
         </span>
      </div>

      <!-- The shelf itself, hanging off the icon. -->
      <div class="menubar__shelf">
         <p class="menubar__title">
            Queep
         </p>

         <span class="menubar__search">
            <AppIcon class="menubar__search-icon" name="search" />
            <span class="menubar__search-text">Search Queep</span>
            <kbd class="menubar__kbd">&#8984;K</kbd>
         </span>

         <ul class="menubar__list">
            <li v-for="row in SMART" :key="row.label" class="menubar__row">
               <span class="menubar__row-label">{{ row.label }}</span>
               <span class="menubar__row-count">{{ row.count }}</span>
            </li>
         </ul>

         <span class="menubar__divider" />

         <ul class="menubar__list">
            <li v-for="action in ACTIONS" :key="action.label" class="menubar__row">
               <span class="menubar__row-label">{{ action.label }}</span>
               <kbd class="menubar__kbd">{{ action.keys }}</kbd>
            </li>
         </ul>
      </div>
   </div>
</template>

<script lang="ts" setup>
/// The menu bar shelf, drawn rather than screenshotted — the same call
/// `AppWindowMock` makes, and for the same reasons: it re-themes with the
/// page, stays crisp at any zoom, and costs a few kilobytes of markup
/// instead of a retina bitmap.
///
/// It earns its place because the shelf is the product's everyday surface:
/// the first feature and the first step of the flow both describe reaching
/// for the menu bar, and until now the only picture on the page was of the
/// full window, which is the thing you open second.
///
/// `aria-hidden`, like the window: "All Items 842" read aloud describes
/// nothing a screen-reader user can act on, and the hero copy beside it
/// already carries the meaning.

interface ShelfRow {
   label: string
   count: number
}

interface ShelfAction {
   label: string
   keys: string
}

/// Apple's own screenshot time. A fixed string rather than a live clock:
/// this is a picture, and a mock whose time ticks invites the reader to
/// treat the rest of it as live too.
const CLOCK = "Tue 9:41 AM"

/// The same four smart lists the window's sidebar opens on, with the same
/// counts — two mocks of one app disagreeing about how many items are in
/// it is the kind of detail that quietly reads as fake.
const SMART: ShelfRow[] = [
   { label: "All Items", count: 842 },
   { label: "Favorites", count: 43 },
   { label: "Recent", count: 78 },
]

const ACTIONS: ShelfAction[] = [
   { label: "New Item", keys: "⌘N" },
   { label: "Open Queep", keys: "⌘," },
]
</script>

<style scoped lang="scss">
@use "../assets/scss/abstracts" as *;

/// Paints its own light palette rather than inheriting the page's tokens,
/// matching `AppWindowMock` value for value: the two sit side by side in
/// the hero and are meant to read as two shots of one Mac, not as two
/// panels of site chrome.
.menubar {
   --mock-surface: #ffffff;
   --mock-sunken: #f4f1ec;
   --mock-line: #e6e1d8;
   --mock-ink: #1a1c1f;
   --mock-muted: #797f88;

   position: relative;
   inline-size: 100%;
   max-inline-size: px-to-rem(420);
   margin-inline: auto;
   border: 1px solid var(--mock-line);
   border-radius: var(--radius-xl);
   background-color: var(--mock-sunken);
   box-shadow: var(--shadow-xl);
   color: var(--mock-ink);
   font-size: px-to-rem(13);
   overflow: hidden;
   // Matches the window's lift so the pair share one horizon.
   transform: perspective(1600px) rotateX(2.2deg);
   transform-origin: top center;
}

.menubar__bar {
   display: flex;
   align-items: center;
   justify-content: space-between;
   gap: var(--space-xs);
   padding: px-to-rem(6) px-to-rem(10);
   border-block-end: 1px solid var(--mock-line);
   background-color: var(--mock-surface);
}

/// The one live-looking element: our own icon, sitting where it would in
/// the real bar.
.menubar__app {
   display: grid;
   place-items: center;
   inline-size: px-to-rem(22);
   block-size: px-to-rem(22);
   padding: px-to-rem(3);
   border-radius: px-to-rem(5);
   background-color: var(--mock-sunken);
}

.menubar__status {
   display: flex;
   align-items: center;
   gap: px-to-rem(9);
   color: var(--mock-ink);
}

/// System glyphs as shapes rather than icons. They only have to read as
/// "menu bar" at a glance, and drawing them keeps the component free of a
/// second icon set.
.menubar__glyph {
   display: block;
   background-color: currentcolor;

   &--wifi {
      inline-size: px-to-rem(13);
      block-size: px-to-rem(9);
      clip-path: polygon(50% 100%, 0% 32%, 16% 18%, 50% 62%, 84% 18%, 100% 32%);
   }

   &--control {
      inline-size: px-to-rem(12);
      block-size: px-to-rem(9);
      clip-path: polygon(0 0, 100% 0, 50% 100%);
   }
}

.menubar__battery {
   inline-size: px-to-rem(20);
   block-size: px-to-rem(10);
   border: 1px solid currentcolor;
   border-radius: px-to-rem(3);
   // The charge level, drawn as an inset fill so the outline stays hollow.
   background:
      linear-gradient(currentcolor, currentcolor) left center / 70% 100% no-repeat
      padding-box;
   padding: px-to-rem(1);
}

.menubar__clock {
   font-size: px-to-rem(12);
   font-variant-numeric: tabular-nums;
   white-space: nowrap;
}

/// The dropped panel. Inset from the bar's left edge so it reads as hanging
/// off the icon rather than as a second full-width bar.
.menubar__shelf {
   display: flex;
   flex-direction: column;
   gap: px-to-rem(9);
   margin: px-to-rem(9) px-to-rem(11) px-to-rem(13);
   padding: px-to-rem(13);
   border: 1px solid var(--mock-line);
   border-radius: var(--radius-lg);
   background-color: var(--mock-surface);
   box-shadow: var(--shadow-lg);
}

.menubar__title {
   font-family: var(--font-display);
   font-size: px-to-rem(14);
   font-weight: var(--weight-label);
}

.menubar__search {
   display: flex;
   align-items: center;
   gap: px-to-rem(7);
   padding: px-to-rem(7) px-to-rem(9);
   border: 1px solid var(--mock-line);
   border-radius: var(--radius-md);
   background-color: var(--mock-sunken);
   color: var(--mock-muted);
}

.menubar__search-icon {
   flex-shrink: 0;
   inline-size: px-to-rem(13);
   block-size: px-to-rem(13);
}

.menubar__search-text {
   flex-grow: 1;
   font-size: px-to-rem(12.5);
}

.menubar__kbd {
   flex-shrink: 0;
   color: var(--mock-muted);
   font-family: var(--font-body);
   font-size: px-to-rem(11.5);
   white-space: nowrap;
}

.menubar__list {
   display: flex;
   flex-direction: column;
   gap: px-to-rem(1);
   list-style: none;
}

.menubar__row {
   display: flex;
   align-items: center;
   justify-content: space-between;
   gap: var(--space-xs);
   padding: px-to-rem(6) px-to-rem(7);
   border-radius: var(--radius-sm);
}

.menubar__row-label {
   font-size: px-to-rem(12.5);
}

.menubar__row-count {
   color: var(--mock-muted);
   font-size: px-to-rem(12);
   font-variant-numeric: tabular-nums;
}

.menubar__divider {
   block-size: 1px;
   margin-inline: px-to-rem(-4);
   background-color: var(--mock-line);
}
</style>
