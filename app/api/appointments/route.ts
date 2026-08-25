import { NextResponse } from 'next/server'
import { validateBooking, type BookingInput } from '@/lib/appointments'
import { createAppointment, listOverrides, takenSlots } from '@/lib/store'

export const dynamic = 'force-dynamic'

/** What the booking form needs to know before it can offer a slot. */
export async function GET() {
  try {
    const [taken, overrides] = await Promise.all([takenSlots(), listOverrides()])
    return NextResponse.json({ taken, overrides })
  } catch (err) {
    console.error('[appointments] diary unavailable', err)
    return NextResponse.json(
      { taken: {}, overrides: {}, error: 'diary-unavailable' },
      { status: 503 },
    )
  }
}

/** Creates a booking *request* — it stays `pending` until the studio answers. */
export async function POST(request: Request) {
  let body: Partial<BookingInput> & { company?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Malformed request.' }, { status: 400 })
  }

  // Honeypot: real people never fill a field they cannot see.
  if (body.company) {
    return NextResponse.json({ error: 'Rejected.' }, { status: 400 })
  }

  let overrides
  try {
    overrides = await listOverrides()
  } catch (err) {
    console.error('[appointments] overrides unavailable', err)
    return NextResponse.json(
      { error: 'We could not reach the diary. Please try again in a moment.' },
      { status: 503 },
    )
  }

  const errors = validateBooking(body, overrides)
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 })
  }

  const taken = await takenSlots()
  if (taken[body.date!]?.includes(body.time!)) {
    return NextResponse.json(
      { errors: { time: 'That slot was just taken — please pick another.' } },
      { status: 409 },
    )
  }

  try {
    const appointment = await createAppointment(body as BookingInput)
    return NextResponse.json(
      { token: appointment.token, status: appointment.status },
      { status: 201 },
    )
  } catch (err) {
    console.error('[appointments] create failed', err)
    return NextResponse.json(
      { error: 'We could not save your request. Please try again or call the studio.' },
      { status: 500 },
    )
  }
}
