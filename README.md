# SACFF — San Antonio Christian Family Fellowship

A single-page static website built to the attached design: deep navy and antique gold
on warm cream, with a photographic hero, monthly-gathering cards, events, media,
prayer/giving band, community strip and a full footer.

No build step, no framework, no dependencies to install.

## Run it

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 4173
```

Then visit <http://localhost:4173>. (Serving over HTTP rather than `file://` is
recommended — it matches how it will behave when hosted.)

## Deploy it

Upload the whole folder to any static host — Netlify, Vercel, Cloudflare Pages,
GitHub Pages, S3, or ordinary shared hosting. There is nothing to compile.

## Files

| Path | What it is |
| --- | --- |
| `index.html` | The entire page — every section, in source order |
| `styles.css` | All styling; design tokens live in `:root` at the top |
| `script.js` | Mobile menu, scroll-spy nav highlight, form handling, footer year |
| `assets/*.svg` | Artwork (see below) |
| `.claude/launch.json` | Dev-server config for the editor's preview pane |

## Sections

`#top` header · hero · `#gather` (the four monthly pillars) · `#about` · `#events` ·
`#media` · `#give` (prayer + giving) · `#community` · `#contact` · footer.

Every navigation link resolves to a section on this page. The design you supplied
showed the home page only; **About** and **Contact** sections were added so that
the full navigation works — remove them from the nav and the page if you'd rather
they become separate pages later.

## Changing the content

Everything is plain HTML — edit `index.html` directly.

- **Gathering times** — the four `<article class="pillar">` blocks.
- **Events** — the three `<article class="event-card">` blocks. Each has a
  `date-chip` (month + day), a `meta` list (date, time, location) and a button.
- **Videos** — the `video--lead` link plus three `clip` links. Point each `href`
  at the real YouTube/Vimeo URL.
- **Community strip** — the `tile-row` list items.
- **Footer credit** — the `<p class="credit">` line in the footer bottom bar
  ("Designed & created by Prasad & Murali").
- **Dates are placeholders** copied from the supplied design (Nov–Dec 2025) and are
  now in the past. Update them before going live.

## Changing the look

All colours, fonts, radii and shadows are CSS custom properties at the top of
`styles.css`:

```css
:root {
  --navy: #0d2b56;
  --gold: #bf9646;
  --cream: #f8f4ec;
  --serif: "Playfair Display", …;   /* headings */
  --sans:  "Inter", …;              /* body */
  --script: "Dancing Script", …;    /* the handwritten accents */
}
```

Fonts come from Google Fonts via one `<link>` in the `<head>`; each stack has a
real system fallback, so the page still looks right offline.

## Replacing the artwork

`assets/` holds hand-built SVGs — warm-lit worship scenes, event imagery and
community portraits — so the site ships with zero external image dependencies and
no photo licensing to sort out. **They are placeholders: swap in real photographs
of the congregation when you have them.**

Replace a file with a photo of the same aspect ratio and nothing else changes:

| File | Aspect | Used for |
| --- | --- | --- |
| `hero-worship.svg` | ~14:9, wide | Hero background (right side stays visible; the left is covered by the navy scrim) |
| `event-*.svg` | 16:11 | Event card images |
| `video-sermon.svg` | 16:9 | Featured sermon thumbnail |
| `video-praise/bible/special.svg` | 16:10 | Small clip thumbnails |
| `community-*.svg` | 4:3 | Community strip tiles |
| `prayer-hands.svg` | ~4:3 | Left edge of the prayer/giving band |
| `favicon.svg` | square | Browser tab icon |

Use `.jpg`/`.webp` if you prefer — just update the `src` in `index.html`. Keep the
`alt` text accurate.

## Wiring up the forms

The contact form and the newsletter subscribe box currently **validate and show a
confirmation message, but send nothing** — there is no backend. See the
"form stubs" block in `script.js`. To make them live, either:

- set an `action`/`method` on the `<form>` and let it post normally, or
- replace the stub with a `fetch()` to your endpoint (Formspree, Netlify Forms,
  Mailchimp, your own API).

The "Register Now", "Give Now" and "Add to Calendar" buttons are likewise linked to
`#contact` as placeholders; point them at your real registration, giving and
calendar URLs.

## Accessibility & support notes

- Skip link, landmark elements, labelled form controls, visible focus rings.
- Decorative imagery is `aria-hidden`; meaningful images have `alt` text.
- Honours `prefers-reduced-motion`; includes a print stylesheet.
- Fully responsive: the nav collapses to a menu below 960px, and the layout reflows
  at 1100 / 960 / 720 / 560px. No horizontal scrolling at 390px.
- Works without JavaScript — the menu is the only feature that needs it, and every
  nav target is reachable by scrolling.
