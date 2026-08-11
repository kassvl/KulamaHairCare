'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Check, Clock4, Loader2, MapPin, Scissors, X } from 'lucide-react'
import { brand } from '@/lib/content'
import { STATUS_LABEL, formatSlotDate, type AppointmentStatus } from '@/lib/appointments'

export interface PublicAppointment {
  serviceTitle: string
  serviceSlug: string
  date: string
  time: string
  name: string
  status: AppointmentStatus
  proposedDate: string | null
  proposedTime: string | null
  adminMessage: string | null
  createdAt: string
  updatedAt: string
}

const TONE: Record<AppointmentStatus, { dot: string; text: string }> = {
  pending: { dot: 'bg-[var(--color-brand-gold)]', text: 'text-[var(--color-ink-700)]' },
  confirmed: { dot: 'bg-[#3f8a52]', text: 'text-[#2f6b3f]' },
  proposed: { dot: 'bg-[var(--color-brand-amber)]', text: 'text-[var(--color-brand-clay)]' },
  declined: { dot: 'bg-[var(--color-ink-300)]', text: 'text-[var(--color-ink-500)]' },
  cancelled: { dot: 'bg-[var(--color-ink-300)]', text: 'text-[var(--color-ink-500)]' },
}

const BLURB: Record<AppointmentStatus, string> = {
  pending:
    'Your request is with the studio. We answer every request within 24 hours — you can keep this page open or come back to it later.',
  confirmed: 'You’re in the book. See you in the chair.',
  proposed:
    'That slot didn’t work on our side, so we’ve offered you the closest one we can do. Accept it and you’re booked.',
  declined: 'We couldn’t take this one. Please pick another slot — we’d still love to see you.',
  cancelled: 'This request is closed. You can always start a new one.',
}

export function BookingStatus({
  token,
  initial,
}: {
  token: string
  initial: PublicAppointment
}) {
  const [appointment, setAppointment] = useState(initial)
  const [busy, setBusy] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function act(action: 'accept' | 'decline' | 'cancel') {
    setBusy(action)
    setError(null)
    try {
      const response = await fetch(`/api/appointments/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      })
      const data = await response.json().catch(() => ({}))
      if (response.ok && data.appointment) setAppointment(data.appointment)
      else setError(data.error ?? 'That didn’t go through. Please try again.')
    } catch {
      setError('We could not reach the studio. Check your connection and try again.')
    } finally {
      setBusy(null)
    }
  }

  const tone = TONE[appointment.status]
  const showsProposal = appointment.status === 'proposed'
  const closed = appointment.status === 'declined' || appointment.status === 'cancelled'

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <div className="card p-7 md:p-8">
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${tone.dot}`} />
            <p className={`kbd ${tone.text}`}>{STATUS_LABEL[appointment.status]}</p>
          </div>

          <p className="mt-5 font-display text-4xl italic font-medium leading-tight text-[var(--color-ink-900)]">
            {appointment.serviceTitle}
          </p>

          <ul className="mt-6 space-y-3 text-sm text-[var(--color-ink-700)]">
            <li className="flex items-center gap-2">
              <Clock4 size={14} />
              <span className={showsProposal ? 'line-through opacity-60' : ''}>
                {formatSlotDate(appointment.date)} · {appointment.time}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Scissors size={14} />
              Booked under {appointment.name}
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={14} />
              {brand.address}
            </li>
          </ul>

          <p className="mt-6 border-t border-[rgba(58,27,20,0.1)] pt-5 text-sm leading-relaxed text-[var(--color-ink-700)]">
            {BLURB[appointment.status]}
          </p>

          {appointment.adminMessage && (
            <blockquote className="mt-5 rounded-2xl border border-[rgba(58,27,20,0.12)] bg-[var(--color-paper-2)] p-5">
              <p className="kbd">A note from the studio</p>
              <p className="mt-2 font-display text-lg italic leading-relaxed text-[var(--color-ink-900)]">
                {appointment.adminMessage}
              </p>
            </blockquote>
          )}
        </div>

        {closed && (
          <Link href="/rezervasyon" className="btn btn-primary mt-5">
            Start a new request <ArrowUpRight size={16} />
          </Link>
        )}
      </div>

      <aside className="lg:col-span-5">
        {showsProposal ? (
          <div className="card border-[var(--color-brand-clay)] bg-[var(--color-paper-2)] p-7">
            <p className="kbd text-[var(--color-brand-clay)]">The studio offers</p>
            <p className="mt-3 font-display text-3xl italic font-medium text-[var(--color-ink-900)]">
              {formatSlotDate(appointment.proposedDate ?? appointment.date)}
            </p>
            <p className="font-display text-5xl italic font-medium text-[var(--color-brand-clay)]">
              {appointment.proposedTime}
            </p>

            {error && <p className="mt-4 text-sm text-[var(--color-brand-clay)]">{error}</p>}

            <div className="mt-6 grid gap-2">
              <button
                onClick={() => void act('accept')}
                disabled={busy !== null}
                className="btn btn-primary w-full justify-center disabled:opacity-60"
              >
                {busy === 'accept' ? (
                  <>
                    Confirming <Loader2 size={16} className="animate-spin" />
                  </>
                ) : (
                  <>
                    Take this time <Check size={16} />
                  </>
                )}
              </button>
              <button
                onClick={() => void act('decline')}
                disabled={busy !== null}
                className="btn btn-ghost w-full justify-center disabled:opacity-60"
              >
                {busy === 'decline' ? (
                  <>
                    Cancelling <Loader2 size={16} className="animate-spin" />
                  </>
                ) : (
                  <>
                    Doesn&rsquo;t work for me <X size={16} />
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="card p-7">
            <p className="kbd">Keep this link</p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-700)]">
              This page is your booking. Bookmark it — the status updates here the moment the
              studio answers, and any alternative time we offer will appear on it.
            </p>

            {error && <p className="mt-4 text-sm text-[var(--color-brand-clay)]">{error}</p>}

            {!closed && (
              <button
                onClick={() => void act('cancel')}
                disabled={busy !== null}
                className="btn btn-ghost mt-5 w-full justify-center disabled:opacity-60"
              >
                {busy === 'cancel' ? (
                  <>
                    Cancelling <Loader2 size={16} className="animate-spin" />
                  </>
                ) : (
                  'Cancel this request'
                )}
              </button>
            )}
            <p className="mt-4 text-center font-script text-base text-[var(--color-brand-gold)]">
              see you in the chair ✦
            </p>
          </div>
        )}
      </aside>
    </div>
  )
}
