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
| `index.html` | The home page — every section, in source order |
| `icd.html` | Indian Christian Day 2026 — its own page (generated) |
| `rsvp.html` | On-site RSVP form for ICD (generated) |
| `tools-build-pages.py` | Regenerates `icd.html` and `rsvp.html` — run after changing the header/footer |
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

### Upcoming Events dates update themselves

The three service cards compute their own next date on every page load, so the
section never advertises a service that has already happened. Nobody has to edit
dates each month.

How it works:

- Each recurring card carries **`data-recurs="1|2|4"`** — which Saturday of the
  month it falls on. `script.js` finds the next occurrence that hasn't passed and
  rewrites the date text, the month/day chip, and the `<time datetime>` value.
- **The event's own day still counts as upcoming**, so the card reads correctly
  right through the Saturday itself and only rolls forward the next day.
- Cards are **re-sorted soonest-first**, because the computed dates fall out of
  the authored order as the month turns.
- **One-off events are excluded.** Indian Christian Day has no `data-recurs`, so
  its real date (26 Sep 2026) is never touched. Add any future one-off the same
  way: a normal card with a hardcoded date and no `data-recurs`.
- **`data-at`** sets the time inside `datetime` (Bible Study: `18:30`). Cards
  without a published time stay date-only rather than implying one.
- The dates written in the HTML are real, so if JavaScript never runs a visitor
  still sees a plausible date instead of a blank.

To change a service to a different Saturday, edit that one `data-recurs` value —
and the `.event-tag` badge text beside it, which is plain English.

Verified against 400 consecutive days × 3 services: every generated date is a
Saturday, is never in the past, and is the correct ordinal for its month.
Year-end rollover (Dec → Jan) and leap-year February both check out.

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

### The photography — all real now

Every placeholder SVG has been replaced with a real photograph of the fellowship.
Each is served as WebP with a JPEG fallback via `<picture>`.

| Slot | File stem | Aspect | Photo |
| --- | --- | --- | --- |
| Hero | `photo-hero` | 14:9 | Fellowship on stage before the lit cross (from `IMG_7070.heic`, 24 MP) |
| Event — Worship Service | `photo-worship-service` | 16:11 | Children worshipping, hands raised |
| Event — Intercessory Prayers | `photo-intercessory` | 16:11 | Men praying in a home |
| Event — Bible Study | `photo-bible-study` | 16:11 | Study around the tables |
| Media — lead sermon | `photo-sermon` | 16:9 | Fellowship on stage before the lit cross (from `IMG_7070.heic`) |
| Clip — Praise & Worship | `photo-clip-praise` | 16:10 | Choir on stage |
| Clip — Bible Study | `photo-clip-bible` | 16:10 | Scripture discussion |
| Clip — Special Program | `photo-clip-special` | 16:10 | Children with awards |
| Community ×7 | `photo-community-*` | 4:3 | families, youth, children, young, outreach, fellowship, special |
| Prayer / giving band | `photo-prayer-band` | ~4:3 | Prayer circle (fades off the left edge) |
| Founders ×2 | `founder-*` | 1:1 | Shown 120px round |
| Tab icon | `favicon.svg` | square | The gold cross |

**Two notes for whoever swaps a photo later:**

1. Keep the aspect ratio in the table, or re-crop — the layout reserves the box.
2. If you change the pixel size, **update the `width`/`height` attributes on the
   `<img>` too**. Those attributes are what stop the page jumping as images load,
   but on the community tiles they also override `aspect-ratio`, which is why
   `.tile-row img` carries an explicit `height: auto`.

### The hero

Cropped from `IMG_7070.heic` (5712×4284). The crop places the **lit cross behind
the headline** — dark enough for white text to sit over, and it reads as a motif
rather than clutter — with the fellowship's faces filling the right, past the
scrim. Downscaled 2.7× from the original, so it is genuinely sharp: **90 KB** as
WebP, less than half the previous hero.

On screens ≤720px a `cover` crop only shows about 39% of the width, which cut off
both the cross and the speaker. `.hero-img` therefore shifts to
`object-position: 45% 45%` there so both stay in frame.

> **Replacing the hero?** The file name stays the same, so browsers and CDNs will
> keep serving the old picture from cache. It caught me out while testing: disk,
> HTTP response and DOM all showed the new file while the page still painted the
> old one. Hard-refresh, and expect a delay on a CDN.

Four supplied photos are not currently used (a duplicate of the choir shot, a
wide hall group, and two further outdoor group shots). They're still in
`~/Downloads` if you want to swap any in.

### ⚠️ Photo consent

These images show identifiable adults and **children** on a public page that
search engines will index. Most congregations handle this with a simple photo
release, and a way for a family to ask for a picture to be removed. Worth having
that in place if you don't already.

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

The home page no longer lists individual phone numbers or personal email
addresses. Its Contact section carries the venue, the mailing address, the
meeting times, `info@sacff.org`, and the contact form (which delivers to
`sacff7@gmail.com`).

Individual organiser phone numbers appear only on **`icd.html`**, where they came
from the event flyer and serve a specific purpose — RSVPs for Indian Christian
Day. They are `tel:` links, in the `.icd-contact-grid` block.

## Indian Christian Day 2026 (`icd.html`)

A second page, linked from the main nav (highlighted gold) and the footer's Quick
Links, plus a featured card above the recurring events on the home page.

### The video

`icd.html` carries the ICD promo video under the heading "A Faith That Crossed
Oceans", between the programme grid and the flyer.

| | |
| --- | --- |
| Source | `~/Downloads/sacff-icd-2026-video.mp4` — 816×464, 30fps, H.264/AAC, 3:45 |
| Served | `assets/icd-2026-video.mp4` |
| Size | **40 MB → 25 MB** (re-encoded at CRF 24, audio to 96 kbps) |
| Poster | `assets/icd-video-poster.jpg` — a frame from 10s in |

Deliberate choices:

- **No autoplay.** It has sound and runs nearly four minutes; it plays only when
  asked. `controls` and `playsinline` (so iOS doesn't force fullscreen).
- **`preload="metadata"`** — a few KB of header on page load rather than 25 MB.
  Without this the page would pull the whole file for every visitor.
- **`-movflags +faststart`** moves the moov atom ahead of the media data, so it
  begins playing while still downloading instead of after. Verified: moov at byte
  36, mdat at 236157.
- A `<p>` fallback inside `<video>` offers a direct download if playback fails.
- Explicit `width`/`height` reserve the space so the page doesn't jump.

> **⚠️ Two things to weigh up**
>
> **Bandwidth.** 25 MB per view. GitHub Pages' soft limit is 100 GB/month, so
> roughly 4,000 views — fine for a congregation, but if this is ever shared
> widely, put the video on the **YouTube channel** and embed it instead. That
> also gets you adaptive quality on poor connections, which a plain MP4 cannot.
>
> **Captions.** There is no subtitle track. If the video has narration, a
> `.vtt` file added as `<track kind="captions">` would make it accessible to
> deaf and hard-of-hearing visitors, and usable with the sound off. YouTube
> would auto-generate these.

### The featured card

It is an `<article>`, **not** a wrapping `<a>`, because it holds two links of its
own — "All the details →" (to this page) and a gold **RSVP** button (to the
Google Form) — and an anchor may not contain another anchor. The flyer image is
also a link to this page, kept out of the tab order with `tabindex="-1"` so
keyboard users don't hit the same destination twice.

`assets/icd-card.*` is cut from the flyer to show only the title block, ribbon,
chapter, date and strapline — **the programme icons underneath are cropped out**.
Getting it clean took some care: the flyer's title is nearly full-width, so a
square-ish slot cropping the sides would clip the final letter of "DAY". The card
image is therefore built at a **1.37 ratio matched to the slot** (media column
46%), with a small blurred wash of the flyer's own adjacent pixels padding top and
bottom. Any trimming then eats that wash instead of the lettering — measured at
95% of width shown on desktop, and on mobile the 16:9 slot trims only vertically.

If you re-cut this image, keep the ratio near 1.37 and leave margin around the
title, or the side crop will bite into it again.

Everything on it comes from the flyer:

| | |
| --- | --- |
| Event | Indian Christian Day 2026 — *Yeshu Bhakti Divas*, San Antonio, Texas Chapter |
| Date | Saturday, September 26, 2026 |
| Time | 5:00 PM tea & displays · 6:00 PM programme & dinner |
| Venue | St. Thomas Syro Malabar Catholic Church, 8333 Braun Rd, San Antonio, TX 78254 |
| Programme | Music & culture programs · Inspiring presentations · Heritage displays · Food & fellowship |
| Contacts | Praveen Kanapala, Rector Arya, Binu George, Lizu Thomas, Murali Swamidass, Prabhakar Mumoorthy |
| Giving | Zelle to SACFF (210) 352-0159 · sponsor status at $250+, with a full-width **"♥ Give / Free-will offering towards ICD Event →"** button at the foot of the Zelle card |
| Links | indianchristianday.com · indianchristianday@gmail.com |

`icd.html` is **generated from `index.html`'s header and footer** so the two
pages cannot drift apart — nav anchors are rewritten to `index.html#…` and the
ICD link is marked `aria-current="page"`. If you restructure the header,
regenerate rather than hand-editing both.

### Both events share September 26 — intentionally

**September 26, 2026 is the fourth Saturday**, which is also the monthly
**Worship Service** slot. Both therefore appear in Upcoming Events for that date,
and that is **deliberate** — confirmed with the organisers. Don't "fix" it by
removing one.

## RSVP page (`rsvp.html`)

Visitors fill in an RSVP **on the site**, styled like the rest of it. Responses
still land in the **same Google Form spreadsheet** — nothing changed on Google's
side, and the organisers' existing responses sheet keeps filling up as before.

### How it posts to Google

The form posts directly to the Form's own submit endpoint:

```
action="https://docs.google.com/forms/d/e/1FAIpQLScM…/formResponse"
method="post"  target="gform-sink"
```

Google accepts a cross-origin POST but will not let a page **read** the reply, so
the post is aimed at a hidden `<iframe name="gform-sink">` and that frame's
`load` event is the completion signal. A 6-second fallback timer shows the
thank-you anyway if the frame never loads, so nobody is left staring at
"Sending…".

### Field ids — do not guess these

Read out of the live form's own `FB_PUBLIC_LOAD_DATA_`:

| Field | Question | Type |
| --- | --- | --- |
| `entry.1905292663` | Will you attend on September 26? | Yes / No / Maybe |
| `entry.974158068` | Name(s), phone, email, city | paragraph |
| `entry.1175855864` | How many attending | scale 1–10 |
| `entry.176170972` | Free-will offering? | Yes / No / Maybe |

All four are **required** by Google, so the page marks them required too — a
submission missing one would be silently rejected, and we can't read the error.

Google asks for names, phone, email and city as **one paragraph answer**. The page
collects them as four separate inputs (much nicer to fill in) and joins them into
that single field on submit:

```
Name(s): … | Phone: … | Email: … | City: …
```

Those four inputs deliberately have **no `name` attribute**, so they are never
posted to Google as stray parameters — JavaScript reads them by `id`.

### Give link on the thank-you panel

After a successful RSVP, the confirmation panel leads with the **primary** action —
a gold **"♥ Give / Free-will offering towards ICD Event →"** button pointing at
`index.html#give`. "Back to event details" and "Get directions" sit beneath it as
outlined secondary buttons.

Two notes on that:

- There is **exactly one gold button** in the panel. "Back to event details" used
  to be gold too; two golds means no primary at all.
- The secondaries use a new **`.btn-ghost`** (transparent with a 1px inset
  border). `.btn-light` is near-white, which would have been white-on-white on
  this panel.
- `.btn` is `white-space: nowrap`, which this long label would overflow on a
  phone, so `.btn-give` re-enables wrapping. Verified: 392px on one line at
  desktop, wrapping to a 274px two-line button at 380px, inside the panel with
  no page overflow.

It sits there rather than beside the offering question deliberately: the question
only records intent for the Google Form, and asking for money mid-form competes
with finishing the RSVP. Once the RSVP is submitted, it's the natural next step.
The Zelle number and memo remain in the offering question as context.

That anchor is the "Give / Support SACFF" band, and the full **Ways to Give**
panel (Zelle, PayPal/card, cheque) sits immediately below it — so a visitor
landing there sees both in one screen without another click. Verified: the band
arrives 88px from the top, clear of the sticky header, with the giving methods
in view beneath.

Nothing is collected on the RSVP page itself.

### If the questions ever change

Re-read the ids and re-run the generator. To see the current schema:

```bash
curl -sL "https://docs.google.com/forms/d/e/1FAIpQLScMOsVZuYhxIJ0074iGPoYH7TvH1j9S90DprQ2VRr4Z8OR_fA/viewform" | grep -o 'FB_PUBLIC_LOAD_DATA_.*'
```

### Verified

- Field ids and option strings confirmed against Google by **prefill echo**
  (read-only — creates no response row).
- Full submit flow exercised against a **local mock endpoint**, which received
  exactly the four `entry.*` values with the joined details string.
- Incomplete submissions blocked client-side before anything is sent.
- **No test RSVP was sent to the live form** — please send one yourself and
  confirm it appears in the responses sheet.

The original Google form is still linked twice on the page as a fallback ("open
the original Google form", and in a `<noscript>` notice), since the on-site form
needs JavaScript to join the details field.

The flyer's **QR code** is not reproduced — a QR scaled off a flyer photo often
fails to scan, and a tappable button is better on a web page regardless.

## Giving (`#giving`)

Three methods, using SACFF's own payment accounts:

| Method | Detail |
| --- | --- |
| **Zelle** | Recipient phone **(210) 352-0159**, recipient type **Business**, memo **SACFF Donation / Offering** |
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
   your bank displays for (210) 352-0159. A donor should see something they
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
