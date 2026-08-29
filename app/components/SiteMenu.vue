<template>
   <div class="site-menu">
      <button
         :aria-controls="sheetId"
         :aria-expanded="open"
         class="button button--ghost button--icon site-menu__trigger"
         type="button"
         @click="open = !open"
      >
         <span class="visually-hidden">{{ open ? COPY.nav.menuClose : COPY.nav.menuOpen }}</span>
         <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-width="1.75"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
         >
            <path v-if="open" d="m6 6 12 12M18 6 6 18" />
            <path v-else d="M4 7h16M4 12h16M4 17h16" />
         </svg>
      </button>

      <!-- `v-show` rather than `v-if`: the sheet holds the theme control,
           and tearing that down on every close would lose the mounted
           state the toggle syncs on. Hidden with `hidden` too, so it is
           out of the accessibility tree, not merely off-screen. -->
      <div v-show="open" :id="sheetId" class="site-menu__sheet">
         <SiteNav @navigate="open = false" />
         <div class="site-menu__divider" />
         <ThemeToggle />
      </div>
   </div>
</template>

<script lang="ts" setup>
/// The phone header's hamburger and the sheet behind it.
///
/// Three behaviours a bare toggle would miss, and all three are what makes
/// a menu feel finished rather than functional:
///
///   - Escape closes it, because that is what every native sheet does.
///   - A click outside closes it, because a menu that only closes from its
///     own button traps a reader who has already moved on.
///   - The route changing closes it, because an in-page jump leaves the
///     sheet covering the section it just scrolled to.

const open = ref(false)
const sheetId = useId()

const route = useRoute()

watch(() => route.fullPath, () => {
   open.value = false
})

// Both listeners are added once and gated on `open` inside, rather than
// attached and detached by a watcher: two always-on document listeners
// cost less than the watcher machinery to add and remove them.
onMounted(() => {
   const onKeydown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") open.value = false
   }

   const onPointerDown = (event: PointerEvent): void => {
      if (!open.value) return

      const target = event.target as Node | null

      if (target && !(event.currentTarget as Document).querySelector(".site-menu")?.contains(target)) {
         open.value = false
      }
   }

   document.addEventListener("keydown", onKeydown)
   document.addEventListener("pointerdown", onPointerDown)

   onBeforeUnmount(() => {
      document.removeEventListener("keydown", onKeydown)
      document.removeEventListener("pointerdown", onPointerDown)
   })
})
</script>

<style scoped lang="scss">
@use "../assets/scss/abstracts" as *;

.site-menu {
   position: relative;

   &__trigger svg {
      inline-size: px-to-rem(22);
      block-size: px-to-rem(22);
   }

   /// Anchored to the trigger rather than full-screen. The page behind
   /// stays visible and scrollable, which is the right call for four
   /// links — a full-screen takeover for a nav this short reads as a
   /// modal the reader has to escape.
   &__sheet {
      position: absolute;
      inset-block-start: calc(100% + var(--space-2xs));
      inset-inline-end: 0;
      z-index: 20;
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
      min-inline-size: px-to-rem(240);
      padding: var(--space-xs);
      border: 1px solid var(--line);
      border-radius: var(--radius-lg);
      background-color: var(--surface-raised);
      box-shadow: var(--shadow-lg);
   }

   &__divider {
      block-size: 1px;
      background-color: var(--line);
   }
}
</style>
