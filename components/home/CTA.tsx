import Link from 'next/link'
import { ArrowUpRight, Calendar } from 'lucide-react'

export function CTA() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="card relative overflow-hidden bg-[var(--color-brand-deep)] p-10 text-[var(--color-paper)] md:p-16">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="kbd text-[var(--color-brand-gold)]">your appointment</p>
              <h2 className="mt-3 font-display text-4xl italic font-medium leading-[1.05] tracking-tight md:text-6xl">
                Time to get your <span className="font-script not-italic text-[var(--color-brand-gold)]">dream</span> hair.
              </h2>
              <p className="mt-5 max-w-md text-[rgba(244,236,226,0.75)] md:text-lg">
                Meet our team in Wrocław and create your appointment in minutes. We handle the rest.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 md:items-end">
              <Link
                href="/rezervasyon"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-paper)] px-6 py-3 text-sm font-semibold text-[var(--color-ink-900)] transition-transform hover:-translate-y-0.5"
              >
                <Calendar size={16} /> Get appointment
              </Link>
              <Link
                href="/galeri"
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(244,236,226,0.3)] px-6 py-3 text-sm font-semibold text-[var(--color-paper)] transition-colors hover:bg-[rgba(244,236,226,0.08)]"
              >
                View our work <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
