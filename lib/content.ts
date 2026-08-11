import { brand } from '@/lib/data'

/**
 * The four families the studio books by. Durations drive the booking form's
 * start times, so a style always finishes before closing.
 */
export const services = [
  {
    slug: 'loc-maintenance',
    image: '/img/dreadlock-retwist.jpg',
    title: 'Loc Maintenance',
    duration: '2–4 h',
    hours: [2, 4],
    from: '170 zł',
    description:
      'Loc retwist, interlock hook, needle crochet and barrel locs — kept clean, kept tight.',
  },
  {
    slug: 'starter-locs',
    image: '/img/comb-twist.jpg',
    title: 'Starter Locs',
    duration: '3–6 h',
    hours: [3, 6],
    from: '180 zł',
    description:
      'Comb coil with gel, twist starter locs, and instant locs with or without extensions.',
  },
  {
    slug: 'braids-women',
    image: '/img/goddess-braids.jpg',
    title: 'Braids · Women',
    duration: '5–7 h',
    hours: [5, 7],
    from: '320 zł',
    description:
      'Boho braids, Fulani bohemian, goddess braids, and cornrows with extensions.',
  },
  {
    slug: 'mens-cornrows',
    image: '/img/stitch-braids.jpg',
    title: 'Men’s Cornrows',
    duration: '2–3 h',
    hours: [2, 3],
    from: '160 zł',
    description: 'Basic cornrows, stitch, design cornrows, and cornrows with twists.',
  },
] as const

/** The studio's published price list, verbatim. */
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
        name: 'Interlock Hook Maintenance',
        meta: null,
        tiers: [
          ['Skin Fade', '200 zł'],
          ['Taper Fade', '210 zł'],
          ['+ Style', '230 zł'],
        ],
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
        name: 'With Gel',
        meta: 'comb coil',
        tiers: [
          ['Skin Fade', '200 zł'],
          ['Taper Fade', '210 zł'],
          ['+ Simple Style', '240 zł'],
        ],
      },
      {
        name: 'Twist Starter Locs',
        meta: null,
        tiers: [
          ['Skin Fade', '180 zł'],
          ['Taper Fade', '195 zł'],
          ['+ Style', '220 zł'],
        ],
      },
      {
        name: 'Instant Locs',
        meta: '5–6 hrs',
        tiers: [
          ['Skin Fade', '230 zł'],
          ['Taper Fade', '+ 45 zł per hr'],
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
        tiers: [
          ['Medium', 'from 380 zł'],
          ['Waist length', '410 zł'],
        ],
      },
      {
        name: 'Fulani Bohemian',
        meta: null,
        tiers: [
          ['Medium', 'from 390 zł'],
          ['Waist length', '410 zł'],
        ],
      },
      {
        name: 'Goddess Braids',
        meta: null,
        tiers: [
          ['Medium', 'from 320 zł'],
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
      { name: 'Basic Cornrows', meta: null, tiers: [['', '160 zł']] },
      { name: 'Stitch', meta: 'base price', tiers: [['', '200 zł']] },
      { name: 'Design Cornrows', meta: null, tiers: [['', '220 zł']] },
      { name: 'Cornrows & Twists', meta: null, tiers: [['', '185 zł']] },
    ],
  },
] as const

export const priceNotes = [
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
