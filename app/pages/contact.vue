<template>
   <div class="page stack">
      <header class="page-header">
         <h1 class="page-header__title">
            {{ COPY.contact.heading }}
         </h1>
         <p class="page-header__lede">
            {{ COPY.contact.lede }}
         </p>
      </header>

      <div class="card card--panel contact">
         <p class="contact__label">
            Email
         </p>
         <!-- A real `mailto:` rather than a form: there is no backend on
              this site, and a contact form that posts to a third party is
              a data-processing relationship taken on to save one click. -->
         <a class="contact__address" :href="`mailto:${SITE_EMAIL}`">{{ SITE_EMAIL }}</a>
         <p class="contact__note">
            {{ COPY.contact.responseNote }}
         </p>
      </div>
   </div>
</template>

<script lang="ts" setup>
useAppSeo({
   title: SEO.contact.title,
   description: SEO.contact.description,
})
</script>

<style scoped lang="scss">
@use "../assets/scss/abstracts" as *;

.contact {
   display: flex;
   flex-direction: column;
   gap: var(--space-2xs);
   align-items: flex-start;

   &__label {
      color: var(--muted);
      font-size: px-to-rem(13);
      font-weight: var(--weight-label);
      letter-spacing: 0.06em;
      text-transform: uppercase;
   }

   &__address {
      color: var(--accent);
      font-family: var(--font-display);
      font-size: clamp(#{px-to-rem(20)}, 3.5vw, #{px-to-rem(28)});
      font-weight: var(--weight-heading);
      letter-spacing: -0.02em;
      // Long addresses on a 320px screen would otherwise force a
      // horizontal scrollbar on the whole document.
      overflow-wrap: anywhere;

      &:focus-visible {
         outline: 2px solid var(--accent-solid);
         outline-offset: 3px;
      }
   }

   &__note {
      color: var(--muted);
      font-size: px-to-rem(14.5);
   }
}
</style>
