<template>
   <section id="pricing" class="section">
      <div class="section__inner">
         <header class="section-head section-head--center" data-reveal-target>
            <p class="section-head__eyebrow">
               {{ COPY.pricing.eyebrow }}
            </p>
            <h2 class="section-head__title">
               {{ COPY.pricing.title }}
            </h2>
            <p class="section-head__lede">
               {{ COPY.pricing.lede }}
            </p>
         </header>

         <ul class="grid grid--pricing">
            <li v-for="tier in PRICING" :key="tier.id" data-reveal-target>
               <article class="price-card" :class="{ 'price-card--featured': tier.featured }">
                  <div class="price-card__head">
                     <h3 class="price-card__name">
                        {{ tier.name }}
                     </h3>
                     <span v-if="tier.featured" class="badge badge--accent">Most popular</span>
                  </div>

                  <p class="price-card__price">
                     {{ tier.price }}
                     <span class="price-card__period">{{ tier.period }}</span>
                  </p>

                  <p class="price-card__blurb">
                     {{ tier.blurb }}
                  </p>

                  <ul class="price-card__features">
                     <li v-for="entry in tier.features" :key="entry" class="price-card__feature">
                        <!-- Decorative: the list semantics already say
                             "included", so an accessible name here would
                             announce "tick" before every single row. -->
                        <svg
                           aria-hidden="true"
                           class="price-card__check"
                           fill="none"
                           focusable="false"
                           stroke="currentColor"
                           stroke-linecap="round"
                           stroke-linejoin="round"
                           stroke-width="2.25"
                           viewBox="0 0 16 16"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path d="m3 8.5 3.5 3.5L13 4.5" />
                        </svg>
                        {{ entry }}
                     </li>
                  </ul>

                  <a
                     class="button"
                     :class="tier.featured ? 'button--primary' : ''"
                     :href="href"
                  >
                     {{ tier.cta }}
                  </a>
               </article>
            </li>
         </ul>

         <p class="pricing__note" data-reveal-target>
            {{ COPY.pricing.billingNote }}
         </p>
      </div>
   </section>
</template>

<script lang="ts" setup>
/// Every tier follows the shared download destination, which is itself the
/// contact page until the app ships.
const { href } = useDownload()
</script>

<style scoped lang="scss">
@use "../assets/scss/abstracts" as *;

.pricing__note {
   margin-block-start: var(--space-md);
   color: var(--muted);
   font-size: px-to-rem(13.5);
   text-align: center;
}
</style>
