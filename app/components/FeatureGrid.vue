<template>
   <section id="features" class="section">
      <div class="section__inner">
         <header class="section-head section-head--center" data-reveal-target>
            <p class="section-head__eyebrow">
               {{ COPY.features.eyebrow }}
            </p>
            <h2 class="section-head__title">
               {{ COPY.features.title }}
            </h2>
            <p class="section-head__lede">
               {{ COPY.features.lede }}
            </p>
         </header>

         <ul class="grid grid--features">
            <li v-for="feature in FEATURES" :id="feature.id" :key="feature.id" data-reveal-target>
               <article class="feature-card">
                  <span class="feature-card__icon">
                     <AppIcon :name="feature.icon" />
                  </span>
                  <h3 class="feature-card__title">
                     {{ feature.title }}
                  </h3>
                  <p class="feature-card__body">
                     {{ feature.body }}
                  </p>
               </article>
            </li>
         </ul>
      </div>
   </section>
</template>

<script lang="ts" setup></script>
