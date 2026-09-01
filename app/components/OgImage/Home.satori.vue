<template>
   <div class="og">
      <div class="og__glow" />
      <div class="og__brand">
         <svg
            class="og__mark"
            fill="none"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
         >
            <path
               fill="#1a1c1f"
               fill-rule="evenodd"
               clip-rule="evenodd"
               d="M255.5 19C384.458 19 489 123.542 489 252.5C489 289.002 480.62 323.546 465.686 354.318C461.199 351.415 455.87 349.733 450.154 349.733H381.643C365.676 349.733 352.733 362.856 352.733 379.045V464.85C323.129 478.427 290.2 486 255.5 486C126.542 486 22 381.458 22 252.5C22 123.542 126.542 19 255.5 19ZM255.5 127.411C186.415 127.411 130.411 183.415 130.411 252.5C130.411 321.585 186.415 377.589 255.5 377.589C259.453 377.589 263.363 377.402 267.223 377.043L241.526 339.95C235.058 330.613 239.61 317.683 250.501 314.46L298.791 300.17C305.696 298.126 313.132 300.746 317.232 306.665L342.184 342.681C365.856 319.921 380.589 287.932 380.589 252.5C380.589 183.415 324.585 127.411 255.5 127.411Z"
            />
            <path
               fill="#f5b62a"
               d="M441.26 366C453.266 366 463 376.029 463 388.4V490.8C463 492.567 461.609 494 459.894 494H454.135C448.501 490.137 441.306 485.177 434.974 480.753C431.135 478.071 427.615 475.586 424.951 473.664C423.62 472.703 422.505 471.884 421.674 471.253C420.818 470.603 420.32 470.194 420.165 470.031L420.131 469.997L419.891 469.786C418.677 468.784 417.269 468.55 416.035 468.686C414.766 468.826 413.615 469.362 412.917 469.939L380.118 494H371.106C369.39 494 368 492.567 368 490.8V388.4C368 376.029 377.733 366 389.74 366H441.26Z"
            />
         </svg>
         Queepit
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

/* The mark, as the real artwork rather than as an approximation in
   boxes. Satori hands inline SVG to resvg, which honours
   `fill-rule="evenodd"`, so the counter, the tail and the notch the
   bookmark sits in all stay as holes and the cream shows through exactly
   as it does on the page. The two paths are copied from
   `components/QueepitMark.vue` with the colours resolved — Satori sees
   neither `currentColor` nor the custom properties — so re-copy them if
   the mark is ever redrawn.

   46px is not arbitrary: it sets the Q's diameter to 1.87x the cap height
   of the 30px wordmark beside it, which is the ratio the two have in the
   supplied horizontal lockup. */
.og__mark {
   width: 46px;
   height: 46px;
   margin-right: 14px;
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
