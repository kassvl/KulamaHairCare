import type { Metadata, Viewport } from 'next'
import { inter, cormorant, caveat } from '@/lib/fonts'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { LenisProvider } from '@/components/layout/LenisProvider'
import { CenterSeam } from '@/components/layout/CenterSeam'
import './globals.css'

export const metadata: Metadata = {
  title: 'KULAMA · Wrocław Hair Care & Braids',
  description:
    'KULAMA — premium African braiding artistry in Wrocław. Box braids, cornrows, knotless braids and twist styles by expert stylists.',
  metadataBase: new URL('https://braidss.xyz'),
  openGraph: {
    title: 'KULAMA · Wrocław Hair Care & Braids',
    description:
      'Premium African braiding artistry in Wrocław. Book your style at Rynek 12/3.',
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
        <LenisProvider />
        <CenterSeam />
        <Navbar />
        <main className="relative">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
