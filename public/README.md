# `public/`

Files served verbatim from the site root. Three things live here, and two
of them have a quirk worth knowing before you regenerate them.

| File | Why it exists |
| --- | --- |
| `favicon.svg` | The browser tab icon, referenced from `app.head.link` in `nuxt.config.ts`. |
| `apple-touch-icon.png` | 180×180. iOS ignores SVG favicons and reads only this. |
| `og-fallback.png` | Optional. Only needed if `nuxt-og-image` is ever disabled. |

## The two quirks

**The favicon is not the app mark.** Both draw the same two paths, but
`components/QueepitMark.vue` leaves them unpainted behind — ink is
`currentColor`, and the gap between the bookmark and the Q is a hole in the
artwork — so the mark takes on whatever surface it lands on. A favicon has
no such surface: it is composited against browser chrome that changes with
the OS theme, so `favicon.svg` sets the mark on its own charcoal squircle
in explicit cream and amber, and the hole reads as a dark gap. The paths
are shared by copy, not by import — editing one does not update the other.

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
