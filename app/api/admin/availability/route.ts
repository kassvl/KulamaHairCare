import { NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'
import { everySlot, type SlotState } from '@/lib/appointments'
import { listOverrides, setSlotOverride, takenSlots } from '@/lib/store'

export const dynamic = 'force-dynamic'

/** The diary: which slots are closed, which were opened, which are spoken for. */
export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 })
  }
  try {
    const [overrides, taken] = await Promise.all([listOverrides(), takenSlots()])
    return NextResponse.json({ overrides, taken })
  } catch (err) {
    console.error('[availability] load failed', err)
    return NextResponse.json({ error: 'Could not load the diary.' }, { status: 500 })
  }
}

/**
 * Opens or closes a single slot. `state: null` drops the override and lets the
 * regular opening hours decide again.
 */
export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 })
  }

  let body: { date?: string; time?: string; state?: SlotState | null }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Malformed request.' }, { status: 400 })
  }

  const { date, time } = body
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'Pick a valid date.' }, { status: 422 })
  }
  if (!time || !everySlot().includes(time)) {
    return NextResponse.json({ error: 'That time is outside the day.' }, { status: 422 })
  }
  if (body.state !== 'open' && body.state !== 'blocked' && body.state !== null) {
    return NextResponse.json({ error: 'Unknown state.' }, { status: 400 })
  }

  try {
    await setSlotOverride(date, time, body.state)
    return NextResponse.json({ overrides: await listOverrides() })
  } catch (err) {
    console.error('[availability] save failed', err)
    return NextResponse.json({ error: 'Could not save that change.' }, { status: 500 })
  }
}
