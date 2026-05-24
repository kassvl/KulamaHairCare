export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Book Now', href: '/rezervasyon' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Gallery', href: '/galeri' },
  { label: 'Special Offers', href: '/special-offers' },
  { label: 'About', href: '/about-us' },
  { label: 'Contact', href: '/iletisim' },
] as const

export const brand = {
  name: 'KULAMA',
  fullName: 'KULAMA HAIR CARE & BRAIDS',
  tagline: 'Wrocław Based',
  address: 'Rynek 12/3, Wrocław, Poland',
  phone: '+48 000 000 000',
  email: 'info@kulama.com',
  instagram: 'https://instagram.com/kulama_braids',
  instagramHandle: '@kulama_braids',
  founded: 2021,
  stats: {
    clients: '500+',
    years: '5+',
    styles: 4,
  },
} as const
