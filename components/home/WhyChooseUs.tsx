import { Section } from '@/components/ui/Section'

const items = [
  {
    title: 'Expert Stylists',
    body: 'Hands-on braiding artists with years of practice — every parting, every tension, intentional.',
  },
  {
    title: 'Easy Booking',
    body: 'Pick a style, pick a slot. Confirmations land in your inbox within 24 hours.',
  },
  {
    title: 'Flexible Hours',
    body: 'Mornings, evenings, weekends. We meet your calendar, not the other way around.',
  },
]

export function WhyChooseUs() {
  return (
    <Section
      eyebrow="why choose us"
      title={
        <>
          Excellence in <span className="font-script not-italic text-[var(--color-brand-clay)]">every</span> detail.
        </>
      }
      description="The studio runs on three quiet promises — they shape every hour you spend with us."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {items.map((it, i) => (
          <article key={it.title} className="card p-6 md:p-7">
            <p className="font-script text-2xl text-[var(--color-brand-gold)]">0{i + 1}</p>
            <h3 className="mt-2 font-display text-2xl italic font-medium text-[var(--color-ink-900)]">
              {it.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-700)]">
              {it.body}
            </p>
          </article>
        ))}
      </div>
    </Section>
  )
}
