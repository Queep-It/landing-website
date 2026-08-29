<template>
   <nav :aria-label="COPY.nav.label" class="site-nav">
      <ul class="site-nav__list">
         <li v-for="item in COPY.nav.links" :key="item.href">
            <a
               class="site-nav__link"
               :class="{ 'site-nav__link--active': active === item.href }"
               :href="hrefFor(item.href)"
               @click="emit('navigate')"
            >
               {{ item.label }}
            </a>
         </li>
      </ul>
   </nav>
</template>

<script lang="ts" setup>
/// The in-page section links.
///
/// They are plain anchors, not <NuxtLink>: these are fragment jumps on the
/// homepage, and the browser's native handling of them already does the
/// smooth scroll (`scroll-behavior` in the reset), respects
/// prefers-reduced-motion for free, and updates the URL so the position is
/// linkable. A router-driven scroll would reimplement all three worse.
///
/// The one thing native anchors cannot do is work from another page, which
/// is why `hrefFor` prefixes the route when we are not on the homepage —
/// otherwise `#pricing` from `/terms` scrolls nowhere.

const emit = defineEmits<{
   /** Fired so the mobile sheet can close itself after a jump. */
   navigate: []
}>()

const route = useRoute()

const active = useActiveSection(COPY.nav.links.map((item) => item.href))

const hrefFor = (hash: string): string => (route.path === "/" ? hash : `/${hash}`)
</script>

<style scoped lang="scss">
@use "../assets/scss/abstracts" as *;

.site-nav {
   min-inline-size: 0;

   &__list {
      display: flex;
      align-items: center;
      gap: var(--space-3xs);
      list-style: none;
   }

   &__link {
      display: block;
      padding: px-to-rem(7) var(--space-xs);
      border-radius: var(--radius-pill);
      color: var(--ink-soft);
      font-size: px-to-rem(14.5);
      font-weight: var(--weight-strong);
      white-space: nowrap;
      transition: color var(--duration) var(--ease), background-color var(--duration) var(--ease);

      &:hover {
         background-color: var(--surface-sunken);
         color: var(--ink);
      }

      &:focus-visible {
         outline: 2px solid var(--accent-solid);
         outline-offset: 2px;
      }
   }

   // Set by the scroll spy. Deliberately a weight and colour change rather
   // than a background pill: the pill would need a transition on a
   // property that moves as you scroll, and a control that flickers
   // between two states at a section boundary is worse than no indicator.
   &__link--active {
      color: var(--ink);
      font-weight: var(--weight-label);
   }

   // Inside the mobile sheet the list becomes a column of full-width rows.
   @media (width < 52rem) {
      &__list {
         flex-direction: column;
         align-items: stretch;
         gap: 0;
      }

      &__link {
         padding: var(--space-xs) var(--space-2xs);
         border-radius: var(--radius-md);
         font-size: px-to-rem(16);
      }
   }
}
</style>
