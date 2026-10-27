import Link from 'next/link'
import { brand, nav } from '@/lib/data'

export function Footer() {
  return (
    <footer className="relative bg-[var(--color-brand-deep)] text-[var(--color-paper)]">
      <div className="mx-auto max-w-[1480px] px-5 pb-32 pt-16 md:px-8 lg:pb-14">
        <div className="grid gap-12 border-t border-[rgba(201,161,90,0.3)] pt-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="font-display text-6xl font-medium leading-none tracking-[-0.03em] md:text-7xl">
              Kulama
            </p>
            <p className="mt-4 max-w-[36ch] text-[rgba(241,232,216,0.7)]">
              Hair care and braids by appointment, at {brand.address.replace(', Poland', '')}.
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <ul className="space-y-2.5 text-[rgba(241,232,216,0.85)]">
              {nav.slice(1).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-[var(--color-paper)] hover:underline underline-offset-4">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="space-y-2.5 text-[rgba(241,232,216,0.85)] md:col-span-3">
            <li>
              <a href={`tel:${brand.phone.replace(/\s+/g, '')}`} className="hover:text-[var(--color-paper)]">
                {brand.phone}
              </a>
            </li>
            <li>
              <a
                href={brand.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-paper)]"
              >
                Instagram {brand.instagramHandle}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${brand.phone.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-paper)]"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>

        <p className="mt-16 text-sm text-[rgba(241,232,216,0.5)]">
          © {new Date().getFullYear()} Kulama Hair Care &amp; Braids, Wrocław
        </p>
      </div>
    </footer>
  )
}
