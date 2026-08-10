import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { services } from '@/lib/content'

export function ServicesPreview() {
  return (
    <Section
      id="services"
      eyebrow="signature styles"
      title={
        <>
          Four ways to wear{' '}
          <span className="font-script not-italic text-[var(--color-brand-clay)]">KULAMA</span>.
        </>
      }
      description="Every appointment is tailored — these are the four families we keep returning to."
    >
      <ul className="grid gap-6 md:grid-cols-2 lg:gap-8">
        {services.map((s, i) => (
          <li key={s.slug} className="group flex flex-col">
            <div className="tile relative aspect-[5/4] w-full">
              <Image
                src={s.image}
                alt={s.title}
                fill
                sizes="(min-width: 768px) 45vw, 90vw"
                className="tile-media object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[rgba(0,0,0,0.68)] to-transparent" />

              <span className="absolute left-5 top-5 rounded-full bg-[rgba(20,10,6,0.55)] px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-paper)] backdrop-blur-sm">
                {s.duration}
              </span>

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                <h3 className="font-display text-3xl italic font-medium text-[var(--color-paper)] md:text-4xl">
                  {s.title}
                </h3>
                <span className="font-script text-3xl text-[var(--color-brand-gold)]">{s.from}</span>
              </div>

              <span className="index-numeral absolute right-6 top-5">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-[var(--color-ink-700)]">
              {s.description}
            </p>

            <div className="mt-5 flex items-center gap-3 border-t border-[rgba(58,27,20,0.1)] pt-4">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-ink-900)] transition-colors hover:text-[var(--color-brand-clay)]"
              >
                See pricing <ArrowUpRight size={14} />
              </Link>
              <span className="text-[var(--color-ink-500)]">·</span>
              <Link
                href="/rezervasyon"
                className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-brand-clay)] transition-colors hover:text-[var(--color-ink-900)]"
              >
                Book this style <ArrowUpRight size={14} />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
