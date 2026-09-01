<template>
   <svg
      aria-hidden="true"
      class="queepit-mark"
      fill="none"
      focusable="false"
      role="presentation"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
   >
      <!-- The Q. One path with `evenodd`, so both the counter and the
           notch the bookmark sits in are real holes rather than shapes
           painted in the surface colour — the mark has to stay legible on
           the cream page, the sunken footer band and the mock windows
           without knowing which one it landed on. The tail is the wedge
           that reaches into the counter from the lower right. -->
      <path
         :fill="inkColor"
         fill-rule="evenodd"
         clip-rule="evenodd"
         d="M255.5 19C384.458 19 489 123.542 489 252.5C489 289.002 480.62 323.546 465.686 354.318C461.199 351.415 455.87 349.733 450.154 349.733H381.643C365.676 349.733 352.733 362.856 352.733 379.045V464.85C323.129 478.427 290.2 486 255.5 486C126.542 486 22 381.458 22 252.5C22 123.542 126.542 19 255.5 19ZM255.5 127.411C186.415 127.411 130.411 183.415 130.411 252.5C130.411 321.585 186.415 377.589 255.5 377.589C259.453 377.589 263.363 377.402 267.223 377.043L241.526 339.95C235.058 330.613 239.61 317.683 250.501 314.46L298.791 300.17C305.696 298.126 313.132 300.746 317.232 306.665L342.184 342.681C365.856 319.921 380.589 287.932 380.589 252.5C380.589 183.415 324.585 127.411 255.5 127.411Z"
      />
      <!-- The bookmark, tucked into the notch above. Its ribbon tails are
           cut by the same curve the notch follows, so the gap around it
           is transparent on every surface. -->
      <path
         :fill="accentColor"
         d="M441.26 366C453.266 366 463 376.029 463 388.4V490.8C463 492.567 461.609 494 459.894 494H454.135C448.501 490.137 441.306 485.177 434.974 480.753C431.135 478.071 427.615 475.586 424.951 473.664C423.62 472.703 422.505 471.884 421.674 471.253C420.818 470.603 420.32 470.194 420.165 470.031L420.131 469.997L419.891 469.786C418.677 468.784 417.269 468.55 416.035 468.686C414.766 468.826 413.615 469.362 412.917 469.939L380.118 494H371.106C369.39 494 368 492.567 368 490.8V388.4C368 376.029 377.733 366 389.74 366H441.26Z"
      />
   </svg>
</template>

<script lang="ts" setup>
/// The app mark, drawn rather than shipped as a bitmap.
///
/// It appears at 28px in the header, 40px in the footer and 96px in the
/// hero, in two themes, and a PNG that is crisp at all six of those is
/// three files and a `srcset`.
///
/// Unlike the earlier drawing, the gap between the bookmark and the Q is
/// cut out of the artwork itself rather than stroked in the backdrop
/// colour, so callers no longer have to tell the mark what it is sitting
/// on. See `QueepitLogo.vue` for the horizontal lockup.

withDefaults(defineProps<{
   /** The Q and its tail. Defaults to the current text colour. */
   inkColor?: string
   /** The bookmark fill. Holds still across themes — it is the brand. */
   accentColor?: string
}>(), {
   inkColor: "currentColor",
   accentColor: "var(--accent-solid)",
})
</script>

<style scoped lang="scss">
.queepit-mark {
   display: block;
   inline-size: 100%;
   block-size: 100%;
}
</style>
