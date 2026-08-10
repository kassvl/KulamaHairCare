import 'server-only'
import { randomUUID, randomBytes } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import type { Appointment, AppointmentStatus, BookingInput } from '@/lib/appointments'
import { serviceBySlug } from '@/lib/appointments'

/**
 * Appointment persistence.
 *
 * With `DATABASE_URL` set (any Postgres — Neon, Supabase, Vercel Postgres) the
 * data lives in Postgres. Without it we fall back to a JSON file so the site
 * runs locally with zero setup. The fallback is NOT durable on serverless
 * hosting, so `storeKind` is surfaced in the admin panel as a warning.
 */
export type StoreKind = 'postgres' | 'file'

export const storeKind: StoreKind = process.env.DATABASE_URL ? 'postgres' : 'file'

export interface AppointmentPatch {
  status?: AppointmentStatus
  proposedDate?: string | null
  proposedTime?: string | null
  adminMessage?: string | null
  date?: string
  time?: string
}

interface Driver {
  list(): Promise<Appointment[]>
  byToken(token: string): Promise<Appointment | null>
  byId(id: string): Promise<Appointment | null>
  insert(row: Appointment): Promise<Appointment>
  patch(id: string, patch: AppointmentPatch): Promise<Appointment | null>
}

/* ─────────────────────────── Postgres driver ─────────────────────────── */

type Sql = import('postgres').Sql

let sqlPromise: Promise<Sql> | null = null

async function getSql(): Promise<Sql> {
  if (!sqlPromise) {
    sqlPromise = (async () => {
      const { default: postgres } = await import('postgres')
      const sql = postgres(process.env.DATABASE_URL!, {
        ssl: 'require',
        max: 1,
        idle_timeout: 20,
      })
      await sql`
        create table if not exists appointments (
          id            text primary key,
          token         text unique not null,
          service_slug  text not null,
          service_title text not null,
          date          text not null,
          time          text not null,
          name          text not null,
          email         text not null,
          phone         text not null,
          note          text not null default '',
          status        text not null default 'pending',
          proposed_date text,
          proposed_time text,
          admin_message text,
          created_at    timestamptz not null default now(),
          updated_at    timestamptz not null default now()
        )
      `
      return sql
    })().catch((err) => {
      // Let the next call retry rather than caching a failed connection.
      sqlPromise = null
      throw err
    })
  }
  return sqlPromise
}

type Row = Record<string, unknown>

function fromRow(r: Row): Appointment {
  return {
    id: String(r.id),
    token: String(r.token),
    serviceSlug: String(r.service_slug),
    serviceTitle: String(r.service_title),
    date: String(r.date),
    time: String(r.time),
    name: String(r.name),
    email: String(r.email),
    phone: String(r.phone),
    note: String(r.note ?? ''),
    status: String(r.status) as AppointmentStatus,
    proposedDate: (r.proposed_date as string | null) ?? null,
    proposedTime: (r.proposed_time as string | null) ?? null,
    adminMessage: (r.admin_message as string | null) ?? null,
    createdAt: new Date(r.created_at as string).toISOString(),
    updatedAt: new Date(r.updated_at as string).toISOString(),
  }
}

const postgresDriver: Driver = {
  async list() {
    const sql = await getSql()
    const rows = await sql`select * from appointments order by created_at desc`
    return rows.map((r) => fromRow(r as Row))
  },
  async byToken(token) {
    const sql = await getSql()
    const rows = await sql`select * from appointments where token = ${token} limit 1`
    return rows[0] ? fromRow(rows[0] as Row) : null
  },
  async byId(id) {
    const sql = await getSql()
    const rows = await sql`select * from appointments where id = ${id} limit 1`
    return rows[0] ? fromRow(rows[0] as Row) : null
  },
  async insert(a) {
    const sql = await getSql()
    const rows = await sql`
      insert into appointments
        (id, token, service_slug, service_title, date, time, name, email, phone, note, status)
      values
        (${a.id}, ${a.token}, ${a.serviceSlug}, ${a.serviceTitle}, ${a.date}, ${a.time},
         ${a.name}, ${a.email}, ${a.phone}, ${a.note}, ${a.status})
      returning *
    `
    return fromRow(rows[0] as Row)
  },
  async patch(id, p) {
    const sql = await getSql()
    const rows = await sql`
      update appointments set
        status        = coalesce(${p.status ?? null}, status),
        date          = coalesce(${p.date ?? null}, date),
        time          = coalesce(${p.time ?? null}, time),
        proposed_date = ${p.proposedDate === undefined ? sql`proposed_date` : p.proposedDate},
        proposed_time = ${p.proposedTime === undefined ? sql`proposed_time` : p.proposedTime},
        admin_message = ${p.adminMessage === undefined ? sql`admin_message` : p.adminMessage},
        updated_at    = now()
      where id = ${id}
      returning *
    `
    return rows[0] ? fromRow(rows[0] as Row) : null
  },
}

/* ───────────────────────────── File driver ───────────────────────────── */

const FILE = path.join(process.cwd(), '.data', 'appointments.json')

async function readAll(): Promise<Appointment[]> {
  try {
    return JSON.parse(await readFile(FILE, 'utf8')) as Appointment[]
  } catch {
    return []
  }
}

async function writeAll(rows: Appointment[]) {
  await mkdir(path.dirname(FILE), { recursive: true })
  await writeFile(FILE, JSON.stringify(rows, null, 2), 'utf8')
}

const fileDriver: Driver = {
  async list() {
    const rows = await readAll()
    return rows.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  },
  async byToken(token) {
    return (await readAll()).find((r) => r.token === token) ?? null
  },
  async byId(id) {
    return (await readAll()).find((r) => r.id === id) ?? null
  },
  async insert(a) {
    const rows = await readAll()
    rows.push(a)
    await writeAll(rows)
    return a
  },
  async patch(id, p) {
    const rows = await readAll()
    const i = rows.findIndex((r) => r.id === id)
    if (i === -1) return null
    const next: Appointment = {
      ...rows[i]!,
      ...(p.status !== undefined && { status: p.status }),
      ...(p.date !== undefined && { date: p.date }),
      ...(p.time !== undefined && { time: p.time }),
      ...(p.proposedDate !== undefined && { proposedDate: p.proposedDate }),
      ...(p.proposedTime !== undefined && { proposedTime: p.proposedTime }),
      ...(p.adminMessage !== undefined && { adminMessage: p.adminMessage }),
      updatedAt: new Date().toISOString(),
    }
    rows[i] = next
    await writeAll(rows)
    return next
  },
}

const driver: Driver = storeKind === 'postgres' ? postgresDriver : fileDriver

/* ────────────────────────────── Public API ───────────────────────────── */

export function listAppointments() {
  return driver.list()
}

export function getAppointmentByToken(token: string) {
  return driver.byToken(token)
}

export function getAppointment(id: string) {
  return driver.byId(id)
}

export function updateAppointment(id: string, patch: AppointmentPatch) {
  return driver.patch(id, patch)
}

export function createAppointment(input: BookingInput) {
  const now = new Date().toISOString()
  const service = serviceBySlug(input.serviceSlug)
  const row: Appointment = {
    id: randomUUID(),
    token: randomBytes(16).toString('base64url'),
    serviceSlug: input.serviceSlug,
    serviceTitle: service?.title ?? input.serviceSlug,
    date: input.date,
    time: input.time,
    name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone.trim(),
    note: input.note?.trim() ?? '',
    status: 'pending',
    proposedDate: null,
    proposedTime: null,
    adminMessage: null,
    createdAt: now,
    updatedAt: now,
  }
  return driver.insert(row)
}

/** Slots already taken, so the booking form can grey them out. */
export async function takenSlots(): Promise<Record<string, string[]>> {
  const rows = await driver.list()
  const out: Record<string, string[]> = {}
  for (const r of rows) {
    if (r.status === 'declined' || r.status === 'cancelled') continue
    ;(out[r.date] ??= []).push(r.time)
  }
  return out
}
