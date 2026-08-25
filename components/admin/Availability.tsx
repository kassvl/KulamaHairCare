'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { Loader2, Lock, LockOpen, RefreshCw } from 'lucide-react'
import {
  everySlot,
  formatSlotDate,
  isOpenOn,
  withinHours,
  type Overrides,
  type SlotState,
} from '@/lib/appointments'

type Taken = Record<string, string[]>

/** What a slot actually is once hours, overrides and bookings are combined. */
type Effective = 'booked' | 'open' | 'opened-by-hand' | 'closed' | 'closed-by-hand'

function effectiveState(
  date: string,
  time: string,
  overrides: Overrides,
  taken: Taken,
): Effective {
  if (taken[date]?.includes(time)) return 'booked'
  const override = overrides[date]?.[time]
  if (override === 'blocked') return 'closed-by-hand'
  if (override === 'open') return 'opened-by-hand'
  return withinHours(date, time) ? 'open' : 'closed'
}

const STYLE: Record<Effective, string> = {
  booked:
    'cursor-not-allowed border-[var(--color-brand-clay)] bg-[rgba(162,78,42,0.14)] text-[var(--color-brand-clay)]',
  open: 'border-[rgba(58,27,20,0.2)] bg-[var(--color-paper)] text-[var(--color-ink-900)] hover:border-[var(--color-ink-900)]',
  'opened-by-hand':
    'border-[var(--color-brand-gold)] bg-[rgba(217,164,65,0.16)] text-[var(--color-ink-900)] hover:border-[var(--color-ink-900)]',
  closed:
    'border-dashed border-[rgba(58,27,20,0.14)] text-[var(--color-ink-300)] hover:border-[rgba(58,27,20,0.4)]',
  'closed-by-hand':
    'border-[rgba(58,27,20,0.3)] bg-[rgba(58,27,20,0.08)] text-[var(--color-ink-500)] line-through hover:border-[var(--color-ink-900)]',
}

export function Availability({ dates }: { dates: string[] }) {
  const [overrides, setOverrides] = useState<Overrides>({})
  const [taken, setTaken] = useState<Taken>({})
  const [date, setDate] = useState(dates[1] ?? dates[0] ?? '')
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setError(null)
    try {
      const r = await fetch('/api/admin/availability', { cache: 'no-store' })
      const d = await r.json().catch(() => ({}))
      if (!r.ok) return setError(d.error ?? 'Could not load the diary.')
      setOverrides(d.overrides ?? {})
      setTaken(d.taken ?? {})
    } catch {
      setError('Could not reach the server.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  const slots = useMemo(() => everySlot(), [])

  async function write(time: string, state: SlotState | null) {
    setBusy(time)
    setError(null)
    try {
      const r = await fetch('/api/admin/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, time, state }),
      })
      const d = await r.json().catch(() => ({}))
      if (!r.ok) return setError(d.error ?? 'Could not save that change.')
      setOverrides(d.overrides ?? {})
    } catch {
      setError('Could not reach the server.')
    } finally {
      setBusy(null)
    }
  }

  /** Closing is always an override; opening drops back to the regular hours when it can. */
  function toggle(time: string) {
    const state = effectiveState(date, time, overrides, taken)
    if (state === 'booked') return
    const isOpenNow = state === 'open' || state === 'opened-by-hand'
    if (isOpenNow) return write(time, 'blocked')
    return write(time, withinHours(date, time) ? null : 'open')
  }

  async function setWholeDay(state: SlotState | null) {
    setBusy('day')
    setError(null)
    try {
      for (const time of slots) {
        if (taken[date]?.includes(time)) continue
        if (state === null && !withinHours(date, time)) continue
        await fetch('/api/admin/availability', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ date, time, state }),
        })
      }
      await load()
    } finally {
      setBusy(null)
    }
  }

  const dayCount = (d: string) =>
    slots.filter((t) => {
      const s = effectiveState(d, t, overrides, taken)
      return s === 'open' || s === 'opened-by-hand'
    }).length

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[var(--color-ink-700)]">
          Tap a time to close it. Tap a closed time to open it — including on days you are
          normally shut.
        </p>
        <button onClick={() => void load()} className="btn btn-ghost" disabled={loading}>
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      {/* Day strip */}
      <div className="mt-5 -mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-2">
        {dates.map((d) => {
          const active = date === d
          const n = dayCount(d)
          return (
            <button
              key={d}
              onClick={() => setDate(d)}
              className={
                'shrink-0 snap-start rounded-2xl border px-4 py-3 text-left transition-all ' +
                (active
                  ? 'border-[var(--color-ink-900)] bg-[var(--color-ink-900)] text-[var(--color-paper)]'
                  : 'border-[rgba(58,27,20,0.15)] hover:border-[rgba(58,27,20,0.35)]')
              }
            >
              <p
                className={
                  'kbd whitespace-nowrap ' + (active ? 'text-[var(--color-brand-gold)]' : '')
                }
              >
                {formatSlotDate(d)}
              </p>
              <p
                className={
                  'mt-1 text-xs ' +
                  (active ? 'text-[rgba(244,236,226,0.8)]' : 'text-[var(--color-ink-500)]')
                }
              >
                {n === 0 ? 'closed' : `${n} slots`}
                {!isOpenOn(d) && n > 0 ? ' · extra' : ''}
              </p>
            </button>
          )
        })}
      </div>

      {error && (
        <p className="mt-4 rounded-2xl border border-[var(--color-brand-clay)] p-4 text-sm text-[var(--color-brand-clay)]">
          {error}
        </p>
      )}

      {/* Time grid */}
      <div className="mt-6 card p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="kbd">{formatSlotDate(date)}</p>
            <p className="mt-1 font-display text-2xl italic font-medium">
              {isOpenOn(date) ? 'Regular day' : 'Normally closed'}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => void setWholeDay('blocked')}
              disabled={busy !== null}
              className="btn btn-ghost disabled:opacity-60"
            >
              {busy === 'day' ? <Loader2 size={14} className="animate-spin" /> : <Lock size={14} />}
              Close the day
            </button>
            <button
              onClick={() => void setWholeDay(isOpenOn(date) ? null : 'open')}
              disabled={busy !== null}
              className="btn btn-ghost disabled:opacity-60"
            >
              <LockOpen size={14} /> Open the day
            </button>
          </div>
        </div>

        <ul className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9">
          {slots.map((t) => {
            const state = effectiveState(date, t, overrides, taken)
            return (
              <li key={t}>
                <button
                  onClick={() => void toggle(t)}
                  disabled={state === 'booked' || busy !== null}
                  title={
                    state === 'booked'
                      ? 'Booked — answer it under Requests'
                      : state === 'opened-by-hand'
                        ? 'Opened by hand'
                        : state === 'closed-by-hand'
                          ? 'Closed by hand'
                          : undefined
                  }
                  className={
                    'w-full rounded-xl border py-2.5 text-center font-display text-base italic transition-all ' +
                    STYLE[state]
                  }
                >
                  {busy === t ? <Loader2 size={14} className="mx-auto animate-spin" /> : t}
                </button>
              </li>
            )
          })}
        </ul>

        <ul className="mt-5 flex flex-wrap gap-4 border-t border-[rgba(58,27,20,0.1)] pt-4 text-xs text-[var(--color-ink-500)]">
          <Legend swatch="border-[rgba(58,27,20,0.2)] bg-[var(--color-paper)]" label="Open" />
          <Legend
            swatch="border-[var(--color-brand-gold)] bg-[rgba(217,164,65,0.16)]"
            label="Opened by hand"
          />
          <Legend
            swatch="border-[rgba(58,27,20,0.3)] bg-[rgba(58,27,20,0.08)]"
            label="Closed by hand"
          />
          <Legend swatch="border-dashed border-[rgba(58,27,20,0.14)]" label="Outside hours" />
          <Legend
            swatch="border-[var(--color-brand-clay)] bg-[rgba(162,78,42,0.14)]"
            label="Booked"
          />
        </ul>
      </div>
    </div>
  )
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <li className="flex items-center gap-2">
      <span className={`inline-block h-4 w-6 rounded border ${swatch}`} />
      {label}
    </li>
  )
}
