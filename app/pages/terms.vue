<template>
   <div class="page stack">
      <header class="page-header">
         <h1 class="page-header__title">
            Terms of Use
         </h1>
         <p class="page-header__lede">
            Last updated {{ UPDATED }}. Plain language, and short enough to actually read.
         </p>
      </header>

      <div class="prose">
         <h2>The licence</h2>
         <p>
            Buying Queepit gives you a personal, non-exclusive licence to run it on the devices
            signed in to your Apple Account. You may not resell, sublicense or redistribute
            the app itself.
         </p>

         <h2>Updates</h2>
         <p>
            A Pro licence includes one year of updates from the date of purchase. When that
            year ends the version you have keeps working indefinitely; only new releases
            require a further purchase. We will not disable a version you have paid for.
         </p>

         <h2>Acceptable use</h2>
         <p>
            Queepit stores whatever you put in it, and what you put in it is your
            responsibility. Do not use the app to store or distribute material you have no
            right to, and do not attempt to reverse-engineer, decompile or circumvent its
            licensing.
         </p>

         <h2>Availability</h2>
         <p>
            The app runs locally, so it does not depend on us being online. Sync depends on
            iCloud, which is operated by Apple and outside our control. This website is
            provided as-is and may be changed or taken down at any time.
         </p>

         <h2>Liability</h2>
         <p>
            Queepit is provided without warranty of any kind. To the maximum extent permitted
            by law, our total liability for any claim relating to the app is limited to the
            amount you paid for your licence. Keep your own backups of anything you cannot
            afford to lose — that advice applies to every app, this one included.
         </p>

         <h2>Changes to these terms</h2>
         <p>
            If these terms change materially, the updated date above changes with them and
            the change is announced in the app's release notes.
         </p>

         <h2>Contact</h2>
         <p>
            Anything unclear goes to <a :href="`mailto:${SITE_EMAIL}`">{{ SITE_EMAIL }}</a>.
         </p>
      </div>
   </div>
</template>

<script lang="ts" setup>
const UPDATED = "29 August 2026"

useAppSeo({
   title: SEO.terms.title,
   description: SEO.terms.description,
})
</script>
