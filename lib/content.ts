import { brand } from '@/lib/data'

/**
 * The four families the studio books by. Durations drive the booking form's
 * start times, so a style always finishes before closing.
 */
export const services = [
  {
    slug: 'loc-maintenance',
    film: '/video/svc-loc-maintenance.mp4',
    poster: '/video/svc-loc-maintenance.jpg',
    image: '/img/dreadlock-retwist.jpg',
    title: 'Loc Maintenance',
    /** How the service is named on the page; `title` is what bookings store. */
    label: 'Loc maintenance',
    duration: '2–4 h',
    hours: [2, 4],
    from: '170 zł',
    description:
      'Loc retwist, interlock hook, needle crochet and barrel locs — kept clean, kept tight.',
  },
  {
    slug: 'starter-locs',
    film: '/video/svc-starter-locs.mp4',
    poster: '/video/svc-starter-locs.jpg',
    image: '/img/comb-twist.jpg',
    title: 'Starter Locs',
    label: 'Starter locs',
    duration: '3–6 h',
    hours: [3, 6],
    from: '220 zł',
    description:
      'Comb coil with gel, twist starter locs, and instant locs with or without extensions.',
  },
  {
    slug: 'braids-women',
    film: '/video/svc-braids-women.mp4',
    poster: '/video/svc-braids-women.jpg',
    image: '/img/goddess-braids.jpg',
    title: 'Braids · Women',
    label: 'Women’s braids',
    duration: '5–7 h',
    hours: [5, 7],
    from: '350 zł',
    description:
      'Boho braids, Fulani bohemian, goddess braids, and cornrows with extensions.',
  },
  {
    slug: 'mens-cornrows',
    film: '/video/svc-mens-cornrows.mp4',
    poster: '/video/svc-mens-cornrows.jpg',
    image: '/img/stitch-braids.jpg',
    title: 'Men’s Cornrows',
    label: 'Men’s cornrows',
    duration: '2–3 h',
    hours: [2, 3],
    from: '180 zł',
    description: 'Basic cornrows, stitch, design cornrows, and cornrows with twists.',
  },
] as const

/**
 * The entrance strip: three upright studio clips. A phone shows the first one.
 */
export const heroFilms = {
  strip: [
    { src: '/video/hero-twists.mp4', poster: '/video/hero-twists.jpg' },
    { src: '/video/hero-retwist.mp4', poster: '/video/hero-retwist.jpg' },
    { src: '/video/hero-braids.mp4', poster: '/video/hero-braids.jpg' },
  ],
  mobile: { src: '/video/hero-twists.mp4', poster: '/video/hero-twists.jpg' },
} as const

/** The studio's published price list. */
export const priceList = [
  {
    group: 'Loc Maintenance',
    meta: null,
    items: [
      {
        name: 'Loc Retwist',
        meta: '2–4 hrs',
        tiers: [
          ['Short / Fade', '170 zł'],
          ['Taper', '190 zł'],
          ['+ Simple Style', '210 zł'],
        ],
      },
      {
        name: 'Interlock Maintenance',
        meta: 'hook',
        tiers: [['', 'from 220 zł']],
      },
      {
        name: 'Micro Locs Retwist',
        meta: null,
        tiers: [['', '350 zł']],
      },
      {
        name: 'Needle Crochet Maintenance',
        meta: null,
        tiers: [
          ['Skin Fade', '280–300 zł+'],
          ['Taper Fade', '300–320 zł+'],
          ['+ Style', '330–350 zł+'],
        ],
      },
      {
        name: 'Barrel Locs',
        meta: 'gel style',
        tiers: [
          ['Skin Fade', '170 zł'],
          ['Taper', '190 zł'],
          ['+ Style', '210 zł'],
        ],
      },
    ],
  },
  {
    group: 'Starter Locs',
    meta: null,
    items: [
      {
        name: 'Gel Starter Locs',
        meta: 'comb coil',
        tiers: [['', 'from 230 zł']],
      },
      {
        name: 'Twist Starter Locs',
        meta: null,
        tiers: [['', 'from 220 zł']],
      },
      {
        name: 'Instant Locs',
        meta: '5–6 hrs',
        tiers: [
          ['', 'from 450 zł'],
          ['Additional time', 'may cost extra'],
        ],
      },
      {
        name: 'Instant Locs with Extensions',
        meta: null,
        tiers: [
          ['Taper Fade', '380 zł'],
          ['+ Style', '400 zł + 5 hrs'],
        ],
      },
    ],
  },
  {
    group: 'Braids · Women',
    meta: 'approx 5–7+ hrs',
    items: [
      {
        name: 'Boho Braids',
        meta: null,
        tiers: [['', 'from 420 zł']],
      },
      {
        name: 'Fulani Bohemian',
        meta: null,
        tiers: [['', 'from 430 zł']],
      },
      {
        name: 'Goddess Braids',
        meta: null,
        tiers: [
          ['Medium', 'from 350 zł'],
          ['Long', '380 zł'],
        ],
      },
      {
        name: 'Cornrows with Extensions',
        meta: null,
        tiers: [
          ['Shoulder length', '200–300 zł'],
          ['Mid back', '300–350 zł'],
          ['Waist length', '350–400 zł'],
        ],
      },
    ],
  },
  {
    group: 'Men’s Cornrows',
    meta: null,
    items: [
      { name: 'Basic Cornrows', meta: null, tiers: [['', '180 zł']] },
      { name: 'Stitch Cornrows', meta: null, tiers: [['', '220 zł']] },
      { name: 'Design Cornrows', meta: null, tiers: [['', '240–260 zł']] },
      { name: 'Cornrows & Twists', meta: null, tiers: [['', '185 zł']] },
    ],
  },
] as const

export const priceNotes = [
  'Final price depends on the style and length you choose.',
  '+20 zł for added length.',
  'Hair extensions & curls are not provided.',
] as const

export const offers = [
  {
    title: 'First-time guest',
    headline: '−15% on your debut style',
    description: 'Book any signature service for your first KULAMA visit and receive 15 % off.',
    badge: 'NEW · 2026',
  },
  {
    title: 'Bring a friend',
    headline: 'Two seats, one shared space',
    description: 'Book back-to-back appointments with a friend and we’ll add a complimentary deep-condition treatment.',
    badge: 'DUO',
  },
  {
    title: 'Refresh after 8 weeks',
    headline: '20 zł off your re-twist',
    description: 'Return within eight weeks of your last visit for a re-twist or edge refresh — 20 zł comes off.',
    badge: 'LOYALTY',
  },
] as const

export const galleryItems = [
  { caption: 'Knotless braids · S–Medium', tag: 'Knotless', image: '/img/knotless-braids.jpg' },
  { caption: 'Heart shaped cornrows', tag: 'Cornrows', image: '/img/heart-cornrows.jpg' },
  { caption: 'Goddess braids', tag: 'Braids', image: '/img/goddess-braids.jpg' },
  { caption: 'Jumbo braids', tag: 'Braids', image: '/img/jumbo-braids.jpg' },
  { caption: '6 stitch braids', tag: 'Cornrows', image: '/img/stitch-braids.jpg' },
  { caption: 'Twists', tag: 'Twists', image: '/img/twists.jpg' },
  { caption: '4 barrel twists', tag: 'Twists', image: '/img/barrel-twists.jpg' },
  { caption: 'Comb twist', tag: 'Twists', image: '/img/comb-twist.jpg' },
  { caption: 'Dreadlock retwist and style', tag: 'Locs', image: '/img/dreadlock-retwist.jpg' },
] as const

export type Service = (typeof services)[number]
export type Offer = (typeof offers)[number]
export type GalleryItem = (typeof galleryItems)[number]

export { brand }
