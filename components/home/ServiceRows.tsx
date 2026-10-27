import Link from 'next/link'
import { LoopFilm } from '@/components/ui/LoopFilm'
import { Reveal } from '@/components/ui/Reveal'
import { PriceLine } from '@/components/ui/PriceLine'
import { services, priceList } from '@/lib/content'
import { cn } from '@/lib/utils'

/**
 * The four services the studio books by, each beside a clip of that exact
 * work being done. Prices are pulled from the price list so the home page can
 * never disagree with /pricing.
 */
export function ServiceRows() {
  return (
    <section id="services" className="scroll-mt-24 py-24 md:py-36">
      <div className="mx-auto max-w-[1480px] px-5 md:px-8">
        <Reveal className="max-w-[46rem]">
          <h2 className="font-display text-[2.6rem] font-medium leading-[1.02] tracking-[-0.02em] md:text-[4.25rem]">
            Four services, all done by hand.
          </h2>
          <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-[var(--color-ink-700)]">
            What each one costs and how long it takes. Book online, or open the
            full price list for every length and finish.
          </p>
        </Reveal>

        <ol className="mt-16 md:mt-24">
          {services.map((s, i) => {
            const group = priceList.find((g) => g.group === s.title)
            const lines = (group?.items ?? []).slice(0, 4).map((item) => ({
              name: item.name,
              price: item.tiers[0][1],
            }))
            const flip = i % 2 === 1

            return (
              <li
                key={s.slug}
                className="grid items-center gap-8 border-t border-[rgba(35,20,13,0.16)] py-12 md:grid-cols-12 md:gap-12 md:py-16"
              >
                <div
                  className={cn(
                    'relative aspect-[4/5] overflow-hidden rounded-[3px] bg-[var(--color-paper-2)] md:col-span-5',
                    flip && 'md:order-2 md:col-start-8',
                  )}
                >
                  <LoopFilm src={s.film} poster={s.poster} />
                </div>

                <div
                  className={cn(
                    'md:col-span-6',
                    flip ? 'md:order-1 md:col-start-1' : 'md:col-start-7',
                  )}
                >
                  <h3 className="font-display text-[2.2rem] font-medium leading-none tracking-[-0.02em] md:text-[3.4rem]">
                    {s.label}
                  </h3>
                  <p className="mt-4 max-w-[48ch] leading-relaxed text-[var(--color-ink-700)]">
                    {s.description}
                  </p>
                  <p className="mt-3 text-sm text-[var(--color-ink-500)]">
                    Allow {s.duration.replace('h', 'hours')} in the chair.
                  </p>

                  <dl className="mt-8 max-w-[30rem] space-y-3">
                    {lines.map((l) => (
                      <PriceLine key={l.name} name={l.name} price={l.price} />
                    ))}
                  </dl>

                  <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <Link href={`/rezervasyon?service=${s.slug}`} className="btn btn-primary">
                      Book this service
                    </Link>
                    <Link
                      href={`/pricing#${s.slug}`}
                      className="text-sm font-semibold text-[var(--color-ink-900)] underline decoration-[rgba(35,20,13,0.3)] underline-offset-[6px] transition-colors hover:decoration-[var(--color-brand-clay)]"
                    >
                      All {s.label.toLowerCase()} prices
                    </Link>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
