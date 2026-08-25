/**
 * Appointment domain: statuses, studio opening hours and slot generation.
 * Pure logic — no I/O. Shared by the booking UI, the admin panel and the API.
 */
import { services } from '@/lib/content'

export const STATUSES = [
  'pending',
  'confirmed',
  'proposed',
  'declined',
  'cancelled',
] as const

export type AppointmentStatus = (typeof STATUSES)[number]

export interface Appointment {
  id: string
  token: string
  serviceSlug: string
  serviceTitle: string
  /** ISO date, `YYYY-MM-DD`, in studio local time. */
  date: string
  /** `HH:MM`, 24h, in studio local time. */
  time: string
  name: string
  email: string
  phone: string
  note: string
  status: AppointmentStatus
  /** Alternative slot the studio offered; only set while status is `proposed`. */
  proposedDate: string | null
  proposedTime: string | null
  /** Free-text note the studio sends along with a decision. */
  adminMessage: string | null
  createdAt: string
  updatedAt: string
}

export const STATUS_LABEL: Record<AppointmentStatus, string> = {
  pending: 'Awaiting confirmation',
  confirmed: 'Confirmed',
  proposed: 'New time offered',
  declined: 'Declined',
  cancelled: 'Cancelled',
}

/**
 * Opening hours, mirrored from the copy on /iletisim.
 * Index = `Date#getDay()` (0 = Sunday). `null` means closed.
 */
export const OPENING_HOURS: ({ open: string; close: string } | null)[] = [
  null, // Sunday — closed
  null, // Monday — closed
  { open: '09:00', close: '19:00' }, // Tuesday
  { open: '09:00', close: '19:00' }, // Wednesday
  { open: '09:00', close: '19:00' }, // Thursday
  { open: '09:00', close: '19:00' }, // Friday
  { open: '10:00', close: '17:00' }, // Saturday
]

/** Requests open this many days ahead, starting tomorrow. */
export const BOOKING_WINDOW_DAYS = 45

/**
 * The widest window the studio can ever open a slot in — the palette the
 * availability editor paints from, not the hours it actually keeps.
 */
export const DAY_START = '08:00'
export const DAY_END = '21:00'

/** A slot the studio has deliberately closed, or opened outside its hours. */
export type SlotState = 'blocked' | 'open'
/** `{ '2026-08-27': { '09:00': 'blocked' } }` */
export type Overrides = Record<string, Record<string, SlotState>>

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number)
  return (h ?? 0) * 60 + (m ?? 0)
}

const toHHMM = (minutes: number) =>
  `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`

export function serviceBySlug(slug: string) {
  return services.find((s) => s.slug === slug) ?? null
}

/** Longest a style can run, in minutes — used to cut off late start times. */
function serviceMinutes(slug: string) {
  const service = serviceBySlug(slug)
  return (service?.hours[1] ?? 2) * 60
}

export function isOpenOn(date: string) {
  return OPENING_HOURS[dayOf(date)] != null
}

/** `getDay()` for a `YYYY-MM-DD` string, read as a studio-local calendar date. */
export function dayOf(date: string) {
  const [y, m, d] = date.split('-').map(Number)
  return new Date(Date.UTC(y ?? 1970, (m ?? 1) - 1, d ?? 1)).getUTCDay()
}

/**
 * Start times bookable on `date` for `serviceSlug`: every half hour from opening
 * until the last slot that still finishes before closing.
 */
export function slotsFor(
  date: string,
  serviceSlug: string,
  overrides?: Overrides,
): string[] {
  const hours = OPENING_HOURS[dayOf(date)]
  const day = overrides?.[date] ?? {}

  const out: string[] = []
  if (hours) {
    const lastStart = toMinutes(hours.close) - serviceMinutes(serviceSlug)
    const firstStart = toMinutes(hours.open)
    for (let t = firstStart; t <= lastStart; t += 30) out.push(toHHMM(t))
  }

  // A slot opened by hand stands whatever the regular hours say — the studio
  // knows when it is willing to stay late.
  for (const [time, state] of Object.entries(day)) {
    if (state === 'open' && !out.includes(time)) out.push(time)
  }

  return out.filter((t) => day[t] !== 'blocked').sort()
}

/** Every half hour the availability editor can paint, open or not. */
export function everySlot(): string[] {
  const out: string[] = []
  for (let t = toMinutes(DAY_START); t <= toMinutes(DAY_END); t += 30) out.push(toHHMM(t))
  return out
}

/** True when the regular hours cover this slot (ignoring overrides). */
export function withinHours(date: string, time: string) {
  const hours = OPENING_HOURS[dayOf(date)]
  if (!hours) return false
  const t = toMinutes(time)
  return t >= toMinutes(hours.open) && t <= toMinutes(hours.close)
}

/** The bookable date range: tomorrow through `BOOKING_WINDOW_DAYS` out. */
export function bookableDates(today = new Date(), overrides?: Overrides): string[] {
  const out: string[] = []
  for (let i = 1; i <= BOOKING_WINDOW_DAYS; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() + i)
    const iso = toISODate(d)
    const opened = Object.values(overrides?.[iso] ?? {}).includes('open')
    if (isOpenOn(iso) || opened) out.push(iso)
  }
  return out
}

/** Every day in the window, open or not — what the availability editor lists. */
export function calendarDates(today = new Date()): string[] {
  const out: string[] = []
  for (let i = 0; i <= BOOKING_WINDOW_DAYS; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() + i)
    out.push(toISODate(d))
  }
  return out
}

export function toISODate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/** e.g. `Sat · 14 Jun` — the format the original booking mock-up used. */
export function formatSlotDate(date: string) {
  const [y, m, d] = date.split('-').map(Number)
  const dt = new Date(Date.UTC(y ?? 1970, (m ?? 1) - 1, d ?? 1))
  const weekday = dt.toLocaleDateString('en-GB', { weekday: 'short', timeZone: 'UTC' })
  const day = dt.toLocaleDateString('en-GB', { day: 'numeric', timeZone: 'UTC' })
  const month = dt.toLocaleDateString('en-GB', { month: 'short', timeZone: 'UTC' })
  return `${weekday} · ${day} ${month}`
}

export function formatSlot(date: string, time: string) {
  return `${formatSlotDate(date)} · ${time}`
}

export interface BookingInput {
  serviceSlug: string
  date: string
  time: string
  name: string
  email: string
  phone: string
  note?: string
}

/**
 * Validates a booking request. Returns field-keyed messages so the form can
 * show them inline; an empty object means the request is good to store.
 */
export function validateBooking(input: Partial<BookingInput>, overrides?: Overrides) {
  const errors: Partial<Record<keyof BookingInput, string>> = {}

  const service = input.serviceSlug ? serviceBySlug(input.serviceSlug) : null
  if (!service) errors.serviceSlug = 'Pick one of our styles.'

  const openedThatDay = input.date
    ? Object.values(overrides?.[input.date] ?? {}).includes('open')
    : false

  if (!input.date || !/^\d{4}-\d{2}-\d{2}$/.test(input.date)) {
    errors.date = 'Pick a date.'
  } else if (!isOpenOn(input.date) && !openedThatDay) {
    errors.date = 'The studio is closed that day.'
  } else if (input.date < toISODate(new Date())) {
    errors.date = 'That date has already passed.'
  }

  if (!input.time) {
    errors.time = 'Pick a time.'
  } else if (
    service &&
    input.date &&
    !errors.date &&
    !slotsFor(input.date, service.slug, overrides).includes(input.time)
  ) {
    errors.time = 'That time is outside our hours for this style.'
  }

  if (!input.name?.trim()) errors.name = 'We need a name for the booking.'
  if (!input.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    errors.email = 'Enter an email we can reply to.'
  }
  if (!input.phone?.trim() || input.phone.replace(/\D/g, '').length < 7) {
    errors.phone = 'Enter a phone number we can reach you on.'
  }

  return errors
}
