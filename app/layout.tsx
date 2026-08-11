import type { Metadata, Viewport } from 'next'
import { inter, cormorant, caveat } from '@/lib/fonts'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { LenisProvider } from '@/components/layout/LenisProvider'
import { SiteChrome } from '@/components/layout/SiteChrome'
import './globals.css'

export const metadata: Metadata = {
  title: 'KULAMA · Wrocław Hair Care & Braids',
  description:
    'KULAMA — premium locs and braiding artistry in Wrocław. Loc maintenance, starter locs, women’s braids and men’s cornrows by expert stylists.',
  metadataBase: new URL('https://braidss.xyz'),
  openGraph: {
    title: 'KULAMA · Wrocław Hair Care & Braids',
    description:
      'Premium African braiding artistry in Wrocław. Book your style at Pl. Grunwaldzki.',
    type: 'website',
    locale: 'en_GB',
  },
}

export const viewport: Viewport = {
  themeColor: '#F4ECE2',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${caveat.variable}`}
    >
      <body className="bg-paper-grain text-[var(--color-ink-900)] antialiased">
        <SiteChrome
          chrome={<LenisProvider />}
          navbar={<Navbar />}
          footer={<Footer />}
        >
          {children}
        </SiteChrome>
      </body>
    </html>
  )
}
