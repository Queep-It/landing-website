<template>
   <section id="how-it-works" class="section section--banded">
      <div class="section__inner">
         <header class="section-head section-head--center" data-reveal-target>
            <p class="section-head__eyebrow">
               {{ COPY.flow.eyebrow }}
            </p>
            <h2 class="section-head__title">
               {{ COPY.flow.title }}
            </h2>
            <p class="section-head__lede">
               {{ COPY.flow.lede }}
            </p>
         </header>

         <ol class="grid grid--steps flow">
            <li v-for="(step, index) in FLOW" :key="step.id" class="flow__step" data-reveal-target>
               <p class="flow__verb">
                  <span class="flow__index">{{ index + 1 }}</span>
                  {{ step.verb }}
               </p>
               <h3 class="flow__title">
                  {{ step.title }}
               </h3>
               <p class="flow__body">
                  {{ step.body }}
               </p>
            </li>
         </ol>
      </div>
   </section>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
@use "../assets/scss/abstracts" as *;

.flow {
   counter-reset: none;
   list-style: none;

   &__step {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: var(--space-2xs);
      padding-block-start: var(--space-md);
      // A rule above each step rather than a card around it: three cards
      // in a row here would compete with the six feature cards directly
      // above and flatten the page into one long grid.
      border-block-start: 2px solid var(--line-strong);
   }

   // The amber tick that marks where each step begins on its rule.
   &__step::before {
      content: "";
      position: absolute;
      inset-block-start: px-to-rem(-2);
      inset-inline-start: 0;
      inline-size: px-to-rem(48);
      block-size: 2px;
      background-color: var(--accent-solid);
   }

   &__verb {
      display: flex;
      align-items: center;
      gap: var(--space-2xs);
      color: var(--ink);
      font-family: var(--font-display);
      font-size: px-to-rem(13);
      font-weight: var(--weight-label);
      letter-spacing: 0.08em;
      text-transform: uppercase;
   }

   &__index {
      display: flex;
      align-items: center;
      justify-content: center;
      inline-size: px-to-rem(22);
      block-size: px-to-rem(22);
      border-radius: var(--radius-pill);
      background-color: var(--accent-solid);
      color: var(--accent-contrast);
      font-size: px-to-rem(12);
      letter-spacing: 0;
   }

   &__title {
      font-size: px-to-rem(20);
      line-height: 1.25;
   }

   &__body {
      color: var(--ink-soft);
      font-size: px-to-rem(15.5);
      line-height: 1.65;
   }
}
</style>
