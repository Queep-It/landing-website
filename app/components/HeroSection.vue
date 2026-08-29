<template>
   <section class="hero page">
      <p class="badge hero__eyebrow" data-reveal-target>
         <span class="badge__dot" />
         {{ COPY.hero.eyebrow }}
      </p>

      <h1 class="hero__title" data-reveal-target>
         {{ COPY.hero.titleBefore }}
         <span class="hero__accent" :style="swipeStyle">{{ COPY.hero.titleAccent }}</span>{{ COPY.hero.titleAfter }}
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

      <p class="hero__note" data-reveal-target>
         {{ COPY.hero.note }}
      </p>

      <div class="hero__stage" data-reveal-target>
         <AppWindowMock />
      </div>
   </section>
</template>

<script lang="ts" setup>
const { href, label } = useDownload()

const primaryLabel = label(COPY.hero.primary, COPY.hero.primaryPending)

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
   &__stage {
      inline-size: 100%;
      margin-block-start: var(--space-xl);
   }
}
</style>
