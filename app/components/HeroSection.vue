<template>
   <section class="hero page">
      <p class="badge hero__eyebrow" data-reveal-target>
         <span class="badge__dot" />
         {{ COPY.hero.eyebrow }}
      </p>

      <h1 class="hero__title" data-reveal-target>
         {{ COPY.hero.titleBefore }}
         <span class="hero__accent-group"><span
            class="hero__accent"
            :style="swipeStyle"
         >{{ COPY.hero.titleAccent }}</span>{{ TITLE_PUNCTUATION }}</span>{{ TITLE_REST }}
      </h1>

      <p class="hero__lede" data-reveal-target>
         {{ COPY.hero.lede }}
      </p>

      <div class="button-row button-row--center" data-reveal-target>
         <a class="button button--primary button--large" :href="href">
            {{ primaryLabel }}
         </a>
         <a class="button button--large" href="#how-it-works">
            {{ COPY.hero.secondary }}
         </a>
      </div>

      <!-- Dropped entirely before launch rather than shown inert: see the
           note in `AppStoreBadge` on why the badge has no pre-release
           state of its own. -->
      <div v-if="available" class="hero__store" data-reveal-target>
         <AppStoreBadge :href="href" />
      </div>

      <p class="hero__note" data-reveal-target>
         {{ COPY.hero.note }}
      </p>

      <div class="hero__stage" data-reveal-target>
         <figure class="hero__shot hero__shot--menubar">
            <MenuBarMock />
            <figcaption class="hero__shot-caption">
               {{ COPY.hero.stageMenuBar }}
            </figcaption>
         </figure>

         <figure class="hero__shot hero__shot--window">
            <AppWindowMock />
            <figcaption class="hero__shot-caption">
               {{ COPY.hero.stageWindow }}
            </figcaption>
         </figure>
      </div>
   </section>
</template>

<script lang="ts" setup>
const { available, href, label } = useDownload()

const primaryLabel = label(COPY.hero.primary, COPY.hero.primaryPending)

/// `titleAfter` opens with punctuation that belongs to the emphasised
/// phrase, not to the words after it. The accent is an inline-block, and
/// browsers take a soft wrap opportunity at an atomic inline's boundary
/// even with no whitespace there — so a narrow viewport could start a line
/// with the bare comma. Splitting the leading punctuation off lets the
/// template keep it inside a nowrap span with the phrase.
/// Whitespace is excluded from the punctuation class deliberately: pulling
/// the space in too would carry it inside the nowrap span and suppress the
/// break opportunity after the comma, which is the one place the line is
/// still allowed to wrap.
const [, TITLE_PUNCTUATION = "", TITLE_REST = ""]
   = /^([^\p{L}\p{N}\s]*)(.*)$/su.exec(COPY.hero.titleAfter) ?? []

/// The amber swipe under the emphasised phrase wipes in from the left
/// shortly after the hero paints.
///
/// It starts collapsed and is released on mount rather than being animated
/// from CSS alone, for one reason: the server-rendered HTML would
/// otherwise ship a headline whose emphasis is invisible, and a reader on
/// a slow connection would see the hero for a beat with a plain word where
/// the brand mark should be. Rendering it at full scale and only
/// collapsing once JavaScript is here means the no-JS case is the finished
/// state.
const swipeStyle = ref<Record<string, string>>({})

onMounted(() => {
   if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

   swipeStyle.value = { "--swipe-scale": "0" }

   // Next frame, so the collapsed value is committed before the release —
   // set in the same tick, the browser coalesces both and nothing animates.
   requestAnimationFrame(() => {
      requestAnimationFrame(() => {
         swipeStyle.value = { "--swipe-scale": "1" }
      })
   })
})
</script>

<style scoped lang="scss">
@use "../assets/scss/abstracts" as *;

.hero {
   // The stage needs the full column, but the copy above it reads badly at
   // that measure — so the text is constrained by its own rules (see
   // `.hero__title` and `.hero__lede` in layout/_page.scss) and only this
   // block gets the width.
   //
   // Two shots of the same app: the shelf, which is where the product is
   // used, and the window, which is where it is browsed. The window is the
   // larger of the two and carries the wider column, so the row is a 2fr
   // track next to the shelf's fixed one rather than an even split.
   &__stage {
      display: grid;
      grid-template-columns: minmax(0, 5fr) minmax(0, 8fr);
      gap: var(--space-lg);
      align-items: start;
      inline-size: 100%;
      margin-block-start: var(--space-xl);

      // One column on anything narrower than a small laptop: side by side,
      // the window's sidebar and six tiles stop being legible long before
      // the layout itself breaks.
      @media (width < 60rem) {
         grid-template-columns: minmax(0, 1fr);
         gap: var(--space-xl);
      }
   }

   // The badge sits under the buttons rather than in the row with them: it
   // is a different kind of control — a borrowed object at a fixed size,
   // not one of this site's pills — and lining it up beside them invites a
   // comparison of two things that will never match height or corner.
   &__store {
      display: flex;
      justify-content: center;
   }

   &__shot {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
      min-inline-size: 0;
   }

   // The shelf is the shorter drawing, so it is pushed down to sit on the
   // window's horizon instead of floating at the top of its track.
   &__shot--menubar {
      @media (width >= 60rem) {
         margin-block-start: var(--space-xl);
      }
   }

   &__shot-caption {
      order: -1;
      color: var(--muted);
      font-size: px-to-rem(13);
      letter-spacing: 0.02em;
      text-align: start;
   }
}
</style>
