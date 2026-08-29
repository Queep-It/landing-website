<template>
   <div>
      <HeroSection />
      <FeatureGrid />
      <FlowSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
   </div>
</template>

<script lang="ts" setup>
useAppSeo({
   title: SEO.home.title,
   description: SEO.home.description,
})

/// Structured data, in two blocks that answer two different queries.
///
/// `SoftwareApplication` is what earns the app's price and platform a
/// place in a rich result; `FAQPage` is what can surface an individual
/// answer directly in the SERP. They are separate types rather than one
/// nested object because Google reads them independently, and burying the
/// FAQ inside the application entity means it is never eligible.
///
/// The price is read from the registry rather than repeated, so a change
/// to the pricing section cannot leave a stale figure in the markup.
const paid = PRICING.find((tier) => tier.featured) ?? PRICING[0]

useSchemaOrg([
   defineSoftwareApp({
      name: COPY.site.name,
      description: SEO.home.description,
      operatingSystem: "macOS, iOS, iPadOS",
      // A productivity utility: `UtilitiesApplication` is the closest value in
      // schema.org's enumeration, which has no "productivity" category of its own.
      applicationCategory: "UtilitiesApplication",
      offers: {
         "@type": "Offer",
         "price": (paid?.price ?? "$0").replace(/[^0-9.]/g, ""),
         "priceCurrency": "USD",
      },
   }),
   defineWebPage({
      "@type": "FAQPage",
      "mainEntity": FAQ.map((entry) => ({
         "@type": "Question",
         "name": entry.question,
         "acceptedAnswer": { "@type": "Answer", "text": entry.answer },
      })),
   }),
])
</script>
