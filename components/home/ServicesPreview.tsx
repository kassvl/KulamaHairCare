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
          Four ways to wear <span className="font-script not-italic text-[var(--color-brand-clay)]">KULAMA</span>.
        </>
      }
      description="Every appointment is tailored — these are the four families we keep returning to."
    >
      <ul className="grid gap-5 md:grid-cols-2">
        {services.map((s) => (
          <li key={s.slug} className="card group flex flex-col p-6 md:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="kbd">{s.duration}</p>
                <h3 className="mt-2 font-display text-2xl italic font-medium text-[var(--color-ink-900)] md:text-3xl">
                  {s.title}
                </h3>
              </div>
              <span className="font-script text-2xl text-[var(--color-brand-clay)]">{s.from}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-700)]">
              {s.description}
            </p>
            <div className="mt-6 flex items-center gap-3 border-t border-[rgba(58,27,20,0.1)] pt-4">
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
