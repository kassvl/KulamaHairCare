import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { BookingFlow } from '@/components/booking/BookingFlow'
import { bookableDates } from '@/lib/appointments'

// Bookable dates roll forward with the calendar, so this page can't be static.
export const dynamic = 'force-dynamic'

export default function BookingPage() {
  return (
    <>
      <Section
        eyebrow="reservation"
        title={
          <>
            Book your <span className="font-script not-italic text-[var(--color-brand-clay)]">seat</span>.
          </>
        }
        description="Choose a style, pick a slot — we’ll confirm by email within 24 hours."
        className="pt-40 md:pt-44"
      >
        <BookingFlow dates={bookableDates()} />
      </Section>

      <BackCTA />
    </>
  )
}

function BackCTA() {
  return (
    <Section
      eyebrow="elsewhere"
      title="Browse the rest."
      description="Looking for inspiration first? These pages might help."
    >
      <ul className="grid gap-3 md:grid-cols-3">
        {[
          ['Pricing', '/pricing'],
          ['Gallery', '/galeri'],
          ['About us', '/about-us'],
        ].map(([label, href]) => (
          <li key={href}>
            <Link
              href={href!}
              className="card flex items-center justify-between p-5 text-sm font-semibold"
            >
              {label}
              <ArrowUpRight size={16} />
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}
