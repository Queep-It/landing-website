<template>
   <div class="og">
      <div class="og__glow" />
      <div class="og__brand">
         <div class="og__mark">
            <div class="og__mark-ring" />
            <div class="og__mark-flag" />
         </div>
         Queep It
      </div>
      <div class="og__title">
         {{ title }}
      </div>
      <div class="og__subtitle">
         {{ subtitle }}
      </div>
   </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
   title?: string
   subtitle?: string
}>(), {
   title: "Keep it. Find it. Use it.",
   subtitle: "One shelf for the snippets, images, files and documents worth keeping close.",
})
</script>

<style scoped>
/* Inline, self-contained styles. Satori renders only a subset of CSS —
   flexbox, no grid, no background-clip — and resolves neither SCSS nor the
   :root custom properties the site uses, so the palette is repeated
   literally. These hex values mirror --surface, --ink and --accent-solid
   in assets/scss/base/_global.scss; change them together. */
.og {
   position: relative;
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;
   justify-content: center;
   padding: 80px;
   background-color: #faf7f2;
   color: #1a1c1f;
   font-family: sans-serif;
}

/* Pushed well off-canvas on purpose: Satori has no blur, so a circle
   sitting fully in frame reads as a hard disc rather than a glow — only an
   arc of it should be visible. */
.og__glow {
   position: absolute;
   top: -360px;
   right: -300px;
   width: 820px;
   height: 820px;
   border-radius: 820px;
   background-image: linear-gradient(135deg, #f5b62a 0%, #f8cf6b 100%);
   opacity: 0.5;
}

.og__brand {
   display: flex;
   align-items: center;
   font-size: 30px;
   font-weight: 700;
   letter-spacing: 1px;
   margin-bottom: 34px;
}

/* The mark, rebuilt from two boxes. The component's SVG cannot be reused
   here: Satori's SVG support does not cover fill-rule="evenodd", which is
   what cuts the counter out of the Q. A ring drawn as a thick border and a
   small amber square is close enough at 44px. */
.og__mark {
   position: relative;
   display: flex;
   width: 44px;
   height: 44px;
   margin-right: 16px;
}

.og__mark-ring {
   width: 38px;
   height: 38px;
   border: 9px solid #1a1c1f;
   border-radius: 38px;
}

.og__mark-flag {
   position: absolute;
   right: 0;
   bottom: 0;
   width: 17px;
   height: 20px;
   border: 3px solid #faf7f2;
   border-radius: 3px;
   background-color: #f5b62a;
}

.og__title {
   font-size: 78px;
   font-weight: 800;
   line-height: 1.03;
   letter-spacing: -3px;
}

.og__subtitle {
   font-size: 32px;
   font-weight: 400;
   margin-top: 26px;
   max-width: 900px;
   line-height: 1.35;
   opacity: 0.72;
}
</style>
