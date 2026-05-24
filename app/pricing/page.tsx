import Link from 'next/link'
import { ArrowUpRight, Check } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { services } from '@/lib/content'

const lengthAdds = [
  ['Shoulder', '+ €0'],
  ['Mid-back', '+ €15'],
  ['Waist', '+ €30'],
  ['Hip', '+ €45'],
] as const

const includes = [
  'Consultation + scalp check',
  'Wash + light treatment if needed',
  'Premium synthetic fibre included',
  'Take-home aftercare leaflet',
  '7-day check-in by message',
]

export default function PricingPage() {
  return (
    <>
      <Section
        eyebrow="pricing"
        title={
          <>
            Honest, hand-laid <span className="font-script not-italic text-[var(--color-brand-clay)]">prices</span>.
          </>
        }
        description="Starting prices below cover most of our requests. Final quote is confirmed at consultation — extras (length, density, embellishments) are itemised before we begin."
        className="pt-40 md:pt-44"
      >
        <ul className="grid gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <li key={s.slug} className="card p-6 md:p-7">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="kbd">style 0{i + 1}</p>
                  <h3 className="mt-2 font-display text-3xl italic font-medium">
                    {s.title}
                  </h3>
                </div>
                <div className="text-right">
                  <p className="font-script text-3xl text-[var(--color-brand-clay)]">
                    {s.from}
                  </p>
                  <p className="kbd mt-1 text-[var(--color-ink-500)]">starting</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-700)]">
                {s.description}
              </p>
              <ul className="mt-5 grid grid-cols-2 gap-2">
                {lengthAdds.map(([label, add]) => (
                  <li
                    key={label}
                    className="flex items-center justify-between rounded-xl border border-[rgba(58,27,20,0.1)] bg-[var(--color-paper)] px-3 py-2 text-xs"
                  >
                    <span>{label}</span>
                    <span className="font-mono text-[var(--color-ink-700)]">{add}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 border-t border-[rgba(58,27,20,0.1)] pt-4">
                <Link
                  href="/rezervasyon"
                  className="btn btn-ghost"
                >
                  Book {s.title}
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        eyebrow="every appointment includes"
        title="What you get, every time."
        description="The same care, no matter the price tier."
      >
        <ul className="grid gap-3 md:grid-cols-2">
          {includes.map((line) => (
            <li
              key={line}
              className="card flex items-start gap-3 p-5"
            >
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--color-brand-gold)] text-[var(--color-ink-900)]">
                <Check size={14} />
              </span>
              <span className="text-sm">{line}</span>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
