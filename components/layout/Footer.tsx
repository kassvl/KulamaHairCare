import Link from 'next/link'
import { Instagram, Mail, MapPin, Phone } from 'lucide-react'
import { brand, nav } from '@/lib/data'

export function Footer() {
  return (
    <footer className="relative mt-24 bg-[var(--color-brand-deep)] text-[var(--color-paper)]">
      <div className="mx-auto max-w-[1400px] px-6 py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-4xl italic md:text-5xl">{brand.name}.</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[rgba(244,236,226,0.7)]">
              Where traditional African braiding artistry meets modern Wrocław elegance.
              Premium hair care, by appointment.
            </p>
            <a
              href={brand.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-[rgba(244,236,226,0.25)] px-4 py-2 text-sm text-[var(--color-paper)] transition-colors hover:bg-[rgba(244,236,226,0.08)]"
            >
              <Instagram size={14} /> {brand.instagramHandle}
            </a>
          </div>

          <div className="md:col-span-3">
            <p className="kbd text-[var(--color-brand-gold)]">Visit</p>
            <ul className="mt-4 space-y-3 text-sm text-[rgba(244,236,226,0.85)]">
              {nav.slice(1, 6).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-[var(--color-paper)]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="kbd text-[var(--color-brand-gold)]">Contact</p>
            <ul className="mt-4 space-y-3 text-sm text-[rgba(244,236,226,0.85)]">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-1 shrink-0" />
                <span>{brand.address}</span>
              </li>
              <li>
                <a href={`tel:${brand.phone.replace(/\s+/g, '')}`} className="inline-flex items-center gap-2 hover:text-[var(--color-paper)]">
                  <Phone size={14} /> {brand.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${brand.email}`} className="inline-flex items-center gap-2 hover:text-[var(--color-paper)]">
                  <Mail size={14} /> {brand.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-[rgba(244,236,226,0.12)] pt-6 text-xs text-[rgba(244,236,226,0.55)] md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} {brand.fullName}. All rights reserved.</p>
          <p className="font-script text-base text-[var(--color-brand-gold)]">crafted with care · Wrocław</p>
        </div>
      </div>
    </footer>
  )
}
