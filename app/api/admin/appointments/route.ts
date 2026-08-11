import { NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'
import { listAppointments, storeKind } from '@/lib/store'

export const dynamic = 'force-dynamic'

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 })
  }

  try {
    return NextResponse.json({
      appointments: await listAppointments(),
      storeKind,
    })
  } catch (err) {
    console.error('[admin] list failed', err)
    return NextResponse.json({ error: 'Could not load requests.' }, { status: 500 })
  }
}
