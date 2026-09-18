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

`#top` header · hero · `#gather` (the four monthly pillars) · `#about` · `#founders` ·
`#events` · `#media` · `#give` (prayer + giving) · `#community` · `#contact` · footer.

`#founders` is not in the main navigation (that mirrors the supplied design) but is
linked from the footer's Quick Links and is directly linkable.

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
- **Founders** — the two `<article class="founder">` blocks in `#founders`.
- **Dates are placeholders** copied from the supplied design (Nov–Dec 2025) and are
  now in the past. Update them before going live.

## Where the content came from

Most service copy is now taken verbatim (or lightly condensed) from the old
`sacff.org/events.html`: the mission statement, the three service descriptions,
the venue, and the contact numbers. The old page's three-Saturday schedule also
confirmed the gathering times.

**Upcoming Events lists real dates.** The three cards are the next actual
occurrences of the 1st / 2nd / 4th Saturday services, computed from the calendar
(Sep 26, Oct 3, Oct 10 2026 as written). **These are hardcoded and will go stale** —
roll them forward monthly, or generate them in `script.js` from the
first/second/fourth-Saturday rule so they never need touching again. Say the word
and I'll make them self-updating.

## ⚠️ Invented copy that needs a real answer

Some text was written to fill the design and is **not** based on anything factual.
Correct it before this goes public:

| Where | Currently says | Status |
| --- | --- | --- |
| About card | Founded **2001** | ✅ confirmed (the old site's "20th Anniversary" corroborates) |
| About card | **120+** families | ❓ invented — needs a real figure |
| About card | **36** gatherings / yr | ❓ inferred: 3 services × 12 months |
| Media section | Sermon titles and dates | ❓ invented — replace with real videos from the YouTube channel |
| Community strip | 7 category tiles | ❓ invented categories |
| Founder bios | See below | ⚠️ deliberately general |

The old site titles both founders "SACFF Board Member"; this site says "Founding
Member" per your instruction. Worth confirming which you want publicly.

The founder biographies state only what is known: that both are founding members
from 2001 and have served the fellowship since. Everything else is phrased around
SACFF's own values rather than claiming personal detail, because inventing
character or history for named, identifiable people on a public page would be
wrong. **Ask Dr. Duggirala and Dr. Arya for a sentence or two each** — how the
fellowship began, what they'd want a visitor to know — and replace the bios with
their own words.

Professional and academic background is intentionally excluded at the client's
request: this is a spiritual site, not a curriculum vitae.

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

`assets/` holds the real SACFF logo plus hand-built SVG scenery. The SVGs are
placeholders — worship scenes, event imagery and community portraits — so the site
ships with zero external image dependencies and no photo licensing to sort out.
**Swap in real photographs of the congregation when you have them.**

Replace a file with a photo of the same aspect ratio and nothing else changes:

### The logo (real artwork, not a placeholder)

The SACFF crest is the genuine logo. It was supplied on a light studio background,
which would have shown as a grey box on the navy footer, so the background was
removed by flood-filling inward from the image border — that way enclosed light
areas (the dove, the Bible pages, the ribbon lettering) survived untouched.

| File | Role |
| --- | --- |
| `logo-source.png` | **Master.** 1370×1148, original background. Not served — keep it for print, signage and future re-exports |
| `logo-mark.webp` / `.png` | Header emblem, shown 54px tall (160px source = retina-sharp) |
| `logo-full.webp` / `.png` | Footer brand, shown ~230px wide |
| `logo-icon-180.png` | Apple touch icon (home-screen bookmark) |
| `favicon.svg` | Browser tab. Deliberately the simple gold cross, **not** the crest — the crest turns to mush at 16px |

WebP is served with a PNG fallback via `<picture>` (109KB vs 604KB for the footer
logo). If you re-export the crest, regenerate both formats and keep the pixel
dimensions, or update the `width`/`height` attributes in `index.html`.

In the header the crest sits beside the "SACFF" text because its own ribbon
lettering is unreadable at 54px — it reads as an emblem, and the text does the
naming. In the footer it's large enough to stand alone, so the wordmark there was
removed to avoid saying the name twice.

### The photography (placeholders)

| File | Aspect | Used for |
| --- | --- | --- |
| `hero-worship.svg` | ~14:9, wide | Hero background (right side stays visible; the left is covered by the navy scrim) |
| `event-*.svg` | 16:11 | Event card images |
| `video-sermon.svg` | 16:9 | Featured sermon thumbnail |
| `video-praise/bible/special.svg` | 16:10 | Small clip thumbnails |
| `community-*.svg` | 4:3 | Community strip tiles |
| `founder-*.jpg/.webp` | 1:1 | **Real photos**, not placeholders — shown 120px round |
| `prayer-hands.svg` | ~4:3 | Left edge of the prayer/giving band |
| `favicon.svg` | square | Browser tab icon |

Use `.jpg`/`.webp` if you prefer — just update the `src` in `index.html`. Keep the
`alt` text accurate.

## Addresses on the page

Two different places, labelled so they aren't confused:

| Label | Address | Used for |
| --- | --- | --- |
| **Where we meet** | Family Life Center, Oxford United Methodist Church, 9739 Huebner Rd, San Antonio, TX 78240 | Visitors coming to a service |
| **Mailing address** | 11518 Camp Real Ln, San Antonio, TX 78253 | Post, cheques, official correspondence |

The venue carries a **Get directions** link using Google's cross-platform Maps
URL scheme, so it opens the native maps app on a phone. If the venue ever changes,
update it in three places: the Contact section, the footer, and the `query=`
parameter in that link.

Both appear in the Contact section and in the footer.

> **The IRS still has the old address.** SACFF's 501(c)(3) record
> (EIN **82-4274125**) lists 5919 Oak Blossom as the address of record. If the
> organisation has moved, file **IRS Form 8822-B** to update it — otherwise
> official IRS correspondence goes to the old address and the public registry
> disagrees with the website. Worth checking the Texas Secretary of State and
> the bank records too.

## Contact details on the page

| Person | Phone | Email |
| --- | --- | --- |
| Dr. Ravindranath Duggirala | (210) 326-0806 | ravindranathduggirala@gmail.com |
| Dr. Rector Arya | (210) 668-5436 | rectorarya@gmail.com |

Phones are `tel:` links (tap to call on a phone) and emails are `mailto:` links.
Edit them in the `.people-list` block in `index.html`.

> **Note on spam:** these addresses are in plain text, so address-harvesting bots
> will find them and the volume of junk mail to those two Gmail accounts will
> climb. Gmail's filter handles most of it. If it becomes a nuisance, the fix is
> to drop the addresses and let the contact form carry that traffic instead — it
> already delivers to `sacff7@gmail.com`.

## Giving (`#giving`)

Three methods, using SACFF's own payment accounts:

| Method | Detail |
| --- | --- |
| **Zelle** | Recipient phone **(210) 668-5436**, recipient type **Business**, memo **SACFF Donation / Offering** |
| **PayPal / card** | PayPal JS SDK Buttons, client id in `script.js` |
| **Cheque** | Payable to SACFF, posted to 11518 Camp Real Ln, San Antonio, TX 78253 |

### How the PayPal integration works

The old page created a **fixed-amount** order for a conference fee. Giving needs
a variable amount, so this version differs:

- Four preset buttons plus a free-text amount field; the field is the single
  source of truth and `createOrder` reads it **at click time**, so the buttons
  never need re-rendering when the amount changes.
- Amounts are validated to $1–$25,000 and formatted to 2 decimal places before
  reaching PayPal; an invalid amount rejects the order rather than sending junk.
- `shipping_preference: NO_SHIPPING` — it's a donation, not a shipped product.
- The old page only wrote the result to `console.log`, so a donor saw nothing
  after paying. This one shows a thank-you by name, and handles cancel and error.
- The SDK is **lazy-loaded** when the section scrolls into view, so visitors who
  never reach it aren't served a third-party script. If it fails to load, the
  card panel says so and Zelle/cheque still work — those need no JavaScript.
- On mobile the card panel is ordered first, since that's the path most people take.

### ⚠️ Before you rely on this

1. **Make one small real donation to yourself and confirm it lands** in the right
   PayPal account. The client id came from a 2023 page; the SDK renders buttons
   with it, which means it's a valid live credential, but only a real transaction
   proves *which* account it credits. I did not run a test payment.
2. **Confirm the Zelle recipient name.** Send a small test and check what name
   your bank displays for (210) 668-5436. A donor should see something they
   recognise as SACFF before they confirm a payment — if it shows anything else,
   rename the Zelle business profile in that bank account.
3. The PayPal client id is a **public** identifier, safe in a public repo. It is
   not a secret key.
4. As a 501(c)(3) you can apply for PayPal's **nonprofit rate** (about
   1.99% + $0.49 vs the standard 2.89% + $0.49) and enrol in **PayPal Giving
   Fund**. Worth doing — it's free money back on every gift.
5. Venmo and Pay Later are disabled, mirroring the configuration that was known
   to work in 2023. Venmo is popular for US donations — worth enabling once
   you've confirmed the account supports it (`disable-funding` in `script.js`).

The **EIN and 501(c)(3) line** at the foot of the section is mine, not from the
old page — donors routinely need it for tax purposes, and it's verified against
the IRS Exempt Organizations file. Delete the `.giving-footnote` paragraph if you
would rather not show it.

## Social links

Live and verified:

| | |
| --- | --- |
| Facebook | <https://www.facebook.com/sacffellowship/> |
| YouTube | <https://www.youtube.com/@SACFF-Media> |

Both open in a new tab with `rel="noopener noreferrer"`. The YouTube channel is
also the target of "View All Videos" in the Watch & Listen section.

**Still placeholders:** the WhatsApp and Instagram icons in the footer point at
on-page anchors (`#contact`, `#community`). Either give them real URLs or delete
those two `<li>` elements — dead social icons read worse than no icon at all.

## Wiring up the forms

There are two live forms and one stub.

| Form | Where | Goes to |
| --- | --- | --- |
| Contact | `#contact` | Email to **sacff7@gmail.com** |
| Prayer request | `#prayer` | Row in a **Google Sheet** in that account's Drive (+ email notice) |
| Newsletter | footer | ⚠️ still a stub — confirms, stores nothing |

Both live forms post to one free **Google Apps Script** web app running under the
SACFF Google account. Nothing goes through a third party and there is no cost.

**👉 One setup step is needed before they work:**
see [`google-apps-script/README.md`](google-apps-script/README.md). It requires a
login to `sacff7@gmail.com`, so it's yours to do — about ten minutes. Then paste
the resulting URL into `ENDPOINT` at the top of `script.js`.

Until then nothing is lost: the contact form opens the visitor's own mail app
pre-addressed to `sacff7@gmail.com`, and the prayer form says it isn't connected
yet and gives the address.

### Built-in protections

- **Honeypot field** plus a 2.5-second minimum fill time; bots get a bland
  "received" and nothing is sent.
- **`method="post"`** on both forms, so that if JavaScript ever fails, a submit
  cannot put someone's prayer request into the URL bar and browser history.
- **`<noscript>`** fallback pointing at the email address.
- Values starting `=`, `+`, `-` or `@` are escaped before reaching the sheet, so
  visitor text can't become a live spreadsheet formula.
- The prayer form asks whether a request may be shared by name, and records the
  answer — **please honour it**; people disclose serious things there.

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
