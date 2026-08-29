<template>
   <section class="section">
      <div class="section__inner">
         <div class="cta" data-reveal-target>
            <span class="cta__mark">
               <QueepItMark gap-color="var(--surface-raised)" />
            </span>
            <h2 class="cta__title">
               {{ COPY.cta.title }}
            </h2>
            <p class="cta__lede">
               {{ COPY.cta.lede }}
            </p>
            <div class="button-row button-row--center">
               <a class="button button--primary button--large" :href="href">
                  {{ primaryLabel }}
               </a>
               <a class="button button--large" href="#faq">
                  {{ COPY.cta.secondary }}
               </a>
            </div>
         </div>
      </div>
   </section>
</template>

<script lang="ts" setup>
const { href, label } = useDownload()

const primaryLabel = label(COPY.cta.primary, COPY.cta.primaryPending)
</script>

<style scoped lang="scss">
@use "../assets/scss/abstracts" as *;

.cta {
   position: relative;
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: var(--space-sm);
   padding: var(--space-2xl) var(--space-lg);
   border: 1px solid var(--line);
   border-radius: var(--radius-xl);
   background-color: var(--surface-raised);
   box-shadow: var(--shadow-md);
   text-align: center;
   overflow: hidden;

   // The same amber wash as the hero, mirrored to the bottom edge so the
   // page opens and closes on the brand colour.
   &::before {
      content: "";
      position: absolute;
      inset-block-end: px-to-rem(-160);
      inset-inline-start: 50%;
      inline-size: min(#{px-to-rem(680)}, 120%);
      block-size: px-to-rem(320);
      transform: translateX(-50%);
      background-image: radial-gradient(
         ellipse at center,
         rgb(245 182 42 / 26%) 0%,
         transparent 70%
      );
      pointer-events: none;
   }

   &__mark {
      display: block;
      inline-size: px-to-rem(56);
      block-size: px-to-rem(56);
      color: var(--ink);
   }

   &__title {
      max-inline-size: 18ch;
      font-size: clamp(#{px-to-rem(28)}, 4.5vw, #{px-to-rem(44)});
      line-height: 1.1;
   }

   &__lede {
      max-inline-size: 52ch;
      color: var(--ink-soft);
      font-size: px-to-rem(17);
      line-height: 1.65;
   }

   @media (width < 40rem) {
      padding: var(--space-xl) var(--space-sm);
   }
}
</style>
