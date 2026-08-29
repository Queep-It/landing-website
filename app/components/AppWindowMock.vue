<template>
   <div aria-hidden="true" class="window" role="presentation">
      <!-- Chrome -->
      <div class="window__bar">
         <span class="window__lights">
            <i class="window__light window__light--close" />
            <i class="window__light window__light--min" />
            <i class="window__light window__light--max" />
         </span>
         <span class="window__search">
            <AppIcon class="window__search-icon" name="search" />
            <span class="window__search-text">{{ query }}<i class="window__caret" /></span>
            <kbd class="window__kbd">&#8984;K</kbd>
         </span>
      </div>

      <div class="window__body">
         <!-- Sidebar -->
         <aside class="window__sidebar">
            <p class="window__brand">
               <span class="window__brand-mark">
                  <QueepItMark gap-color="var(--mock-surface)" />
               </span>
               Queep It
            </p>

            <ul class="window__list">
               <li
                  v-for="row in SMART"
                  :key="row.label"
                  class="window__row"
                  :class="{ 'window__row--active': row.active }"
               >
                  <span class="window__row-label">{{ row.label }}</span>
                  <span class="window__row-count">{{ row.count }}</span>
               </li>
            </ul>

            <p class="window__section-label">
Collections
</p>
            <ul class="window__list">
               <li v-for="row in COLLECTIONS" :key="row.label" class="window__row">
                  <span class="window__row-label">
                     <i class="window__dot" :style="{ backgroundColor: row.color }" />
                     {{ row.label }}
                  </span>
                  <span class="window__row-count">{{ row.count }}</span>
               </li>
            </ul>
         </aside>

         <!-- Item grid -->
         <div class="window__main">
            <p class="window__today">
               Today
               <span class="window__today-count">{{ ITEMS.length }} items</span>
            </p>
            <div class="window__grid">
               <article
                  v-for="(item, index) in ITEMS"
                  :key="item.title"
                  class="window__tile"
                  :class="`window__tile--${item.kind}`"
                  :style="{ '--tile-index': index }"
               >
                  <!-- Each preview is drawn, not loaded: six bitmaps in a
                       hero is six requests competing with LCP, and a
                       screenshot of an unreleased app would be a
                       screenshot of nothing. -->
                  <div class="window__preview" :class="`window__preview--${item.kind}`">
                     <span v-if="item.kind === 'palette'" class="window__swatches">
                        <i v-for="tone in PALETTE" :key="tone" :style="{ backgroundColor: tone }" />
                     </span>
                     <span v-else-if="item.kind === 'pdf'" class="window__filemark">PDF</span>
                     <span v-else-if="item.kind === 'video'" class="window__play" />
                     <span v-else-if="item.kind === 'code'" class="window__code">
                        <i v-for="line in CODE_LINES" :key="line" :style="{ inlineSize: `${line}%` }" />
                     </span>
                     <span v-else-if="item.kind === 'note'" class="window__note">
                        <i v-for="line in NOTE_LINES" :key="line" :style="{ inlineSize: `${line}%` }" />
                     </span>
                  </div>
                  <p class="window__tile-title">
                     {{ item.title }}
                  </p>
                  <p class="window__tile-meta">
                     {{ item.meta }}
                     <i v-if="item.starred" class="window__star">&#9733;</i>
                  </p>
               </article>
            </div>
         </div>
      </div>
   </div>
</template>

<script lang="ts" setup>
/// A drawn recreation of the app window, not a screenshot.
///
/// It is the hero's largest element and therefore almost certainly the
/// LCP candidate, which rules out a bitmap: a 1200px-wide PNG of a UI is
/// 200KB before it is retina, and a retina one is four times that. Built
/// from boxes it is a few kilobytes of markup, it re-themes with the rest
/// of the page, and the text inside it stays crisp at any zoom.
///
/// `aria-hidden` throughout: this is a picture of software, and reading
/// "All Items 842, Favorites 43…" to a screen-reader user tells them
/// nothing about the product. The surrounding hero copy carries the
/// meaning.

interface MockRow {
   label: string
   count: number
   color?: string
   active?: boolean
}

interface MockItem {
   title: string
   meta: string
   kind: "photo" | "note" | "pdf" | "palette" | "code" | "video"
   starred?: boolean
}

const query = "brand"

const SMART: MockRow[] = [
   { label: "All Items", count: 842, active: true },
   { label: "Favorites", count: 43 },
   { label: "Recent", count: 78 },
   { label: "Untagged", count: 21 },
]

const COLLECTIONS: MockRow[] = [
   { label: "Work", count: 186, color: "#2f9e6b" },
   { label: "Design", count: 74, color: "#e08a2e" },
   { label: "Snippets", count: 142, color: "#3f7fd6" },
   { label: "References", count: 58, color: "#f5b62a" },
   { label: "Personal", count: 95, color: "#d4574e" },
]

const ITEMS: MockItem[] = [
   { title: "Casa Del Mar", meta: "Image · 2.4 MB", kind: "photo", starred: true },
   { title: "Client intro for brand direction", meta: "Text", kind: "note", starred: true },
   { title: "Project Proposal.pdf", meta: "PDF · 1.8 MB", kind: "pdf" },
   { title: "Colour palette ideas", meta: "Image · 120 KB", kind: "palette" },
   { title: "checkUser.ts", meta: "TypeScript", kind: "code" },
   { title: "Product Demo", meta: "MP4 · 12.6 MB", kind: "video" },
]

const PALETTE = ["#4f7d70", "#dfd6c4", "#c9695f", "#8a6f5c"]
// Percentages, so the fake lines ragged-right the way real code does.
const CODE_LINES = [82, 58, 71, 40]
const NOTE_LINES = [96, 88, 62]
</script>

<style scoped lang="scss">
@use "../assets/scss/abstracts" as *;

/// The window paints its own light palette rather than inheriting the
/// page's tokens. It is a picture of an app running on someone's Mac, and
/// a mock that flips to dark alongside the site reads as part of the site
/// chrome instead of as a screenshot sitting on it.
.window {
   --mock-surface: #ffffff;
   --mock-sunken: #f4f1ec;
   --mock-line: #e6e1d8;
   --mock-ink: #1a1c1f;
   --mock-muted: #797f88;

   position: relative;
   inline-size: 100%;
   max-inline-size: px-to-rem(940);
   margin-inline: auto;
   border: 1px solid var(--mock-line);
   border-radius: var(--radius-xl);
   background-color: var(--mock-surface);
   box-shadow: var(--shadow-xl);
   color: var(--mock-ink);
   font-size: px-to-rem(13);

   /// The hero centres its text, and every string in here was inheriting
   /// that — tile titles, the "Today" header, the query in the search
   /// field. No app centres those, so the drawing read as a poster of an
   /// app rather than a shot of one. Anchored here rather than per-element
   /// so anything added later starts out left-aligned too.
   text-align: start;
   overflow: hidden;
   // Very slight lift out of the page, so the window reads as an object
   // above the hero rather than as a panel welded into it.
   transform: perspective(1600px) rotateX(2.2deg);
   transform-origin: top center;
}

/// Three tracks with the third left empty, so the field is centred on the
/// window rather than on the space left over beside the lights — which is
/// where a flex row would have put it, about 13px off.
.window__bar {
   display: grid;
   grid-template-columns: 1fr minmax(0, #{px-to-rem(320)}) 1fr;
   align-items: center;
   gap: var(--space-sm);
   padding: var(--space-2xs) var(--space-xs);
   border-block-end: 1px solid var(--mock-line);
   background-color: var(--mock-sunken);
}

.window__lights {
   display: flex;
   flex-shrink: 0;
   gap: px-to-rem(6);
}

.window__light {
   inline-size: px-to-rem(10);
   block-size: px-to-rem(10);
   border-radius: var(--radius-pill);

   &--close { background-color: #ec6a5e; }
   &--min { background-color: #f4bf4f; }
   &--max { background-color: #61c554; }
}

/// A toolbar search, not an address bar: a real one is a fixed field in
/// the middle of the chrome, so it takes a track of its own above rather
/// than stretching edge to edge.
.window__search {
   display: flex;
   align-items: center;
   gap: var(--space-2xs);
   min-inline-size: 0;
   padding: px-to-rem(5) var(--space-2xs);
   border: 1px solid var(--mock-line);
   border-radius: var(--radius-sm);
   background-color: var(--mock-surface);
   color: var(--mock-muted);
}

.window__search-icon {
   flex-shrink: 0;
   inline-size: px-to-rem(13);
   block-size: px-to-rem(13);
}

.window__search-text {
   flex: 1;
   color: var(--mock-ink);
}

/// The caret is the only motion in the chrome. It blinks on the CSS
/// compositor with no JavaScript behind it, and the reset kills it
/// wholesale under prefers-reduced-motion.
.window__caret {
   display: inline-block;
   inline-size: px-to-rem(1.5);
   block-size: px-to-rem(13);
   margin-inline-start: px-to-rem(2);
   translate: 0 px-to-rem(2);
   background-color: var(--mock-ink);
   animation: window-blink 1.1s steps(1) infinite;
}

@keyframes window-blink {
   0%, 49% { opacity: 1; }
   50%, 100% { opacity: 0; }
}

.window__kbd {
   flex-shrink: 0;
   padding: px-to-rem(1) px-to-rem(5);
   border: 1px solid var(--mock-line);
   border-radius: px-to-rem(5);
   background-color: var(--mock-sunken);
   font-family: var(--font-body);
   font-size: px-to-rem(11);
}

.window__body {
   display: grid;
   // `minmax(0, 1fr)`, not `1fr`: the pane's contents are wider than the
   // track at their minimum (see `.window__grid`), and a bare `1fr` floors
   // the track at that minimum instead of letting it shrink.
   grid-template-columns: px-to-rem(180) minmax(0, 1fr);
   min-block-size: px-to-rem(340);

   // The sidebar is the first thing to go: at phone width the item grid is
   // what communicates the product, and a 180px rail beside it leaves the
   // tiles too narrow to read as tiles.
   @media (width < 40rem) {
      grid-template-columns: minmax(0, 1fr);
   }
}

.window__sidebar {
   display: flex;
   flex-direction: column;
   gap: var(--space-2xs);
   padding: var(--space-xs);
   border-inline-end: 1px solid var(--mock-line);
   background-color: var(--mock-sunken);

   @media (width < 40rem) {
      display: none;
   }
}

.window__brand {
   display: flex;
   align-items: center;
   gap: px-to-rem(6);
   margin-block-end: var(--space-2xs);
   font-family: var(--font-display);
   font-size: px-to-rem(14);
   font-weight: var(--weight-heading);
   letter-spacing: -0.02em;
}

.window__brand-mark {
   display: block;
   inline-size: px-to-rem(17);
   block-size: px-to-rem(17);
}

.window__list {
   display: flex;
   flex-direction: column;
   gap: px-to-rem(1);
   list-style: none;
}

.window__row {
   display: flex;
   align-items: center;
   justify-content: space-between;
   gap: var(--space-2xs);
   padding: px-to-rem(5) px-to-rem(7);
   border-radius: px-to-rem(6);
   color: var(--mock-ink);
   font-size: px-to-rem(12.5);

   /// macOS tints the selected row with the system accent rather than
   /// with grey. Amber at 20% keeps the label's contrast on the sunken
   /// rail well clear of AA while tying the drawing to the page.
   &--active {
      background-color: rgb(245 182 42 / 20%);
      font-weight: var(--weight-label);
   }
}

.window__row-label {
   display: flex;
   align-items: center;
   gap: px-to-rem(6);
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
}

.window__row-count {
   color: var(--mock-muted);
   font-size: px-to-rem(11.5);
   font-variant-numeric: tabular-nums;
}

.window__dot {
   flex-shrink: 0;
   inline-size: px-to-rem(7);
   block-size: px-to-rem(7);
   border-radius: var(--radius-pill);
}

.window__section-label {
   margin-block-start: var(--space-2xs);
   padding-inline: px-to-rem(7);
   color: var(--mock-muted);
   font-size: px-to-rem(11);
   font-weight: var(--weight-label);
   letter-spacing: 0.05em;
   text-transform: uppercase;
}

.window__main {
   padding: var(--space-sm);
   overflow: hidden;
}

.window__today {
   display: flex;
   align-items: baseline;
   justify-content: space-between;
   gap: var(--space-xs);
   margin-block-end: var(--space-2xs);
   font-family: var(--font-display);
   font-size: px-to-rem(15);
   font-weight: var(--weight-heading);
   letter-spacing: -0.02em;
}

.window__today-count {
   color: var(--mock-muted);
   font-family: var(--font-body);
   font-size: px-to-rem(11.5);
   font-weight: var(--weight-body);
   font-variant-numeric: tabular-nums;
   letter-spacing: 0;
}

/// `minmax(0, …)` on every track, and it is load-bearing. Tile titles are
/// `white-space: nowrap`, so each tile's min-content width is its longest
/// title in full — "Client intro for brand direction". A bare `1fr` is
/// `minmax(auto, 1fr)`, which floors the track at that width, pushed the
/// grid wider than the pane, and let `.window__main`'s `overflow: hidden`
/// shear the right-hand column of tiles off at the window's edge. With the
/// floor at zero the tracks share the pane and the titles ellipsis, which
/// is what the `text-overflow` on them was always for.
.window__grid {
   display: grid;
   grid-template-columns: repeat(3, minmax(0, 1fr));
   gap: var(--space-2xs);

   @media (width < 48rem) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
   }
}

/// Tiles fade up in sequence once the hero mounts. Pure CSS with a
/// per-tile delay from `--tile-index`, rather than the scroll observer:
/// the hero is above the fold, so it has already "arrived" by definition
/// and there is nothing for an observer to wait for.
.window__tile {
   display: flex;
   flex-direction: column;
   gap: px-to-rem(3);
   padding: px-to-rem(7);
   border: 1px solid var(--mock-line);
   border-radius: var(--radius-md);
   background-color: var(--mock-surface);
   // A contact shadow only. The tiles sit on a white pane, so anything
   // softer than this reads as a blur rather than as a card.
   box-shadow: 0 1px 2px rgb(26 28 31 / 5%);
   animation: window-tile-in 620ms var(--ease-entrance) both;
   animation-delay: calc(320ms + var(--tile-index, 0) * 80ms);
}

@keyframes window-tile-in {
   from {
      opacity: 0;
      transform: translateY(#{px-to-rem(10)}) scale(0.985);
   }

   to {
      opacity: 1;
      transform: none;
   }
}

.window__preview {
   display: flex;
   align-items: center;
   justify-content: center;
   block-size: px-to-rem(74);
   margin-block-end: px-to-rem(3);
   border-radius: px-to-rem(5);
   background-color: var(--mock-sunken);
   overflow: hidden;

   // A house on a cliff at dusk, in three stops. Suggestive rather than
   // literal — a recognisable photograph here would be a licensing
   // question for no gain.
   &--photo {
      background-image:
         linear-gradient(160deg, rgb(255 255 255 / 22%) 0%, transparent 55%),
         linear-gradient(#8fb3c4 0%, #b9c9c6 46%, #7d8f7a 47%, #5c6b58 100%);
   }

   &--video {
      background-image: linear-gradient(150deg, #2b2f36 0%, #12151a 100%);
   }

   &--code {
      align-items: flex-start;
      padding: px-to-rem(8);
      background-color: #1c1f25;
   }

   &--note {
      align-items: flex-start;
      padding: px-to-rem(8);
      background-color: var(--mock-surface);
   }

   &--pdf {
      background-color: #fdeceb;
   }
}

.window__swatches {
   display: flex;
   inline-size: 100%;
   block-size: 100%;
   gap: px-to-rem(3);
   padding: px-to-rem(8);

   i {
      flex: 1;
      border-radius: px-to-rem(3);
   }
}

.window__filemark {
   padding: px-to-rem(4) px-to-rem(9);
   border-radius: px-to-rem(4);
   background-color: #d9483e;
   color: #ffffff;
   font-size: px-to-rem(11);
   font-weight: var(--weight-heading);
   letter-spacing: 0.04em;
}

/// A play triangle from one border trick rather than an SVG — it is six
/// declarations and needs no second element.
.window__play {
   inline-size: 0;
   block-size: 0;
   margin-inline-start: px-to-rem(4);
   border-block: px-to-rem(9) solid transparent;
   border-inline-start: px-to-rem(15) solid rgb(255 255 255 / 92%);
}

.window__code,
.window__note {
   display: flex;
   flex-direction: column;
   gap: px-to-rem(5);
   inline-size: 100%;

   i {
      block-size: px-to-rem(4);
      border-radius: var(--radius-pill);
   }
}

.window__code i {
   background-color: rgb(245 182 42 / 55%);
}

.window__note i {
   background-color: var(--mock-line);
}

.window__tile-title {
   font-size: px-to-rem(11.5);
   font-weight: var(--weight-label);
   line-height: 1.35;
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
}

.window__tile-meta {
   display: flex;
   align-items: center;
   justify-content: space-between;
   gap: px-to-rem(4);
   color: var(--mock-muted);
   font-size: px-to-rem(10.5);
}

.window__star {
   color: #f5b62a;
   font-size: px-to-rem(11);
   font-style: normal;
}
</style>
