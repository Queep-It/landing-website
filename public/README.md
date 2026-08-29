# `public/`

Files served verbatim from the site root. Three things live here, and two
of them have a quirk worth knowing before you regenerate them.

| File | Why it exists |
| --- | --- |
| `favicon.svg` | The browser tab icon, referenced from `app.head.link` in `nuxt.config.ts`. |
| `apple-touch-icon.png` | 180×180. iOS ignores SVG favicons and reads only this. |
| `og-fallback.png` | Optional. Only needed if `nuxt-og-image` is ever disabled. |

## The two quirks

**The favicon is not the app mark.** `components/QueepItMark.vue` draws the
mark with a *transparent* knockout between the bookmark and the Q, so it
adapts to whatever surface it sits on. A favicon has no such surface — it
is composited against browser chrome that changes with the OS theme — so
`favicon.svg` is drawn on its own charcoal squircle with the knockout
painted in explicitly. The two files are deliberately not the same artwork,
and editing one does not update the other.

**iOS composites transparency against black.** An `apple-touch-icon.png`
with transparent corners gets black corners on the home screen. Export it
flattened onto `#FAF7F2` (the brand cream) with no alpha channel at all —
`sips -s format png --setProperty hasAlpha no` is enough.

## Regenerating the touch icon

```bash
# From the SVG, at 180×180, flattened onto the brand cream.
rsvg-convert -w 180 -h 180 -b '#FAF7F2' public/favicon.svg > public/apple-touch-icon.png
```

There is no `apple-touch-icon.png` in the repo yet — add one before launch,
or iOS falls back to a screenshot of the page when someone adds it to their
home screen.
