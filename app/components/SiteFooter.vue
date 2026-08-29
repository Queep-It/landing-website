<template>
   <footer class="site-footer">
      <div class="site-footer__inner">
         <div class="site-footer__brand">
            <span class="site-footer__mark">
               <QueepItMark gap-color="var(--surface-sunken)" />
            </span>
            <p class="site-footer__name">
               {{ COPY.site.name }}
            </p>
            <p class="site-footer__tagline">
               {{ COPY.footer.tagline }}
            </p>
         </div>

         <nav :aria-label="COPY.footer.navLabel" class="site-footer__nav">
            <div class="site-footer__group">
               <h2 class="site-footer__heading">
                  {{ COPY.footer.groups.product }}
               </h2>
               <ul class="site-footer__links">
                  <li v-for="item in COPY.nav.links" :key="item.href">
                     <a :href="hrefFor(item.href)">{{ item.label }}</a>
                  </li>
               </ul>
            </div>

            <div class="site-footer__group">
               <h2 class="site-footer__heading">
                  {{ COPY.footer.groups.company }}
               </h2>
               <ul class="site-footer__links">
                  <li>
                     <NuxtLink to="/contact">
                        {{ COPY.footer.contact }}
                     </NuxtLink>
                  </li>
                  <li>
                     <NuxtLink to="/privacy-policy">
                        {{ COPY.footer.privacy }}
                     </NuxtLink>
                  </li>
                  <li>
                     <NuxtLink to="/terms">
                        {{ COPY.footer.terms }}
                     </NuxtLink>
                  </li>
               </ul>
            </div>
         </nav>
      </div>

      <p class="site-footer__legal">
         &copy; {{ year }} {{ COPY.site.name }}. {{ COPY.footer.rights }}
      </p>
   </footer>
</template>

<script lang="ts" setup>
// Rendered on the server first, so this is the deploy's year on a cached
// page — close enough for a copyright line, and it avoids a hydration
// mismatch from computing it twice.
const year = new Date().getFullYear()

const route = useRoute()

/// Bare fragment on the homepage, route-prefixed everywhere else — the same
/// rule `SiteNav` follows, and for the same reason. A hardcoded `/#pricing`
/// is a path as well as a fragment, so on the homepage the browser treats
/// it as a fresh navigation and reloads the page instead of scrolling.
const hrefFor = (hash: string): string => (route.path === "/" ? hash : `/${hash}`)
</script>

<style scoped lang="scss">
@use "../assets/scss/abstracts" as *;

.site-footer {
   padding: var(--space-2xl) var(--page-gutter) var(--space-lg);
   border-block-start: 1px solid var(--line);
   background-color: var(--surface-sunken);
   color: var(--muted);
   font-size: px-to-rem(14.5);

   &__inner {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: var(--space-xl);
      max-inline-size: var(--page-max);
      margin-inline: auto;
   }

   &__brand {
      display: flex;
      flex-direction: column;
      gap: var(--space-3xs);
      max-inline-size: px-to-rem(280);
   }

   &__mark {
      display: block;
      inline-size: px-to-rem(38);
      block-size: px-to-rem(38);
      margin-block-end: var(--space-2xs);
      color: var(--ink);
   }

   &__name {
      color: var(--ink);
      font-family: var(--font-display);
      font-size: px-to-rem(17);
      font-weight: var(--weight-heading);
      letter-spacing: -0.02em;
   }

   &__nav {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2xl);
   }

   &__group {
      display: flex;
      flex-direction: column;
      gap: var(--space-2xs);
   }

   // An <h2> for the document outline, sized like a label. Screen-reader
   // users navigate by heading, and two unlabelled link lists in a footer
   // are indistinguishable without them.
   &__heading {
      color: var(--ink);
      font-family: var(--font-display);
      font-size: px-to-rem(13);
      font-weight: var(--weight-label);
      letter-spacing: 0.06em;
      text-transform: uppercase;
   }

   &__links {
      display: flex;
      flex-direction: column;
      gap: var(--space-2xs);
      list-style: none;

      a {
         border-radius: var(--radius-sm);
         transition: color var(--duration) var(--ease);

         &:hover {
            color: var(--ink);
         }

         &:focus-visible {
            outline: 2px solid var(--accent-solid);
            outline-offset: 3px;
         }
      }
   }

   &__legal {
      max-inline-size: var(--page-max);
      margin-inline: auto;
      padding-block-start: var(--space-lg);
      margin-block-start: var(--space-xl);
      border-block-start: 1px solid var(--line);
      font-size: px-to-rem(13.5);
   }
}
</style>
