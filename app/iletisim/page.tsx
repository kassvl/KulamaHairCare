import { Instagram, Mail, MapPin, Phone } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { brand } from '@/lib/data'

export default function ContactPage() {
  return (
    <>
      <Section
        eyebrow="contact"
        title={
          <>
            Come say <span className="font-script not-italic text-[var(--color-brand-clay)]">hello</span>.
          </>
        }
        description="We&rsquo;re happy with email, message, voice — whichever feels easiest to you."
        className="pt-40 md:pt-44"
      >
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="space-y-3 lg:col-span-5">
            <Channel
              icon={<MapPin size={16} />}
              label="Studio"
              value={brand.address}
            />
            <Channel
              icon={<Phone size={16} />}
              label="Phone"
              value={brand.phone}
              href={`tel:${brand.phone.replace(/\s+/g, '')}`}
            />
            <Channel
              icon={<Mail size={16} />}
              label="Email"
              value={brand.email}
              href={`mailto:${brand.email}`}
            />
            <Channel
              icon={<Instagram size={16} />}
              label="Instagram"
              value={brand.instagramHandle}
              href={brand.instagram}
              external
            />
          </div>

          <form className="card flex flex-col gap-4 p-6 md:p-7 lg:col-span-7">
            <Field label="Your name" placeholder="First &amp; last" />
            <Field label="Email" placeholder="you@example.com" type="email" />
            <Field label="Subject" placeholder="Booking · Question · Press · …" />
            <Field
              label="Message"
              placeholder="Tell us what you&rsquo;d like."
              multiline
            />
            <button className="btn btn-primary mt-2 self-start">Send message</button>
            <p className="text-xs text-[var(--color-ink-500)]">
              We reply within 24 hours, weekdays.
            </p>
          </form>
        </div>
      </Section>

      <Section
        eyebrow="hours"
        title="When you&rsquo;ll find us."
      >
        <ul className="grid max-w-md gap-2 text-sm">
          {[
            ['Tuesday – Friday', '09:00 – 19:00'],
            ['Saturday', '10:00 – 17:00'],
            ['Sunday – Monday', 'Closed'],
          ].map(([day, hours]) => (
            <li
              key={day}
              className="flex items-center justify-between rounded-2xl border border-[rgba(58,27,20,0.12)] bg-[var(--color-paper)] px-4 py-3"
            >
              <span>{day}</span>
              <span className="font-mono text-[var(--color-ink-700)]">{hours}</span>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}

function Channel({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
  external?: boolean
}) {
  const inner = (
    <div className="card flex items-center gap-4 p-4 transition-colors">
      <span className="grid h-10 w-10 place-items-center rounded-2xl border border-[rgba(58,27,20,0.15)] bg-[var(--color-paper-2)] text-[var(--color-brand-clay)]">
        {icon}
      </span>
      <div>
        <p className="kbd">{label}</p>
        <p className="mt-0.5 font-display text-lg italic text-[var(--color-ink-900)]">
          {value}
        </p>
      </div>
    </div>
  )
  if (!href) return inner
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="block"
    >
      {inner}
    </a>
  )
}

function Field({
  label,
  placeholder,
  type,
  multiline,
}: {
  label: string
  placeholder?: string
  type?: string
  multiline?: boolean
}) {
  return (
    <label className="block">
      <span className="kbd">{label}</span>
      <div className="mt-1.5">
        {multiline ? (
          <textarea
            rows={5}
            placeholder={placeholder}
            className="w-full resize-none rounded-2xl border border-[rgba(58,27,20,0.15)] bg-[var(--color-paper)] px-4 py-3 text-sm text-[var(--color-ink-900)] placeholder:text-[var(--color-ink-500)] focus:border-[var(--color-brand-clay)] focus:outline-none"
          />
        ) : (
          <input
            type={type ?? 'text'}
            placeholder={placeholder}
            className="w-full rounded-2xl border border-[rgba(58,27,20,0.15)] bg-[var(--color-paper)] px-4 py-3 text-sm text-[var(--color-ink-900)] placeholder:text-[var(--color-ink-500)] focus:border-[var(--color-brand-clay)] focus:outline-none"
          />
        )}
      </div>
    </label>
  )
}
