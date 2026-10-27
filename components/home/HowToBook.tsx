import Link from 'next/link'
import { Instagram, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { brand } from '@/lib/data'

const steps = [
  {
    title: 'Pick a service and a start time',
    body: 'The booking form only offers times that leave enough hours for the style you chose.',
  },
  {
    title: 'The studio confirms',
    body: 'Michelle accepts your request or suggests another time. A private link shows where it stands.',
  },
  {
    title: 'Come to the studio',
    body: 'The studio is at Pl. Grunwaldzki. Extensions and curls are not provided, so bring your own.',
  },
] as const

const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(brand.address)}`

/**
 * How booking works, then where to go. Booking is a genuine sequence, so the
 * steps carry numbers; the visit block below is reference and does not.
 */
export function HowToBook() {
  return (
    <section className="bg-[var(--color-brand-deep)] text-[var(--color-paper)]">
      <div className="mx-auto max-w-[1480px] px-5 py-24 md:px-8 md:py-36">
        <Reveal className="grid gap-14 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <h2 className="font-display text-[2.6rem] font-medium leading-[1.02] tracking-[-0.02em] md:text-[4.25rem]">
              How booking works.
            </h2>
            <p className="mt-5 max-w-[40ch] text-lg leading-relaxed text-[rgba(241,232,216,0.75)]">
              Book online in a couple of minutes, or message the studio if you would
              rather talk it through first.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/rezervasyon" className="btn btn-light">
                Book an appointment
              </Link>
              <a
                href={brand.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-light"
              >
                <Instagram size={16} aria-hidden /> Message on Instagram
              </a>
            </div>
          </div>

          <ol className="md:col-span-6 md:col-start-7">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="grid grid-cols-[3rem_1fr] gap-x-4 border-t border-[rgba(201,161,90,0.3)] py-7 first:border-t-0 first:pt-0 md:py-8"
              >
                <span className="font-display text-3xl leading-none text-[var(--color-brand-gold)]">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 max-w-[46ch] leading-relaxed text-[rgba(241,232,216,0.72)]">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="mt-24 grid gap-10 border-t border-[rgba(201,161,90,0.3)] pt-12 md:mt-32 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-sm text-[rgba(241,232,216,0.6)]">The studio</p>
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-start gap-3 font-display text-3xl font-medium leading-tight decoration-[rgba(201,161,90,0.6)] underline-offset-[8px] hover:underline md:text-[2.6rem]"
            >
              <MapPin size={26} aria-hidden className="mt-1.5 shrink-0 text-[var(--color-brand-gold)]" />
              {brand.address.replace(', Poland', '')}
            </a>
          </div>
          <ul className="grid gap-5 self-end text-[rgba(241,232,216,0.85)] sm:grid-cols-3 md:col-span-6 md:col-start-7">
            <li>
              <p className="text-sm text-[rgba(241,232,216,0.55)]">Phone</p>
              <a href={`tel:${brand.phone.replace(/\s+/g, '')}`} className="mt-1 inline-flex items-center gap-2 hover:text-[var(--color-paper)]">
                <Phone size={15} aria-hidden /> {brand.phone}
              </a>
            </li>
            <li>
              <p className="text-sm text-[rgba(241,232,216,0.55)]">WhatsApp</p>
              <a
                href={`https://wa.me/${brand.phone.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-2 hover:text-[var(--color-paper)]"
              >
                <MessageCircle size={15} aria-hidden /> Send a message
              </a>
            </li>
            <li>
              <p className="text-sm text-[rgba(241,232,216,0.55)]">Instagram</p>
              <a
                href={brand.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-2 hover:text-[var(--color-paper)]"
              >
                <Instagram size={15} aria-hidden /> {brand.instagramHandle}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
