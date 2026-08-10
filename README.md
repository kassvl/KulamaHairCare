# KULAMA — Wrocław Hair Care & Braids

> Premium African braiding artistry in Wrocław. Live: [braidss.xyz](https://braidss.xyz)

The site opens on a **scroll-scrubbed film**: the braiding footage advances frame by
frame as you scroll instead of playing on its own, and once it has run its length the
wordmark and the strapline settle over the closing frame and dissolve into the page.

Behind it sits a real **appointment system**: guests send a request, the studio answers
from a private admin panel — confirm, decline, or offer a different time — and the guest
accepts or turns down that new time from their own status page.

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS v4** (tokens in `app/globals.css` `@theme`)
- **Framer Motion 12** — scroll scrubbing, parallax layers, editorial reveals
- **Lenis** for smooth scrolling (respects `prefers-reduced-motion`)
- **postgres** (postgres.js) for appointment storage, with a local JSON fallback
- **Lucide-react** for icons

## Configure

Two environment variables. Set them in Vercel → Settings → Environment Variables, and in
`.env.local` for development.

| Variable | Required | What it does |
| --- | --- | --- |
| `ADMIN_PASSWORD` | **yes** | Unlocks `/admin`. Without it the panel stays locked and no one can log in. |
| `DATABASE_URL` | **yes in production** | Any Postgres connection string (Neon, Supabase, Vercel Postgres). The `appointments` table is created automatically on first use. |
| `ADMIN_SESSION_SECRET` | optional | Signs the admin session cookie. Falls back to `ADMIN_PASSWORD`; set it if you want sessions to survive a password change. |

Without `DATABASE_URL` the site still runs and stores requests in `.data/appointments.json`.
That is fine locally, but **serverless hosting wipes that file**, so the admin panel shows a
warning banner until a database is configured.

## Develop

```sh
npm install
npm run dev          # http://localhost:3000
npm run build
npm run start
```

## How a booking travels

1. **Guest** picks a style, a date and a start time at `/rezervasyon`, leaves their details,
   and lands on a private status page at `/rezervasyon/<token>` — that URL *is* their booking.
2. **Studio** logs into `/admin` and sees the request under *Needs an answer*, with the
   guest's phone, email and note, plus one-tap Call / WhatsApp / Email links.
3. The studio **confirms**, **declines**, or **offers a different time** (only start times
   that actually fit that style inside opening hours are selectable).
4. If a new time was offered, the guest sees it on their status page and either **takes it**
   — which rewrites the booking to the new slot and confirms it — or turns it down.

Start times are generated from the opening hours in `lib/appointments.ts`, trimmed so a
style always finishes before closing: a 7-hour set of knotless braids stops being offered
after midday. Slots already taken are greyed out in the booking form.

## Structure

```
app/
├── layout.tsx                    # Fonts, SiteChrome (nav/footer, skipped on /admin)
├── page.tsx                      # VideoIntro → SplitHero → Services → WhyChooseUs → CTA
├── rezervasyon/page.tsx          # Booking form (style → slot → contact)
├── rezervasyon/[token]/page.tsx  # Guest's private status page
├── admin/page.tsx                # Password gate → studio desk
├── api/appointments/…            # Create a request; guest reads/answers by token
├── api/admin/…                   # Session, list, and confirm/decline/propose actions
└── pricing · galeri · special-offers · about-us · iletisim
components/
├── home/VideoIntro.tsx           # Scroll-scrubbed film + wordmark reveal
├── home/SplitHero.tsx            # Parallax editorial hero + booking card
├── booking/                      # BookingFlow · BookingStatus
├── admin/                        # AdminLogin · AdminDashboard
├── layout/                       # Navbar · Footer · SiteChrome · LenisProvider · CenterSeam
└── ui/                           # Section · Reveal
lib/
├── appointments.ts               # Opening hours, slot generation, validation (pure)
├── store.ts                      # Postgres driver + JSON fallback
├── auth.ts                       # Admin password + signed session cookie
├── content.ts · data.ts          # All copy, pricing, brand details
└── fonts.ts · utils.ts
public/video/                     # All-intra MP4s for frame-accurate scrubbing
```

Want to update copy or pricing? Touch `lib/content.ts` and `lib/data.ts` only.

## The intro film

`public/video/braids.mp4` is encoded **all-intra** (every frame a keyframe) so any scroll
position seeks to an exact frame with no decode lag — a normally-encoded MP4 stutters badly
when scrubbed. A lighter 720-wide cut is served to small screens. To swap the footage:

```sh
ffmpeg -i source.mp4 -an -c:v libx264 -preset slow -crf 23 \
  -g 1 -keyint_min 1 -sc_threshold 0 -pix_fmt yuv420p -movflags +faststart \
  public/video/braids.mp4
```

The scrub eases toward the scroll position rather than snapping to it, and
`prefers-reduced-motion` skips the scrub entirely, holding the closing frame.

## Design system

See [`design.md`](./design.md) for tokens, type scale and motion language.

## Deploy

Hosted on Vercel. Set `ADMIN_PASSWORD` and `DATABASE_URL` first, then:

```sh
npx vercel
```

## License

Personal project. © KULAMA Hair Care & Braids.
