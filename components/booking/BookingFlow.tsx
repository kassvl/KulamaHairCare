'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { AlertCircle, ArrowUpRight, CalendarDays, Clock4, Loader2, MapPin } from 'lucide-react'
import { services, brand } from '@/lib/content'
import {
  formatSlotDate,
  slotsFor,
  toISODate,
  type BookingInput,
  type Overrides,
} from '@/lib/appointments'

type FieldErrors = Partial<Record<keyof BookingInput, string>>

export function BookingFlow({ dates }: { dates: string[] }) {
  const router = useRouter()

  const [style, setStyle] = useState<string>(services[0]!.slug)
  const [date, setDate] = useState<string>(dates[0] ?? '')
  const [time, setTime] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', note: '', company: '' })
  const [taken, setTaken] = useState<Record<string, string[]>>({})
  const [overrides, setOverrides] = useState<Overrides>({})
  const [errors, setErrors] = useState<FieldErrors>({})
  const [failure, setFailure] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const service = services.find((s) => s.slug === style)!

  // A day the studio opened by hand won't be in the server-rendered list.
  const allDates = useMemo(() => {
    const today = toISODate(new Date())
    const opened = Object.entries(overrides)
      .filter(([, slots]) => Object.values(slots).includes('open'))
      .map(([d]) => d)
    return [...new Set([...dates, ...opened])].filter((d) => d > today).sort()
  }, [dates, overrides])

  const timesForDay = useMemo(
    () => (date ? slotsFor(date, style, overrides) : []),
    [date, style, overrides],
  )

  useEffect(() => {
    let cancelled = false
    fetch('/api/appointments')
      .then((r) => (r.ok ? r.json() : { taken: {}, overrides: {} }))
      .then((d) => {
        if (cancelled) return
        setTaken(d.taken ?? {})
        setOverrides(d.overrides ?? {})
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  // A longer style can push the chosen start time past closing — drop it.
  useEffect(() => {
    if (time && !timesForDay.includes(time)) setTime(null)
  }, [timesForDay, time])

  const isTaken = (slot: string) => taken[date]?.includes(slot) ?? false

  async function submit() {
    setSubmitting(true)
    setErrors({})
    setFailure(null)

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceSlug: style,
          date,
          time,
          name: form.name,
          email: form.email,
          phone: form.phone,
          note: form.note,
          company: form.company,
        }),
      })
      const data = await response.json().catch(() => ({}))

      if (response.status === 201) {
        router.push(`/rezervasyon/${data.token}`)
        return
      }
      if (data.errors) setErrors(data.errors)
      else setFailure(data.error ?? 'Something went wrong. Please try again.')
    } catch {
      setFailure('We could not reach the studio. Check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="min-w-0 lg:col-span-7">
        {/* ── Step 01 ─────────────────────────────────────────────── */}
        <p className="kbd">Step 01 · Style</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {services.map((s) => {
            const active = style === s.slug
            return (
              <li key={s.slug}>
                <button
                  type="button"
                  onClick={() => setStyle(s.slug)}
                  aria-pressed={active}
                  className={
                    'card group flex w-full items-start justify-between p-5 text-left transition-all ' +
                    (active ? 'border-[var(--color-brand-clay)] bg-[var(--color-paper-2)]' : '')
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

        {/* ── Step 02 ─────────────────────────────────────────────── */}
        <p className="kbd mt-10">Step 02 · Slot</p>

        <div className="mt-4 -mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-2">
          {allDates.map((d) => {
            const active = date === d
            return (
              <button
                key={d}
                type="button"
                onClick={() => setDate(d)}
                aria-pressed={active}
                className={
                  'shrink-0 snap-start rounded-2xl border px-4 py-3 text-left transition-all ' +
                  (active
                    ? 'border-[var(--color-ink-900)] bg-[var(--color-ink-900)] text-[var(--color-paper)]'
                    : 'border-[rgba(58,27,20,0.15)] hover:border-[rgba(58,27,20,0.35)]')
                }
              >
                <p className={'kbd whitespace-nowrap ' + (active ? 'text-[var(--color-brand-gold)]' : '')}>
                  {formatSlotDate(d)}
                </p>
              </button>
            )
          })}
        </div>

        {timesForDay.length === 0 ? (
          <p className="mt-3 text-sm text-[var(--color-ink-500)]">
            No start time on this day leaves us enough hours for {service.title}. Try another
            date, or pick a shorter style.
          </p>
        ) : (
          <ul className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
            {timesForDay.map((t) => {
              const active = time === t
              const gone = isTaken(t)
              return (
                <li key={t}>
                  <button
                    type="button"
                    disabled={gone}
                    onClick={() => setTime(t)}
                    aria-pressed={active}
                    className={
                      'w-full rounded-xl border py-2.5 text-center font-display text-lg italic transition-all ' +
                      (gone
                        ? 'cursor-not-allowed border-[rgba(58,27,20,0.08)] text-[var(--color-ink-300)] line-through'
                        : active
                          ? 'border-[var(--color-ink-900)] bg-[var(--color-ink-900)] text-[var(--color-paper)]'
                          : 'border-[rgba(58,27,20,0.15)] text-[var(--color-ink-900)] hover:border-[rgba(58,27,20,0.35)]')
                    }
                  >
                    {t}
                  </button>
                </li>
              )
            })}
          </ul>
        )}
        {(errors.date || errors.time) && (
          <FieldError>{errors.date ?? errors.time}</FieldError>
        )}

        {/* ── Step 03 ─────────────────────────────────────────────── */}
        <p className="kbd mt-10">Step 03 · You</p>
        <form
          className="mt-4 grid gap-4 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault()
            void submit()
          }}
        >
          <Field
            label="Your name"
            placeholder="First &amp; last name"
            value={form.name}
            onChange={(v) => setForm({ ...form, name: v })}
            error={errors.name}
            autoComplete="name"
          />
          <Field
            label="Email"
            placeholder="you@example.com"
            type="email"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
            error={errors.email}
            autoComplete="email"
          />
          <Field
            label="Phone"
            placeholder="+48 ..."
            type="tel"
            className="sm:col-span-2"
            value={form.phone}
            onChange={(v) => setForm({ ...form, phone: v })}
            error={errors.phone}
            autoComplete="tel"
          />
          <Field
            label="Anything we should know?"
            placeholder="Hair length, allergies, references…"
            multiline
            className="sm:col-span-2"
            value={form.note}
            onChange={(v) => setForm({ ...form, note: v })}
          />

          {/* Honeypot — hidden from people, tempting to bots. */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="pointer-events-none absolute h-0 w-0 opacity-0"
          />

          {/* Keeps Enter-to-submit working; the visible control lives in the summary. */}
          <button type="submit" className="sr-only" tabIndex={-1} aria-hidden>
            Submit
          </button>
        </form>
      </div>

      {/* ── Summary ───────────────────────────────────────────────── */}
      <motion.aside
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="min-w-0 lg:col-span-5"
      >
        <div className="sticky top-28 card p-7">
          <p className="kbd">Summary</p>
          <p className="mt-3 font-display text-3xl italic">{service.title}</p>
          <ul className="mt-6 space-y-3 text-sm text-[var(--color-ink-700)]">
            <li className="flex items-center gap-2">
              <Clock4 size={14} />
              {service.duration}
            </li>
            <li className="flex items-center gap-2">
              <CalendarDays size={14} />
              {time ? `${formatSlotDate(date)} · ${time}` : 'Pick a time slot'}
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={14} />
              {brand.address}
            </li>
          </ul>

          {failure && (
            <>
              <FieldError>{failure}</FieldError>
              {/* Never let a failed save cost the studio a client. */}
              <a
                href={whatsappHref({
                  service: service.title,
                  date,
                  time,
                  name: form.name,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost mt-3 w-full justify-center"
              >
                Send this request on WhatsApp <ArrowUpRight size={16} />
              </a>
            </>
          )}

          <button
            type="button"
            onClick={() => void submit()}
            disabled={submitting}
            className="btn btn-primary mt-6 w-full justify-center disabled:opacity-60"
          >
            {submitting ? (
              <>
                Sending <Loader2 size={16} className="animate-spin" />
              </>
            ) : (
              <>
                Request appointment <ArrowUpRight size={16} />
              </>
            )}
          </button>
          <p className="mt-3 text-center font-script text-base text-[var(--color-brand-gold)]">
            we&rsquo;ll write back within 24 h
          </p>
        </div>
      </motion.aside>
    </div>
  )
}

/** Pre-fills the studio's WhatsApp with whatever the guest already chose. */
function whatsappHref({
  service,
  date,
  time,
  name,
}: {
  service: string
  date: string
  time: string | null
  name: string
}) {
  const slot = time ? `${formatSlotDate(date)} at ${time}` : 'a time that suits you'
  const who = name.trim() ? `${name.trim()} here. ` : ''
  const text = `Hi KULAMA — ${who}I'd like to book ${service} on ${slot}.`
  return `https://wa.me/${brand.phone.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`
}

function FieldError({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 flex items-start gap-1.5 text-sm text-[var(--color-brand-clay)]">
      <AlertCircle size={14} className="mt-0.5 shrink-0" />
      {children}
    </p>
  )
}

function Field({
  label,
  placeholder,
  type,
  multiline,
  className,
  value,
  onChange,
  error,
  autoComplete,
}: {
  label: string
  placeholder?: string
  type?: string
  multiline?: boolean
  className?: string
  value: string
  onChange: (value: string) => void
  error?: string
  autoComplete?: string
}) {
  const base =
    'w-full rounded-2xl border bg-[var(--color-paper)] px-4 py-3 text-sm text-[var(--color-ink-900)] placeholder:text-[var(--color-ink-500)] focus:outline-none ' +
    (error
      ? 'border-[var(--color-brand-clay)]'
      : 'border-[rgba(58,27,20,0.15)] focus:border-[var(--color-brand-clay)]')

  return (
    <label className={`block ${className ?? ''}`}>
      <span className="kbd">{label}</span>
      <div className="mt-1.5">
        {multiline ? (
          <textarea
            rows={4}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={base + ' resize-none'}
          />
        ) : (
          <input
            type={type ?? 'text'}
            placeholder={placeholder}
            value={value}
            autoComplete={autoComplete}
            onChange={(e) => onChange(e.target.value)}
            className={base}
          />
        )}
      </div>
      {error && (
        <span className="mt-1.5 block text-xs text-[var(--color-brand-clay)]">{error}</span>
      )}
    </label>
  )
}
