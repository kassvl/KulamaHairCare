import 'server-only'
import { randomUUID, randomBytes } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import type {
  Appointment,
  AppointmentStatus,
  BookingInput,
  Overrides,
  SlotState,
} from '@/lib/appointments'
import { serviceBySlug } from '@/lib/appointments'

/**
 * Appointment persistence, in order of preference:
 *
 * 1. `DATABASE_URL` — any Postgres (Neon, Supabase, Vercel Postgres).
 * 2. `UPSTASH_REDIS_REST_URL` + `_TOKEN` — Upstash Redis over its REST API.
 * 3. A JSON file, so the site runs locally with zero setup.
 *
 * The file fallback is NOT durable on serverless hosting, so `storeKind` is
 * surfaced in the admin panel as a warning.
 */
export type StoreKind = 'postgres' | 'redis' | 'file'

export const storeKind: StoreKind = process.env.DATABASE_URL
  ? 'postgres'
  : process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? 'redis'
    : 'file'

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
  /** Slots the studio closed, or opened outside its regular hours. */
  overrides(): Promise<Overrides>
  setOverride(date: string, time: string, state: SlotState | null): Promise<void>
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
  async overrides() {
    const sql = await getSql()
    const rows = await sql`select date, time, state from slot_overrides`
    return foldOverrides(
      rows.map((r) => [String(r.date), String(r.time), String(r.state) as SlotState]),
    )
  },
  async setOverride(date, time, state) {
    const sql = await getSql()
    if (state === null) {
      await sql`delete from slot_overrides where date = \${date} and time = \${time}`
      return
    }
    await sql`
      insert into slot_overrides (date, time, state) values (\${date}, \${time}, \${state})
      on conflict (date, time) do update set state = excluded.state
    `
  },
}

/** `[date, time, state][]` → `{ date: { time: state } }` */
function foldOverrides(entries: [string, string, SlotState][]): Overrides {
  const out: Overrides = {}
  for (const [date, time, state] of entries) (out[date] ??= {})[time] = state
  return out
}

/* ───────────────────────────── Redis driver ──────────────────────────── */

const KEY = {
  row: (id: string) => `kulama:appt:${id}`,
  token: (token: string) => `kulama:token:${token}`,
  index: 'kulama:appts',
  overrides: 'kulama:overrides',
}

let redisClient: import('@upstash/redis').Redis | null = null

async function getRedis() {
  if (!redisClient) {
    const { Redis } = await import('@upstash/redis')
    redisClient = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  }
  return redisClient
}

/** Upstash decodes JSON automatically; tolerate both shapes. */
function parse(value: unknown): Appointment | null {
  if (!value) return null
  if (typeof value === 'string') {
    try {
      return JSON.parse(value) as Appointment
    } catch {
      return null
    }
  }
  return value as Appointment
}

const redisDriver: Driver = {
  async list() {
    const redis = await getRedis()
    // Newest first — the index is scored by creation time.
    const ids = await redis.zrange<string[]>(KEY.index, 0, -1, { rev: true })
    if (!ids.length) return []
    const rows = await redis.mget<unknown[]>(...ids.map(KEY.row))
    return rows.map(parse).filter((r): r is Appointment => r !== null)
  },
  async byToken(token) {
    const redis = await getRedis()
    const id = await redis.get<string>(KEY.token(token))
    return id ? parse(await redis.get(KEY.row(id))) : null
  },
  async byId(id) {
    const redis = await getRedis()
    return parse(await redis.get(KEY.row(id)))
  },
  async insert(a) {
    const redis = await getRedis()
    await Promise.all([
      redis.set(KEY.row(a.id), JSON.stringify(a)),
      redis.set(KEY.token(a.token), a.id),
      redis.zadd(KEY.index, { score: new Date(a.createdAt).getTime(), member: a.id }),
    ])
    return a
  },
  async patch(id, p) {
    const redis = await getRedis()
    const current = parse(await redis.get(KEY.row(id)))
    if (!current) return null
    const next: Appointment = {
      ...current,
      ...(p.status !== undefined && { status: p.status }),
      ...(p.date !== undefined && { date: p.date }),
      ...(p.time !== undefined && { time: p.time }),
      ...(p.proposedDate !== undefined && { proposedDate: p.proposedDate }),
      ...(p.proposedTime !== undefined && { proposedTime: p.proposedTime }),
      ...(p.adminMessage !== undefined && { adminMessage: p.adminMessage }),
      updatedAt: new Date().toISOString(),
    }
    await redis.set(KEY.row(id), JSON.stringify(next))
    return next
  },
  async overrides() {
    const redis = await getRedis()
    const raw = (await redis.hgetall<Record<string, string>>(KEY.overrides)) ?? {}
    return foldOverrides(
      Object.entries(raw).map(([field, state]) => {
        const [date, time] = field.split('|')
        return [date!, time!, state as SlotState]
      }),
    )
  },
  async setOverride(date, time, state) {
    const redis = await getRedis()
    const field = `\${date}|\${time}`
    if (state === null) await redis.hdel(KEY.overrides, field)
    else await redis.hset(KEY.overrides, { [field]: state })
  },
}

/* ───────────────────────────── File driver ───────────────────────────── */

const FILE = path.join(process.cwd(), '.data', 'appointments.json')
const OVERRIDES_FILE = path.join(process.cwd(), '.data', 'overrides.json')

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
  async overrides() {
    try {
      return JSON.parse(await readFile(OVERRIDES_FILE, 'utf8')) as Overrides
    } catch {
      return {}
    }
  },
  async setOverride(date, time, state) {
    const all = await fileDriver.overrides()
    if (state === null) {
      delete all[date]?.[time]
      if (all[date] && Object.keys(all[date]).length === 0) delete all[date]
    } else {
      ;(all[date] ??= {})[time] = state
    }
    await mkdir(path.dirname(OVERRIDES_FILE), { recursive: true })
    await writeFile(OVERRIDES_FILE, JSON.stringify(all, null, 2), 'utf8')
  },
}

const driver: Driver =
  storeKind === 'postgres' ? postgresDriver : storeKind === 'redis' ? redisDriver : fileDriver

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

export function listOverrides() {
  return driver.overrides()
}

export function setSlotOverride(date: string, time: string, state: SlotState | null) {
  return driver.setOverride(date, time, state)
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
