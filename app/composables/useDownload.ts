/// --------------------------------------------------
/// composables/useDownload.ts
/// --------------------------------------------------
/// Resolves the single "Get Queep" destination for every call to action.
///
/// One composable rather than each button reading runtimeConfig itself,
/// because the pre-release case has to be handled identically everywhere:
/// with no `NUXT_PUBLIC_DOWNLOAD_URL` set, every button becomes a waitlist
/// link with waitlist wording. A component that forgot would ship a pill
/// reading "Get Queep" pointing at nothing.
/// --------------------------------------------------

interface DownloadCta {
   /** True once a real download URL is configured. */
   available: ComputedRef<boolean>
   /** Where the primary button points, in either state. */
   href: ComputedRef<string>
   /** Picks the shipped or the pre-release label. */
   label: (shipped: string, pending: string) => ComputedRef<string>
}

export const useDownload = (): DownloadCta => {
   const config = useRuntimeConfig()

   const target = computed(() => downloadTarget(String(config.public.downloadUrl ?? "")))
   const available = computed(() => target.value.available)

   // Falls back to the contact page rather than to `#` — a button that
   // scrolls the page to the top is a worse dead end than one that reaches
   // a human.
   const href = computed(() => target.value.href ?? "/contact")

   const label = (shipped: string, pending: string): ComputedRef<string> =>
      computed(() => (available.value ? shipped : pending))

   return { available, href, label }
}
