import Link from 'next/link'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { offers } from '@/lib/content'

export default function SpecialOffersPage() {
  return (
    <>
      <Section
        eyebrow="special offers"
        title={
          <>
            Small <span className="font-script not-italic text-[var(--color-brand-clay)]">extras</span>, big love.
          </>
        }
        description="Three rotating offers we keep open. Use them once, share them with a friend, then come back for the next one."
        className="pt-40 md:pt-44"
      >
        <ul className="grid gap-5 md:grid-cols-3">
          {offers.map((o) => (
            <li
              key={o.title}
              className="card relative flex h-full flex-col p-7"
            >
              <span className="kbd inline-flex items-center gap-1.5 self-start rounded-full border border-[var(--color-brand-gold)] bg-[rgba(217,164,65,0.12)] px-2.5 py-1 text-[var(--color-brand-clay)]">
                <Sparkles size={12} /> {o.badge}
              </span>
              <p className="kbd mt-5">{o.title}</p>
              <h3 className="mt-2 font-display text-3xl italic font-medium leading-tight text-[var(--color-ink-900)]">
                {o.headline}
              </h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--color-ink-700)]">
                {o.description}
              </p>
              <Link
                href="/rezervasyon"
                className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-brand-clay)] hover:text-[var(--color-ink-900)]"
              >
                Redeem at booking <ArrowUpRight size={14} />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        eyebrow="newsletter"
        title="First to hear about the next one."
        description="One short email per month — new offers, slot drops, the occasional studio story."
      >
        <form className="flex max-w-lg flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="you@example.com"
            className="flex-1 rounded-2xl border border-[rgba(58,27,20,0.15)] bg-[var(--color-paper)] px-4 py-3 text-sm focus:border-[var(--color-brand-clay)] focus:outline-none"
          />
          <button className="btn btn-primary justify-center">Subscribe</button>
        </form>
      </Section>
    </>
  )
}
