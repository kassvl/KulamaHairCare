'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, CalendarDays, Clock4, MapPin } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { services, brand } from '@/lib/content'

const slots = [
  { date: 'Tue · 27 May', time: '10:00' },
  { date: 'Tue · 27 May', time: '14:30' },
  { date: 'Wed · 28 May', time: '11:00' },
  { date: 'Thu · 29 May', time: '16:00' },
  { date: 'Fri · 30 May', time: '09:30' },
  { date: 'Sat · 31 May', time: '12:00' },
]

export default function BookingPage() {
  const [style, setStyle] = useState<string>(services[0]!.slug)
  const [slot, setSlot] = useState<number | null>(null)

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
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="kbd">Step 01 · Style</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {services.map((s) => {
                const active = style === s.slug
                return (
                  <li key={s.slug}>
                    <button
                      onClick={() => setStyle(s.slug)}
                      className={
                        'card group flex w-full items-start justify-between p-5 text-left transition-all ' +
                        (active
                          ? 'border-[var(--color-brand-clay)] bg-[var(--color-paper-2)]'
                          : '')
                      }
                    >
                      <div>
                        <p className="kbd">{s.duration}</p>
                        <p className="mt-1 font-display text-xl italic font-medium text-[var(--color-ink-900)]">
                          {s.title}
                        </p>
                      </div>
                      <span className="font-script text-2xl text-[var(--color-brand-clay)]">{s.from}</span>
                    </button>
                  </li>
                )
              })}
            </ul>

            <p className="kbd mt-10">Step 02 · Slot</p>
            <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {slots.map((sl, i) => {
                const active = slot === i
                return (
                  <li key={i}>
                    <button
                      onClick={() => setSlot(i)}
                      className={
                        'w-full rounded-2xl border p-3.5 text-left transition-all ' +
                        (active
                          ? 'border-[var(--color-ink-900)] bg-[var(--color-ink-900)] text-[var(--color-paper)]'
                          : 'border-[rgba(58,27,20,0.15)] hover:border-[rgba(58,27,20,0.35)]')
                      }
                    >
                      <p
                        className={
                          'kbd ' + (active ? 'text-[var(--color-brand-gold)]' : '')
                        }
                      >
                        {sl.date}
                      </p>
                      <p
                        className={
                          'mt-1.5 font-display text-lg italic ' +
                          (active ? '' : 'text-[var(--color-ink-900)]')
                        }
                      >
                        {sl.time}
                      </p>
                    </button>
                  </li>
                )
              })}
            </ul>

            <p className="kbd mt-10">Step 03 · You</p>
            <form className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Your name" placeholder="First &amp; last name" />
              <Field label="Email" placeholder="you@example.com" type="email" />
              <Field
                label="Phone"
                placeholder="+48 ..."
                className="sm:col-span-2"
              />
              <Field
                label="Anything we should know?"
                placeholder="Hair length, allergies, references…"
                multiline
                className="sm:col-span-2"
              />
            </form>
          </div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="sticky top-28 card p-7">
              <p className="kbd">Summary</p>
              <p className="mt-3 font-display text-3xl italic">{
                services.find((s) => s.slug === style)?.title ?? '—'
              }</p>
              <ul className="mt-6 space-y-3 text-sm text-[var(--color-ink-700)]">
                <li className="flex items-center gap-2">
                  <Clock4 size={14} />
                  {services.find((s) => s.slug === style)?.duration}
                </li>
                <li className="flex items-center gap-2">
                  <CalendarDays size={14} />
                  {slot !== null ? `${slots[slot]!.date} · ${slots[slot]!.time}` : 'Pick a time slot'}
                </li>
                <li className="flex items-center gap-2">
                  <MapPin size={14} />
                  {brand.address}
                </li>
              </ul>
              <button className="btn btn-primary mt-6 w-full justify-center">
                Request appointment <ArrowUpRight size={16} />
              </button>
              <p className="mt-3 text-center font-script text-base text-[var(--color-brand-gold)]">
                we’ll write back within 24 h
              </p>
            </div>
          </motion.aside>
        </div>
      </Section>

      <BackCTA />
    </>
  )
}

function Field({
  label,
  placeholder,
  type,
  multiline,
  className,
}: {
  label: string
  placeholder?: string
  type?: string
  multiline?: boolean
  className?: string
}) {
  return (
    <label className={`block ${className ?? ''}`}>
      <span className="kbd">{label}</span>
      <div className="mt-1.5">
        {multiline ? (
          <textarea
            rows={4}
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
