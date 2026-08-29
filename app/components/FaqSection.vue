<template>
   <section id="faq" class="section section--banded">
      <div class="section__inner">
         <header class="section-head section-head--center" data-reveal-target>
            <p class="section-head__eyebrow">
               {{ COPY.faq.eyebrow }}
            </p>
            <h2 class="section-head__title">
               {{ COPY.faq.title }}
            </h2>
            <p class="section-head__lede">
               {{ COPY.faq.lede }}
            </p>
         </header>

         <div class="faq">
            <!-- Native <details>, so it works with JavaScript disabled and
                 announces its own expanded state. A hand-rolled accordion
                 would need aria-expanded, aria-controls and key handling
                 to reach the same place. No shared `name` attribute: an
                 exclusive accordion closes the answer a reader is
                 comparing against the one they just opened. -->
            <details v-for="entry in FAQ" :id="entry.id" :key="entry.id" class="faq__item" data-reveal-target>
               <summary class="faq__question">
                  {{ entry.question }}
                  <svg
                     aria-hidden="true"
                     class="faq__chevron"
                     fill="none"
                     focusable="false"
                     stroke="currentColor"
                     stroke-linecap="round"
                     stroke-linejoin="round"
                     stroke-width="2"
                     viewBox="0 0 16 16"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path d="m4 6 4 4 4-4" />
                  </svg>
               </summary>
               <p class="faq__answer">
                  {{ entry.answer }}
               </p>
            </details>
         </div>
      </div>
   </section>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
@use "../assets/scss/abstracts" as *;

.faq__chevron {
   inline-size: px-to-rem(16);
   block-size: px-to-rem(16);
}
</style>
