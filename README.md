# KULAMA — Wrocław Hair Care & Braids

> Premium African braiding artistry in Wrocław. Live: [braidss.xyz](https://braidss.xyz)

A complete redesign of the KULAMA website around a single visual idea: the page is **split vertically down the middle**, and from above the viewport a **stylized 3D girl** leans over the layout, her **3D braids swaying and falling onto the page** in real time.

## Stack

- **Next.js 16** (canary, App Router, Turbopack)
- **React 19**
- **TypeScript** (strict)
- **Tailwind CSS v4** (via `@tailwindcss/postcss`, tokens in `app/globals.css` `@theme`)
- **React Three Fiber 9** + **drei 10** + **three 0.169** for the 3D scene
- **Framer Motion 12** for editorial reveals
- **Lenis** for smooth scrolling (respects `prefers-reduced-motion`)
- **Lucide-react** for icons

## Structure

```
kulama-web/
├── app/
│   ├── layout.tsx               # Fonts (Cormorant Garamond italic / Inter / Caveat), Navbar, Footer, LenisProvider, CenterSeam
│   ├── globals.css              # Tailwind v4 @theme tokens + utilities
│   ├── page.tsx                 # Home (SplitHero + ServicesPreview + WhyChooseUs + CTA)
│   ├── rezervasyon/page.tsx     # 3-step booking flow (style → slot → contact form)
│   ├── pricing/page.tsx         # 4 service tiers + length adders + checklist
│   ├── galeri/page.tsx          # 6 gradient-tinted gallery cards
│   ├── special-offers/page.tsx  # 3 rotating offers + newsletter
│   ├── about-us/page.tsx        # Studio narrative + stats + values
│   └── iletisim/page.tsx        # Contact channels + form + opening hours
├── components/
│   ├── three/                   # The 3D narrative
│   │   ├── HairScene.tsx        # R3F Canvas, fixed overlay, pointer-events-none
│   │   ├── Head.tsx             # Stylized "looking down" girl: sphere skin + jaw + scalp + gold cuff
│   │   ├── Braid.tsx            # TubeGeometry along an animated CatmullRom curve, sin + perlin sway
│   │   └── noise.ts             # Tiny deterministic 2D Perlin
│   ├── home/                    # SplitHero · ServicesPreview · WhyChooseUs · CTA
│   ├── layout/                  # Navbar · Footer · LenisProvider · CenterSeam
│   └── ui/Section.tsx           # Editorial section wrapper (eyebrow + display title + body)
├── lib/
│   ├── data.ts                  # Brand info + nav
│   ├── content.ts               # Services, offers, gallery items
│   ├── fonts.ts                 # next/font/google bindings
│   └── utils.ts                 # `cn()` (clsx + tailwind-merge)
└── design.md                    # Full design system reference
```

Want to update copy or pricing? Touch `lib/content.ts` and `lib/data.ts` only — no JSX edits required.

## Develop

```sh
npm install
npm run dev          # http://localhost:3000
npm run build        # next build (Turbopack)
npm run start        # serve production build
```

Production build is ~9 static pages, 0 warnings.

## The 3D layer

`HairScene` mounts a single `<Canvas>` overlay. Inside:
- A `Head` group (sphere primitives + a hemisphere scalp + a gold parting cuff) sits high above the camera at `y ≈ 4.6`.
- 11 `Braid` instances are anchored along a 70° hemisphere arc on the scalp.
- Each braid is a `TubeGeometry` along a `CatmullRomCurve3`. Each frame the curve points are repositioned: the anchor stays put while lower segments are pushed by `sin(t * freq + phase)` plus a Perlin drift, with stiffness `pow(k, 1.4)` so the rope bends progressively toward the tip.
- Lighting is warm key + cool fill + soft fog (`8 → 18`) so braids fade into the cream paper background gracefully.
- The whole layer is `pointer-events-none` and `aria-hidden` — purely decorative.

`prefers-reduced-motion` freezes the sway and disables Lenis automatically.

## Design system

See [`design.md`](./design.md) for the full token system, type scale, motion language and component inventory.

## Deploy

`braidss.xyz` is currently hosted on Vercel. To deploy a preview:

```sh
npx vercel
```

## License

Personal project. © KULAMA Hair Care & Braids.
