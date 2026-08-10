import { NextResponse } from 'next/server'
import { getAppointmentByToken, updateAppointment } from '@/lib/store'

export const dynamic = 'force-dynamic'

type Params = { params: Promise<{ token: string }> }

/** Everything the customer's own status page needs — no admin fields. */
function publicView(a: NonNullable<Awaited<ReturnType<typeof getAppointmentByToken>>>) {
  return {
    serviceTitle: a.serviceTitle,
    serviceSlug: a.serviceSlug,
    date: a.date,
    time: a.time,
    name: a.name,
    status: a.status,
    proposedDate: a.proposedDate,
    proposedTime: a.proposedTime,
    adminMessage: a.adminMessage,
    createdAt: a.createdAt,
    updatedAt: a.updatedAt,
  }
}

export async function GET(_request: Request, { params }: Params) {
  const { token } = await params
  const appointment = await getAppointmentByToken(token)
  if (!appointment) {
    return NextResponse.json({ error: 'Not found.' }, { status: 404 })
  }
  return NextResponse.json({ appointment: publicView(appointment) })
}

/**
 * The customer answering the studio: `accept` takes the proposed slot (which
 * becomes the real one), `decline` cancels the request.
 */
export async function POST(request: Request, { params }: Params) {
  const { token } = await params
  const appointment = await getAppointmentByToken(token)
  if (!appointment) {
    return NextResponse.json({ error: 'Not found.' }, { status: 404 })
  }

  let action: string
  try {
    action = (await request.json()).action
  } catch {
    return NextResponse.json({ error: 'Malformed request.' }, { status: 400 })
  }

  if (action === 'cancel') {
    if (appointment.status === 'declined' || appointment.status === 'cancelled') {
      return NextResponse.json({ error: 'This request is already closed.' }, { status: 409 })
    }
    const updated = await updateAppointment(appointment.id, { status: 'cancelled' })
    return NextResponse.json({ appointment: publicView(updated!) })
  }

  if (appointment.status !== 'proposed') {
    return NextResponse.json(
      { error: 'There is no alternative time waiting for your answer.' },
      { status: 409 },
    )
  }

  if (action === 'accept') {
    const updated = await updateAppointment(appointment.id, {
      status: 'confirmed',
      date: appointment.proposedDate ?? appointment.date,
      time: appointment.proposedTime ?? appointment.time,
      proposedDate: null,
      proposedTime: null,
    })
    return NextResponse.json({ appointment: publicView(updated!) })
  }

  if (action === 'decline') {
    const updated = await updateAppointment(appointment.id, {
      status: 'cancelled',
      proposedDate: null,
      proposedTime: null,
    })
    return NextResponse.json({ appointment: publicView(updated!) })
  }

  return NextResponse.json({ error: 'Unknown action.' }, { status: 400 })
}
