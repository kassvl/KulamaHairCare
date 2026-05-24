import { Section } from '@/components/ui/Section'
import { brand } from '@/lib/data'

export default function AboutPage() {
  return (
    <>
      <Section
        eyebrow="about"
        title={
          <>
            A studio for <span className="font-script not-italic text-[var(--color-brand-clay)]">braids</span> and the people who wear them.
          </>
        }
        description={
          <>
            KULAMA started in {brand.founded} as a chair, a mirror and a stack of synthetic fibre on a quiet Wrocław street. Five years on, it&rsquo;s a studio — but the chair, the mirror, and the obsession with detail haven&rsquo;t moved.
          </>
        }
        className="pt-40 md:pt-44"
      >
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="space-y-5 text-base leading-relaxed text-[var(--color-ink-700)] lg:col-span-7">
            <p>
              We specialise in protective styling — box braids, knotless braids, cornrows and twists in the African tradition, adapted for the rhythm of European life. Whether it&rsquo;s your first set or your fifteenth, the conversation begins with your scalp, your tension tolerance, and the way you want to feel walking back out into Rynek.
            </p>
            <p>
              The studio is small on purpose. We take one client at a time, set the table for them, and don&rsquo;t hurry the parting. Synthetic fibre is sourced from the same supplier we&rsquo;ve trusted since the beginning. Cleansing and aftercare guidance comes home with you.
            </p>
            <p>
              We&rsquo;re also a quiet space. If you need a slow morning, a long appointment, or a chair where no one will ask you to small-talk, we&rsquo;ve got you. Bring a book. Bring an album. Bring nothing — that&rsquo;s also welcome.
            </p>
          </div>

          <aside className="space-y-5 lg:col-span-5">
            <Stat label="Years of practice" value={brand.stats.years} />
            <Stat label="Happy clients" value={brand.stats.clients} />
            <Stat label="Signature styles" value={String(brand.stats.styles)} />
            <Stat label="Studio" value={brand.address} small />
          </aside>
        </div>
      </Section>

      <Section
        eyebrow="values"
        title="What stays the same."
      >
        <ul className="grid gap-4 md:grid-cols-3">
          {[
            ['Patience', 'No rushed partings. No rushed conversations.'],
            ['Tradition', 'African braiding heritage, kept honest.'],
            ['Comfort', 'Tension you can wear for weeks, not days.'],
          ].map(([t, b]) => (
            <li key={t} className="card p-6">
              <p className="font-display text-3xl italic font-medium">{t}</p>
              <p className="mt-2 text-sm text-[var(--color-ink-700)]">{b}</p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}

function Stat({ label, value, small }: { label: string; value: string; small?: boolean }) {
  return (
    <div className="card p-6">
      <p className="kbd">{label}</p>
      <p
        className={
          'mt-2 font-display italic ' +
          (small
            ? 'text-xl text-[var(--color-ink-900)]'
            : 'stat-number')
        }
      >
        {value}
      </p>
    </div>
  )
}
