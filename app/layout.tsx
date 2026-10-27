import type { Metadata, Viewport } from 'next'
import { hanken, bodoni } from '@/lib/fonts'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { LenisProvider } from '@/components/layout/LenisProvider'
import { SiteChrome } from '@/components/layout/SiteChrome'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kulama Hair Care | Locs and braids in Wrocław',
  description:
    'Loc maintenance, starter locs, women’s braids and men’s cornrows at Pl. Grunwaldzki, Wrocław. See prices and book online.',
  metadataBase: new URL('https://braidss.xyz'),
  openGraph: {
    title: 'Kulama Hair Care | Locs and braids in Wrocław',
    description:
      'Premium African braiding artistry in Wrocław. Book your style at Pl. Grunwaldzki.',
    type: 'website',
    locale: 'en_GB',
  },
}

export const viewport: Viewport = {
  themeColor: '#1C100A',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${hanken.variable} ${bodoni.variable}`}
    >
      <body className="bg-[var(--color-paper)] text-[var(--color-ink-900)] antialiased">
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
