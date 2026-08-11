import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Info } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { services, priceList, priceNotes } from '@/lib/content'

export default function PricingPage() {
  return (
    <>
      <Section
        eyebrow="pricing"
        title={
          <>
            Honest, hand-laid{' '}
            <span className="font-script not-italic pe-3 text-[var(--color-brand-clay)]">
              prices
            </span>
            .
          </>
        }
        description="Starting prices below cover most of our requests. Final quote is confirmed at consultation — extras (length, density, embellishments) are itemised before we begin."
        className="pt-40 md:pt-44"
      >
        {/* The four families, as a way in */}
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <li key={s.slug} className="tile group aspect-[4/5]">
              <Image
                src={s.image}
                alt={s.title}
                fill
                sizes="(min-width: 1024px) 22vw, (min-width: 768px) 45vw, 90vw"
                className="tile-media object-cover"
                priority={i < 2}
              />
              <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[rgba(0,0,0,0.78)] to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <span className="index-numeral">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-display text-2xl italic font-medium text-[var(--color-paper)]">
                  {s.title}
                </h3>
                <p className="mt-1 flex items-baseline gap-3">
                  <span className="font-script text-2xl text-[var(--color-brand-gold)]">
                    from {s.from}
                  </span>
                  <span className="text-[0.68rem] uppercase tracking-[0.2em] text-[rgba(244,236,226,0.7)]">
                    {s.duration}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {priceList.map((group) => (
        <Section
          key={group.group}
          eyebrow={group.meta ?? 'price list'}
          title={group.group}
          className="py-16 md:py-20"
        >
          <ul className="grid gap-4 md:grid-cols-2">
            {group.items.map((item) => (
              <li key={item.name} className="card p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-2xl italic font-medium text-[var(--color-ink-900)]">
                    {item.name}
                  </h3>
                  {item.meta && <span className="kbd shrink-0">{item.meta}</span>}
                </div>

                <dl className="mt-4 space-y-1.5">
                  {item.tiers.map(([label, price], i) => (
                    <div
                      key={label || i}
                      className="flex items-baseline gap-3 border-b border-dotted border-[rgba(58,27,20,0.18)] pb-1.5 last:border-0"
                    >
                      <dt className="text-sm text-[var(--color-ink-700)]">{label || 'Price'}</dt>
                      <span className="flex-1" />
                      <dd className="font-display text-lg italic text-[var(--color-brand-clay)]">
                        {price}
                      </dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ul>
        </Section>
      ))}

      <Section
        eyebrow="good to know"
        title="Before you book."
        description="Two things worth knowing, so the price you see is the price you pay."
      >
        <ul className="grid gap-3 md:grid-cols-2">
          {priceNotes.map((note) => (
            <li key={note} className="card flex items-start gap-3 p-5">
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--color-brand-gold)] text-[var(--color-ink-900)]">
                <Info size={14} />
              </span>
              <span className="text-sm">{note}</span>
            </li>
          ))}
        </ul>

        <Link href="/rezervasyon" className="btn btn-primary mt-8">
          Request an appointment <ArrowUpRight size={16} />
        </Link>
      </Section>
    </>
  )
}
