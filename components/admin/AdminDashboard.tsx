'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  AlertTriangle,
  Check,
  CalendarClock,
  Link2,
  Loader2,
  LogOut,
  Mail,
  MessageCircle,
  Phone,
  RefreshCw,
  X,
} from 'lucide-react'
import {
  STATUS_LABEL,
  formatSlot,
  formatSlotDate,
  slotsFor,
  type Appointment,
  type AppointmentStatus,
} from '@/lib/appointments'
import type { StoreKind } from '@/lib/store'

type Filter = 'inbox' | 'confirmed' | 'waiting' | 'closed' | 'all'

const FILTERS: { key: Filter; label: string; match: (s: AppointmentStatus) => boolean }[] = [
  { key: 'inbox', label: 'Needs an answer', match: (s) => s === 'pending' },
  { key: 'waiting', label: 'Waiting on client', match: (s) => s === 'proposed' },
  { key: 'confirmed', label: 'Confirmed', match: (s) => s === 'confirmed' },
  { key: 'closed', label: 'Closed', match: (s) => s === 'declined' || s === 'cancelled' },
  { key: 'all', label: 'Everything', match: () => true },
]

const STATUS_STYLE: Record<AppointmentStatus, string> = {
  pending: 'bg-[rgba(217,164,65,0.18)] text-[var(--color-brand-clay)]',
  confirmed: 'bg-[rgba(63,138,82,0.16)] text-[#2f6b3f]',
  proposed: 'bg-[rgba(201,123,63,0.18)] text-[var(--color-brand-clay)]',
  declined: 'bg-[rgba(58,27,20,0.08)] text-[var(--color-ink-500)]',
  cancelled: 'bg-[rgba(58,27,20,0.08)] text-[var(--color-ink-500)]',
}

export function AdminDashboard({ dates }: { dates: string[] }) {
  const router = useRouter()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [storeKind, setStoreKind] = useState<StoreKind | null>(null)
  const [filter, setFilter] = useState<Filter>('inbox')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setError(null)
    try {
      const response = await fetch('/api/admin/appointments', { cache: 'no-store' })
      if (response.status === 401) {
        router.refresh()
        return
      }
      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        setError(data.error ?? 'Could not load requests.')
        return
      }
      setAppointments(data.appointments ?? [])
      setStoreKind(data.storeKind ?? null)
    } catch {
      setError('Could not reach the server.')
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    void load()
  }, [load])

  const counts = useMemo(() => {
    const out = {} as Record<Filter, number>
    for (const f of FILTERS) out[f.key] = appointments.filter((a) => f.match(a.status)).length
    return out
  }, [appointments])

  const visible = useMemo(() => {
    const match = FILTERS.find((f) => f.key === filter)!.match
    return appointments.filter((a) => match(a.status))
  }, [appointments, filter])

  async function logout() {
    await fetch('/api/admin/session', { method: 'DELETE' })
    router.refresh()
  }

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-10">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-display text-4xl italic font-medium text-[var(--color-ink-900)]">
            Studio desk
          </p>
          <p className="kbd mt-1">appointment requests</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => void load()} className="btn btn-ghost" disabled={loading}>
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
          <button onClick={() => void logout()} className="btn btn-ghost">
            <LogOut size={14} /> Log out
          </button>
        </div>
      </header>

      {storeKind === 'file' && (
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[var(--color-brand-amber)] bg-[rgba(201,123,63,0.1)] p-4">
          <AlertTriangle size={16} className="mt-0.5 shrink-0 text-[var(--color-brand-clay)]" />
          <p className="text-sm leading-relaxed text-[var(--color-ink-700)]">
            <strong>Requests are saved to a local file, not a database.</strong> That is fine on
            your own machine, but on the live site requests can disappear when the server
            restarts. Set a <code className="rounded bg-[var(--color-paper-2)] px-1.5 py-0.5 text-xs">DATABASE_URL</code>{' '}
            to store them for good.
          </p>
        </div>
      )}

      <nav className="mt-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = filter === f.key
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={
                'rounded-full border px-4 py-2 text-sm font-semibold transition-colors ' +
                (active
                  ? 'border-[var(--color-ink-900)] bg-[var(--color-ink-900)] text-[var(--color-paper)]'
                  : 'border-[rgba(58,27,20,0.15)] text-[var(--color-ink-700)] hover:border-[rgba(58,27,20,0.35)]')
              }
            >
              {f.label}
              <span className={'ml-2 ' + (active ? 'text-[var(--color-brand-gold)]' : 'text-[var(--color-ink-500)]')}>
                {counts[f.key] ?? 0}
              </span>
            </button>
          )
        })}
      </nav>

      {error && (
        <p className="mt-6 rounded-2xl border border-[var(--color-brand-clay)] p-4 text-sm text-[var(--color-brand-clay)]">
          {error}
        </p>
      )}

      {loading ? (
        <p className="mt-10 flex items-center gap-2 text-sm text-[var(--color-ink-500)]">
          <Loader2 size={14} className="animate-spin" /> Loading requests…
        </p>
      ) : visible.length === 0 ? (
        <p className="mt-10 font-display text-2xl italic text-[var(--color-ink-500)]">
          Nothing here right now.
        </p>
      ) : (
        <ul className="mt-6 grid gap-4">
          {visible.map((a) => (
            <RequestCard key={a.id} appointment={a} dates={dates} onDone={load} />
          ))}
        </ul>
      )}
    </div>
  )
}

function RequestCard({
  appointment,
  dates,
  onDone,
}: {
  appointment: Appointment
  dates: string[]
  onDone: () => Promise<void>
}) {
  const [mode, setMode] = useState<'idle' | 'propose'>('idle')
  const [message, setMessage] = useState('')
  const [date, setDate] = useState(appointment.date)
  const [time, setTime] = useState<string | null>(null)
  const [busy, setBusy] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const times = useMemo(() => slotsFor(date, appointment.serviceSlug), [date, appointment.serviceSlug])
  // The chosen date may not offer the previously selected start time.
  const validTime = time && times.includes(time) ? time : null

  const dateOptions = useMemo(
    () => (dates.includes(appointment.date) ? dates : [appointment.date, ...dates]),
    [dates, appointment.date],
  )

  async function act(action: 'confirm' | 'decline' | 'propose' | 'reopen') {
    setBusy(action)
    setError(null)
    try {
      const response = await fetch(`/api/admin/appointments/${appointment.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          message,
          ...(action === 'propose' ? { date, time: validTime } : {}),
        }),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        setError(data.error ?? 'That did not go through.')
        return
      }
      setMode('idle')
      setMessage('')
      await onDone()
    } catch {
      setError('Could not reach the server.')
    } finally {
      setBusy(null)
    }
  }

  const open = appointment.status === 'pending' || appointment.status === 'proposed'

  return (
    <li className="card p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className={`kbd rounded-full px-2.5 py-1 ${STATUS_STYLE[appointment.status]}`}>
            {STATUS_LABEL[appointment.status]}
          </span>
          <p className="mt-3 font-display text-2xl italic font-medium text-[var(--color-ink-900)]">
            {appointment.name}
          </p>
          <p className="mt-1 text-sm text-[var(--color-ink-700)]">
            {appointment.serviceTitle} · {formatSlot(appointment.date, appointment.time)}
          </p>
          {appointment.status === 'proposed' && appointment.proposedDate && (
            <p className="mt-1 text-sm text-[var(--color-brand-clay)]">
              You offered {formatSlot(appointment.proposedDate, appointment.proposedTime!)} — waiting
              on their answer.
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <a href={`tel:${appointment.phone.replace(/\s+/g, '')}`} className="btn btn-ghost">
            <Phone size={14} /> Call
          </a>
          <a
            href={`https://wa.me/${appointment.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
              whatsappText(appointment),
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            <MessageCircle size={14} /> WhatsApp
          </a>
          <a href={`mailto:${appointment.email}`} className="btn btn-ghost">
            <Mail size={14} /> Email
          </a>
          <CopyLinkButton token={appointment.token} />
        </div>
      </div>

      <dl className="mt-5 grid gap-x-8 gap-y-2 border-t border-[rgba(58,27,20,0.1)] pt-5 text-sm sm:grid-cols-2">
        <Row label="Email" value={appointment.email} />
        <Row label="Phone" value={appointment.phone} />
        <Row label="Requested" value={new Date(appointment.createdAt).toLocaleString('en-GB')} />
        <Row label="Style" value={appointment.serviceTitle} />
        {appointment.note && <Row label="Their note" value={appointment.note} full />}
        {appointment.adminMessage && <Row label="Your note" value={appointment.adminMessage} full />}
      </dl>

      {error && <p className="mt-4 text-sm text-[var(--color-brand-clay)]">{error}</p>}

      {mode === 'propose' && (
        <div className="mt-5 rounded-2xl border border-[rgba(58,27,20,0.12)] bg-[var(--color-paper-2)] p-5">
          <p className="kbd">Offer a different time</p>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <select
              value={date}
              onChange={(e) => {
                setDate(e.target.value)
                setTime(null)
              }}
              className="rounded-xl border border-[rgba(58,27,20,0.2)] bg-[var(--color-paper)] px-3 py-2 text-sm"
            >
              {dateOptions.map((d) => (
                <option key={d} value={d}>
                  {formatSlotDate(d)}
                </option>
              ))}
            </select>
            <span className="text-sm text-[var(--color-ink-500)]">
              {times.length} slots fit {appointment.serviceTitle} that day
            </span>
          </div>

          <ul className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
            {times.map((t) => {
              const active = validTime === t
              return (
                <li key={t}>
                  <button
                    onClick={() => setTime(t)}
                    className={
                      'w-full rounded-lg border py-2 text-center text-sm transition-colors ' +
                      (active
                        ? 'border-[var(--color-ink-900)] bg-[var(--color-ink-900)] text-[var(--color-paper)]'
                        : 'border-[rgba(58,27,20,0.15)] hover:border-[rgba(58,27,20,0.4)]')
                    }
                  >
                    {t}
                  </button>
                </li>
              )
            })}
          </ul>

          <textarea
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Optional note — “Sorry, that morning is fully booked. Would this suit you?”"
            className="mt-4 w-full resize-none rounded-2xl border border-[rgba(58,27,20,0.15)] bg-[var(--color-paper)] px-4 py-3 text-sm focus:border-[var(--color-brand-clay)] focus:outline-none"
          />

          <div className="mt-3 flex gap-2">
            <button
              onClick={() => void act('propose')}
              disabled={busy !== null || !validTime}
              className="btn btn-primary disabled:opacity-60"
            >
              {busy === 'propose' ? (
                <>
                  Sending <Loader2 size={14} className="animate-spin" />
                </>
              ) : (
                <>
                  Send this time <CalendarClock size={14} />
                </>
              )}
            </button>
            <button onClick={() => setMode('idle')} className="btn btn-ghost">
              Cancel
            </button>
          </div>
        </div>
      )}

      {mode === 'idle' && (
        <div className="mt-5 flex flex-wrap gap-2">
          {open && (
            <>
              <button
                onClick={() => void act('confirm')}
                disabled={busy !== null}
                className="btn btn-primary disabled:opacity-60"
              >
                {busy === 'confirm' ? (
                  <>
                    Confirming <Loader2 size={14} className="animate-spin" />
                  </>
                ) : (
                  <>
                    Confirm this slot <Check size={14} />
                  </>
                )}
              </button>
              <button onClick={() => setMode('propose')} className="btn btn-ghost">
                <CalendarClock size={14} /> Offer another time
              </button>
              <button
                onClick={() => void act('decline')}
                disabled={busy !== null}
                className="btn btn-ghost disabled:opacity-60"
              >
                {busy === 'decline' ? (
                  <>
                    Declining <Loader2 size={14} className="animate-spin" />
                  </>
                ) : (
                  <>
                    Decline <X size={14} />
                  </>
                )}
              </button>
            </>
          )}
          {!open && (
            <button
              onClick={() => void act('reopen')}
              disabled={busy !== null}
              className="btn btn-ghost disabled:opacity-60"
            >
              <RefreshCw size={14} /> Reopen as pending
            </button>
          )}
        </div>
      )}
    </li>
  )
}

function Row({ label, value, full }: { label: string; value: string; full?: boolean }) {
  return (
    <div className={full ? 'sm:col-span-2' : undefined}>
      <dt className="kbd">{label}</dt>
      <dd className="mt-0.5 text-[var(--color-ink-900)]">{value}</dd>
    </div>
  )
}

function CopyLinkButton({ token }: { token: string }) {
  const [copied, setCopied] = useState(false)

  return (
    <button
      onClick={async () => {
        const url = `${window.location.origin}/rezervasyon/${token}`
        try {
          await navigator.clipboard.writeText(url)
        } catch {
          window.prompt('Copy this link', url)
        }
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }}
      className="btn btn-ghost"
    >
      {copied ? <Check size={14} /> : <Link2 size={14} />}
      {copied ? 'Copied' : 'Their link'}
    </button>
  )
}

/** Pre-written WhatsApp message matching where the request currently stands. */
function whatsappText(a: Appointment) {
  const slot = formatSlot(a.date, a.time)
  switch (a.status) {
    case 'confirmed':
      return `Hi ${a.name}, it's KULAMA. Your ${a.serviceTitle} on ${slot} is confirmed. See you at the studio!`
    case 'proposed':
      return `Hi ${a.name}, it's KULAMA. We can't do ${slot}, but we could take you on ${formatSlot(
        a.proposedDate ?? a.date,
        a.proposedTime ?? a.time,
      )}. Does that work for you?`
    case 'declined':
      return `Hi ${a.name}, it's KULAMA. Unfortunately we can't take your ${a.serviceTitle} request for ${slot}. We'd love to find you another slot.`
    default:
      return `Hi ${a.name}, it's KULAMA about your ${a.serviceTitle} request for ${slot}.`
  }
}
