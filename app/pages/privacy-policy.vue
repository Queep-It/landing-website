<template>
   <div class="page stack">
      <header class="page-header">
         <h1 class="page-header__title">
            Privacy Policy
         </h1>
         <p class="page-header__lede">
            Last updated {{ UPDATED }}. The short version: your library lives on your
            devices and in your own iCloud account. We do not have a copy.
         </p>
      </header>

      <div class="prose">
         <h2>What the app stores</h2>
         <p>
            Everything you save into Queep — text, images, files and documents, along with
            the collections and tags attached to them — is written to a local library on the
            device you saved it on. If you turn sync on, that library is replicated between
            your own devices through your personal iCloud account. It does not pass through
            any server we operate, and we cannot read it.
         </p>

         <h2>What the app sends</h2>
         <p>
            Queep contacts the network for two things only, and both can be turned off in
            Settings:
         </p>
         <ul>
            <li>An update check, which sends the app version and nothing else.</li>
            <li>
               Anonymous crash reports, which contain a stack trace and your OS version. No
               item contents, filenames or search queries are ever included.
            </li>
         </ul>

         <h2>What this website collects</h2>
         <p>
            This site is statically generated and serves no advertising. Aggregate,
            cookieless traffic analytics are collected by our host to measure page views and
            performance. No profile is built, nothing is sold, and no data is shared with
            advertisers.
         </p>

         <h2>Payments</h2>
         <p>
            Purchases are processed by Apple through the App Store. We receive the fact that
            a licence was bought and never see your card details, billing address or Apple
            Account.
         </p>

         <h2>Your choices</h2>
         <ul>
            <li>Turn sync off to keep every library strictly on-device.</li>
            <li>Turn crash reporting and update checks off in Settings.</li>
            <li>
               Export everything to plain files and folders at any time, then delete the app.
               Removing it removes the local library with it.
            </li>
         </ul>

         <h2>Contact</h2>
         <p>
            Questions about any of the above go to
            <a :href="`mailto:${SITE_EMAIL}`">{{ SITE_EMAIL }}</a>.
         </p>
      </div>
   </div>
</template>

<script lang="ts" setup>
/// Not a `new Date()` — a policy page that silently claims to have been
/// updated on the day of the last deploy is worse than one with an honest
/// stale date, and Google treats a date that moves without the text
/// changing as a freshness signal it should not be given.
const UPDATED = "29 August 2026"

useAppSeo({
   title: SEO.privacy.title,
   description: SEO.privacy.description,
})
</script>
