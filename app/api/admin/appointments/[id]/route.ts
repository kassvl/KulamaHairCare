import { NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'
import { isOpenOn, slotsFor } from '@/lib/appointments'
import { getAppointment, updateAppointment } from '@/lib/store'

export const dynamic = 'force-dynamic'

type Params = { params: Promise<{ id: string }> }

/**
 * The studio's answer to a request: confirm it as asked, offer a different
 * slot, or decline. `propose` parks it in `proposed` until the customer replies.
 */
export async function POST(request: Request, { params }: Params) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 })
  }

  const { id } = await params
  const appointment = await getAppointment(id)
  if (!appointment) {
    return NextResponse.json({ error: 'Not found.' }, { status: 404 })
  }

  let body: { action?: string; date?: string; time?: string; message?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Malformed request.' }, { status: 400 })
  }

  const message = body.message?.trim() ? body.message.trim() : null

  switch (body.action) {
    case 'confirm': {
      const updated = await updateAppointment(id, {
        status: 'confirmed',
        adminMessage: message,
        proposedDate: null,
        proposedTime: null,
      })
      return NextResponse.json({ appointment: updated })
    }

    case 'decline': {
      const updated = await updateAppointment(id, {
        status: 'declined',
        adminMessage: message,
        proposedDate: null,
        proposedTime: null,
      })
      return NextResponse.json({ appointment: updated })
    }

    case 'propose': {
      const { date, time } = body
      if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date) || !isOpenOn(date)) {
        return NextResponse.json(
          { error: 'Pick a date the studio is open.' },
          { status: 422 },
        )
      }
      if (!time || !slotsFor(date, appointment.serviceSlug).includes(time)) {
        return NextResponse.json(
          { error: 'That time is outside opening hours for this style.' },
          { status: 422 },
        )
      }
      const updated = await updateAppointment(id, {
        status: 'proposed',
        proposedDate: date,
        proposedTime: time,
        adminMessage: message,
      })
      return NextResponse.json({ appointment: updated })
    }

    case 'reopen': {
      const updated = await updateAppointment(id, {
        status: 'pending',
        proposedDate: null,
        proposedTime: null,
        adminMessage: null,
      })
      return NextResponse.json({ appointment: updated })
    }

    default:
      return NextResponse.json({ error: 'Unknown action.' }, { status: 400 })
  }
}
