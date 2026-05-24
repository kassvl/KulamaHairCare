import { brand } from '@/lib/data'

export const services = [
  {
    slug: 'box-braids',
    title: 'Box Braids',
    duration: '4–6 h',
    from: '€90',
    description:
      'Classic, square-parted protective braids — sized to your taste, lengths from shoulder to waist. The KULAMA signature.',
  },
  {
    slug: 'cornrows',
    title: 'Cornrows',
    duration: '2–3 h',
    from: '€55',
    description:
      'Tight, sculptural rows hand-laid against the scalp. Great as a statement style or as a base for protective extensions.',
  },
  {
    slug: 'knotless-braids',
    title: 'Knotless Braids',
    duration: '5–7 h',
    from: '€110',
    description:
      'A gentler take on box braids — feed-in technique that lifts tension off the scalp for a longer-lasting, weightless finish.',
  },
  {
    slug: 'twist-styles',
    title: 'Twist Styles',
    duration: '3–5 h',
    from: '€80',
    description:
      'Senegalese twists, passion twists and Marley twists. Soft, romantic texture with the same protective benefits.',
  },
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
    headline: '€20 off your re-twist',
    description: 'Return within eight weeks of your last visit for a re-twist or edge refresh — €20 comes off.',
    badge: 'LOYALTY',
  },
] as const

export const galleryItems = [
  { caption: 'Knotless · waist length', tag: 'Knotless' },
  { caption: 'Cornrow crown · gold cuffs', tag: 'Cornrows' },
  { caption: 'Box braids · jumbo', tag: 'Box braids' },
  { caption: 'Senegalese twist · honey', tag: 'Twists' },
  { caption: 'Stitch braids · sculpted', tag: 'Cornrows' },
  { caption: 'Knotless ombre · cinnamon', tag: 'Knotless' },
] as const

export type Service = (typeof services)[number]
export type Offer = (typeof offers)[number]
export type GalleryItem = (typeof galleryItems)[number]

export { brand }
