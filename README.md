# Aureo La Union

A Next.js rebuild of aureohotels.com — the resort site for Aureo Hotel &
Resort, San Fernando, La Union.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

Next.js 15 (App Router), React 19, TypeScript, Tailwind v4. Every route
prerenders as static HTML, so this deploys to Vercel, Netlify, Cloudflare
Pages or an S3 bucket without a server.

---

## Read this before you deploy

**The existing WordPress site is compromised.** The live HTML contains a
hidden `<div style="display:none">` full of Indonesian gambling SEO spam
links, plus a `slot-server-luar.aureohotels.com` subdomain and a
`/wp-content/uploads/slot88/` directory that has no business existing. The
install is on WordPress 6.4.10 and WooCommerce 8.6.4, both well behind
current.

Two consequences:

1. **Do not migrate that install.** Cloning it carries the backdoor across.
   This rebuild deliberately takes only content and photos.
2. **The client needs to be told.** Their domain is serving spam links to
   Google right now, which is doing real damage to their search ranking.
   They should also assume any credentials used on that install are burned.

---

## Scope

A **like-for-like rebuild** of the existing site, not a redesign. Same
pages, same menu structure, same colours (`#aa8a51` gold, `#E5E5E5` page,
`#363537` top bar), same Lato type, same 15px button radius, same white
raised card floating over the header image. Existing URLs are preserved
(`/about-the-resort`, `/rooms/luxury-villas`, `/wellness/spa`,
`/sea-park-condo`) so inbound links and bookmarks survive the switch.

Two things from the old stack are gone deliberately: Swiper is replaced by
`src/components/Carousel.tsx` (same behaviour, one file instead of ~150KB),
and the copy-protection plugin that disabled right-click is not
reimplemented — it blocks nothing and it breaks keyboard copy for real
visitors.

## Room content

Room pages are **generated from the client's saved HTML**, not re-typed, so
the structure matches the live site rather than being re-interpreted.
`src/lib/room-pages.ts` was produced by parsing the uploaded files, and a
check confirms every amenity line and description in the source appears in
the code — 17 to 20 items per room across seven rooms, zero missing.

### The live layout, reproduced section for section

Every standard room page is identical:

```
page-header (header-small, room-specific background)
  -> BOOK NOW button, centred
  -> image carousel (1 slide, arrows, 5s autoplay, infinite, pause on hover)
  -> description paragraph
  -> "In-Room Amenities Include:"
  -> amenities in TWO columns
  -> "Have Questions?" + INQUIRE
```

All of it sits in a centred 8-of-12 column, as the theme does — not the
full-width two-column layout the earlier draft used.

**The two amenity columns are stored per room, not derived.** The split is
not the same on every page: the Executive Suite puts BREAKFAST at the foot of
the left column while every other room puts it at the foot of the right. The
Villa Rooms also use a different amenity set entirely (pool/garden view,
ceiling fan, marble bathroom, care kit).

### Pages with their own structure

- **About** — header, then a **sticky YouTube video** (`39RDtQ5cLQ0`), then
  the body copy. The live site uses the Essential Addons sticky-video widget,
  which shrinks to a 300×169 player bottom-right once scrolled past;
  `StickyVideo.tsx` reproduces that, but only mounts the iframe after a
  click, so YouTube sets no cookies on a page nobody watched.
- **Luxury Pool Villas** — fifteen sections: BOOK NOW, its own reservations
  block, a YouTube walkthrough (`Z6fPry3DK78`), the intro, then each of the
  three villa configurations as a carousel followed by its spec list, a
  divider, shared facilities, and a closing carousel.
- **Gallery** (`/facilities`) — the filterable grid, below.

### Still outstanding

- **Condo** — its page was not among the supplied files.
- **Premium Rooms sub-pages** — six of them, listed further down.

## Gallery

`/facilities` reproduces the live filterable gallery: 25 photographs across
four categories, filter tabs, captions on hover, click for full size. The
data is in `src/lib/gallery.ts`.

The live site has a sixth filter, **Weddings, with no images behind it**. It
renders an empty grid. Omitted here rather than reproducing a broken tab —
ask whether wedding photos were meant to be there. `/gallery` redirects to
`/facilities` so both paths work.

### More live-site problems found

- **The nav is inconsistent between pages.** The Luxury Pool Villas page is
  missing the "PREMIUM ROOMS" item that every other page has. Someone edited
  one menu and not the other.
- **The broken relative footer links are on every page**, not just About —
  from `/rooms/superior-room/` they resolve to
  `/rooms/superior-room/contact-us/`. Confirmed across four pages.
- The villas page embeds a YouTube video (`youtu.be/Z6fPry3DK78`) that is not
  reproduced here yet.

## Outstanding: the site is bigger than the homepage suggested

Fetching the live pages turned up a whole section that was not visible from
the homepage HTML. **Premium Rooms is a new wing**, published May 2026 and
edited as recently as July 2026 — over 250 accommodations, three restaurant
concepts, and its own video. Its page is rebuilt here with the real copy and
the full 14-question FAQ, but it links to six sub-pages that have **not** been
rebuilt:

- `/rooms/room-accommodations`
- `/rooms/restaurants`
- `/rooms/amenities`
- `/rooms/entertainment-zone` (marked coming soon)
- `/rooms/adventure-zone` (marked coming soon)
- `/rooms/spawellness`

Plus the individual room pages under `/rooms/` each have their own live page
with copy this rebuild has not captured. **Re-quote before committing to a
date.** The homepage was maybe a fifth of the actual site.

### Bugs found on the live site, worth reporting to the client

- **The footer links are broken on every page except the homepage.** They are
  written as relative paths (`./contact-us/`), so from `/about-the-resort/`
  they resolve to `/about-the-resort/contact-us/`, which does not exist. That
  means Contact, FAQs, Privacy Policy and Terms are unreachable from the
  footer on most of the site. Fixed here by using absolute paths.
- **Spa & Wellness repeats the Adventure Zone copy verbatim** on the Premium
  Rooms page. Copy-paste error; they need to supply the real text.
- **Two different booking links are in use.** The nav points at
  `aureo.hotelreservations.ph`, the About page button at
  `staahmax.staah.net/be/index_be?propertyId=MjMzNA`. Confirm which is
  current; a dead booking link costs real money.
- The FAQ states policies with money attached — Php 3,000 per extra person,
  children 7 and under free, group rates at 10 rooms, full payment before the
  option date, no cancellations. Confirm each is still correct before launch.

## Admin panel

Sign in at `/admin`. Staff can edit:

- **Room rates** — the "from ₱X per night" price shown on the rooms pages
- **Room counts** — how many of each type exist
- **Room photos** — upload a file, or paste a URL (the existing photos still
  point at the old WordPress library, and both work side by side)
- **Publish/hide** — take a room off the public site without deleting it
- **Payment options** — bank, GCash, Maya or card details shown on the cart

### Setup

```bash
npm run admin:password -- "a long password you choose"
```

Paste the two lines it prints into `.env.local` (development) or your host's
environment settings (production). The app refuses to start the admin without
them rather than falling back to a default — a site quietly running on a known
password is worse than one that will not boot.

Auth is PBKDF2-SHA256 for the password and an HMAC-signed session cookie,
12-hour expiry, verified in middleware *and* again inside every server action.
Uploads are checked against both content-type and magic bytes, and filenames
are generated rather than taken from the upload.

One account, shared. If the client later wants per-person logins and a record
of who changed what, that is a user table and an audit log — worth quoting
separately.

### Hosting implications

Content is a JSON file on disk (`DATA_DIR`, defaults to `./data`), written
atomically. Uploads go to `public/uploads`. **Both need a persistent
filesystem**, so this runs on a VPS, Fly.io, Render or Railway — *not* on
Vercel or Netlify serverless, where the filesystem is read-only and resets.
If the client wants Vercel, move the store to Postgres (Neon or Supabase) and
uploads to S3/R2 first. Swapping the store means rewriting `readStore` and
`writeStore` in `src/lib/store.ts` and nothing else.

### One thing to tell the client

Editing a rate here changes **what the website displays**, not what a guest is
charged. Bookings and payment run through STAAH. If the two disagree, guests
see one price and get billed another. Either update both, or pull rates from
the STAAH API so there is a single source of truth — worth pricing as a
follow-up.

## Where the shop stands

Catalogue, product pages, variants and a working cart are built. **Checkout
is not**, and it cannot be until three decisions are made:

1. **A database.** An order has to be written somewhere the moment it is
   placed. This is why "hardcode content, add an admin panel later" does not
   extend to the shop — a store *is* a database application.
2. **A payment provider.** For the Philippine market that means PayMongo or
   Xendit (GCash, Maya, cards, bank transfer). Stripe does not support PH
   businesses for local payment methods.
3. **Order management.** Someone has to see and fulfil orders. That is the
   admin panel, arriving earlier than planned.

Until then `/cart` says so plainly and offers email and phone ordering with
the basket pre-filled. That is honest and it takes orders today. What it
must not do is show a checkout button that goes nowhere.

There is also a migration question nobody has asked yet: the existing
WooCommerce store has real past orders and customer records. Decide whether
those come across or stay archived.

## What is real and what is placeholder

Carried over from the live site, but **re-confirm before launch** — some of
it has not been touched since 2021:

- Phone numbers, both office addresses, the reservations email
- Room type names, slugs and menu ordering
- The booking link (STAAH, `aureo.hotelreservations.ph`)
- Product names, prices and SKUs
- The footer copyright, which still reads 2021

**Placeholder — do not launch with these:**

| What | Where | How to fix |
| --- | --- | --- |
| Privacy Policy, Terms, FAQs | `src/app/privacy-policy`, `terms-and-conditions`, `faqs` | Stub pages, `noindex`. The text must come from the client verbatim — these are legal documents and the PH Data Privacy Act applies. Do not write them yourself. |
| Premium Rooms | `src/app/premium-rooms` | The page exists on the live site but its content was not in the scrape. Ask what belongs there. |
| Room floor areas and occupancy | `src/lib/rooms.ts` (`sizeSqm` / `sleeps` are `null`) | Get the rate sheet or the STAAH room setup. The UI hides these while null, so nothing breaks meanwhile. |
| Product variants | `src/lib/products.ts` | Voucher denominations, mask colours and shirt sizes are guesses from the displayed price ranges. Get the real ones. |
| Newsletter | `src/components/NewsletterForm.tsx` | Set `MAILCHIMP_ACTION`, or move it behind a route handler so the audience ID stays server-side. |
| TripAdvisor badge, Safety Seal | `src/components/SiteFooter.tsx` | Both are from 2021 and the seal has probably lapsed. Showing an expired certification is worse than showing nothing. |

## Photos

Nothing is committed to `public/images` — the photography belongs to the
client and lives in their WordPress media library. Pull it down with:

```bash
npm run fetch-images                  # the whole library
npm run fetch-images -- --dry-run     # list what it would take, download nothing
npm run fetch-images -- --limit 20    # a quick test run
npm run fetch-images -- --force       # re-download files already present
```

It reads the WordPress REST API rather than scraping the front end, so you
get **every** image at **original resolution** — not the Elementor crops the
old templates happen to reference. Runs five requests at a time, retries
with backoff, skips anything already on disk, and is safe to re-run.

It also writes `src/lib/media-manifest.json`: filename, real width and
height, alt text, upload date and original URL for each file. `src/lib/media.ts`
reads that, and the gallery page switches over to the full library
automatically once it is populated. The manifest is committed empty so a
fresh clone still builds.

**The script refuses files that are not images.** Every download is checked
against its content-type *and* its magic bytes, and anything under a path
matching `/slot`, `/togel`, `/gacor` or ending in `.php` is skipped without
a request. Given the state of that install, expect a few refusals — they are
findings, not failures. Do not go chasing them.

To cut the dependency on the old site entirely once the files are local:

1. Set `USE_LOCAL_IMAGES = true` in `src/lib/images.ts`
2. Delete the `remotePatterns` block in `next.config.ts`

Two things to raise with the client:

- **Alt text.** The script reports how many files have none. The old library
  is missing it on a lot of them, and `altFor()` only falls back to the
  filename title. Someone has to write these.
- **Originals.** Even the library's "full size" files are what WordPress
  kept after upload. If they still have the photographer's originals, ask —
  several of the hero shots are soft at full-bleed width.

If the REST API is disabled or the site is down, ask them for a zip of
`wp-content/uploads` instead and drop the files into `public/images`
directly. In that case you will need to write the manifest by hand or skip
it; the gallery falls back gracefully.

## Not included

- **The shop.** There is a live WooCommerce store with real products and
  orders. Moving it is its own project. The footer and nav link out to the
  existing shop for now.
- **The booking engine.** Reservations run on STAAH. We link out; rebuilding
  it would mean taking on payments and inventory.
- **A CMS.** Content lives in `src/lib/`. If the client wants to edit copy
  themselves, wire up Sanity or Payload — but ask first, because it doubles
  the scope and they may not need it.

---

## How it is put together

```
src/
  app/          routes — one folder per page
  components/   shared UI
  lib/
    site.ts     contact details, nav, booking URL
    rooms.ts    the room ladder
    images.ts   every photo, in one registry
    sun.ts      solar position math
```

### Design notes

The palette is deep water, sea glass and the brand gold (`#AA8A51`) carried
over from the existing site. Gold is the only accent — the resort's name
means "golden" and the shoreline faces west, so it does all the emphasis
work rather than sharing it with a second colour.

Type is Fraunces (display, set light with `SOFT`/`WONK` on), Karla (body),
and IBM Plex Mono, which is reserved for readings and specifications so
numbers on the page read as measurements.

**The sunset instrument** on the home page is the one place the design
spends its boldness. It shows the sun's actual position on today's arc and
the time it goes down over the gulf, computed from the resort's coordinates
in `src/lib/sun.ts` — the standard sunrise equation, accurate to about a
minute, with no API key and no third-party request. It exists because the
reason this resort is on this stretch of coast is that the coast faces
west, and that is worth saying on the page rather than in a paragraph.

Room types are presented as a ladder rather than a card grid, because the
tiers genuinely ascend and reading them top to bottom carries information a
grid would flatten.

Accessibility floor: skip link, visible focus rings, keyboard-reachable
mobile menu, `prefers-reduced-motion` respected, real `<address>` and
`<dl>` elements where they apply.
