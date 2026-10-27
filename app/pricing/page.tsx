import type { Metadata } from 'next'
import Link from 'next/link'
import { PriceLine } from '@/components/ui/PriceLine'
import { services, priceList, priceNotes } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Prices | Kulama Hair Care',
  description:
    'Prices in złoty for loc maintenance, starter locs, women’s braids and men’s cornrows at Kulama, Wrocław.',
}

/**
 * The price board. Dark ground, dotted leaders: the way a salon prints its
 * prices on the wall, so it reads at a glance on a phone.
 */
export default function PricingPage() {
  return (
    <>
      <section className="pb-14 pt-32 md:pb-20 md:pt-44">
        <div className="mx-auto max-w-[1480px] px-5 md:px-8">
          <h1 className="font-display text-[3.4rem] font-medium leading-[0.95] tracking-[-0.03em] md:text-[7rem]">
            Prices
          </h1>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-[var(--color-ink-700)]">
            All prices are in złoty. The final price depends on the style and length you
            choose.
          </p>

          <nav aria-label="Services" className="mt-10 flex flex-wrap gap-x-7 gap-y-3">
            {services.map((s) => (
              <a
                key={s.slug}
                href={`#${s.slug}`}
                className="text-sm font-semibold underline decoration-[rgba(35,20,13,0.3)] underline-offset-[6px] hover:decoration-[var(--color-brand-clay)]"
              >
                {s.label}
                <span className="ml-2 font-normal text-[var(--color-ink-500)]">from {s.from}</span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="bg-[var(--color-brand-deep)] text-[var(--color-paper)]">
        <div className="mx-auto grid max-w-[1480px] gap-x-20 gap-y-20 px-5 py-20 md:grid-cols-2 md:px-8 md:py-28">
          {priceList.map((group) => {
            const service = services.find((s) => s.title === group.group)
            return (
              <div key={group.group} id={service?.slug} className="scroll-mt-28">
                <div className="flex items-baseline justify-between gap-4 border-b border-[rgba(201,161,90,0.45)] pb-4">
                  <h2 className="font-display text-[2.1rem] font-medium leading-none tracking-[-0.02em] md:text-[2.75rem]">
                    {service?.label ?? group.group}
                  </h2>
                  {service && (
                    <p className="shrink-0 text-sm text-[rgba(241,232,216,0.6)]">
                      {service.duration.replace('h', 'hours')}
                    </p>
                  )}
                </div>

                <dl className="mt-7 space-y-5">
                  {group.items.map((item) =>
                    item.tiers.length === 1 && !item.tiers[0][0] ? (
                      <PriceLine
                        key={item.name}
                        name={item.name}
                        note={item.meta}
                        price={item.tiers[0][1]}
                        tone="dark"
                      />
                    ) : (
                      <div key={item.name}>
                        <dt className="text-[var(--color-paper)]">
                          {item.name}
                          {item.meta && (
                            <span className="ml-2 text-sm text-[rgba(241,232,216,0.55)]">
                              {item.meta}
                            </span>
                          )}
                        </dt>
                        <dd className="mt-2">
                          <dl className="space-y-1.5 border-l border-[rgba(201,161,90,0.25)] pl-4 text-[0.95rem]">
                            {item.tiers.map(([label, price], i) => (
                              <PriceLine
                                key={label || i}
                                name={label || 'Price'}
                                price={price}
                                tone="dark"
                              />
                            ))}
                          </dl>
                        </dd>
                      </div>
                    ),
                  )}
                </dl>
              </div>
            )
          })}
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-[1480px] gap-12 px-5 md:grid-cols-12 md:px-8">
          <div className="md:col-span-5">
            <h2 className="font-display text-[2.4rem] font-medium leading-[1.02] tracking-[-0.02em] md:text-[3.4rem]">
              Before you book
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <ul className="space-y-4 text-lg leading-relaxed text-[var(--color-ink-700)]">
              {priceNotes.map((note) => (
                <li key={note} className="border-b border-[rgba(35,20,13,0.14)] pb-4">
                  {note}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/rezervasyon" className="btn btn-primary">
                Book an appointment
              </Link>
              <Link href="/galeri" className="btn btn-ghost">
                See the work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
