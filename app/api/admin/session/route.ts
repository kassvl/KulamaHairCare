import { NextResponse } from 'next/server'
import {
  COOKIE_NAME,
  adminConfigured,
  checkPassword,
  issueSessionToken,
  sessionCookieOptions,
} from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  if (!adminConfigured()) {
    return NextResponse.json(
      { error: 'Admin access is not configured yet. Set ADMIN_PASSWORD.' },
      { status: 503 },
    )
  }

  let password = ''
  try {
    password = String((await request.json()).password ?? '')
  } catch {
    return NextResponse.json({ error: 'Malformed request.' }, { status: 400 })
  }

  if (!checkPassword(password)) {
    return NextResponse.json({ error: 'Wrong password.' }, { status: 401 })
  }

  const token = issueSessionToken()
  if (!token) {
    return NextResponse.json({ error: 'Could not start a session.' }, { status: 500 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set(COOKIE_NAME, token, sessionCookieOptions)
  return response
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true })
  response.cookies.set(COOKIE_NAME, '', { ...sessionCookieOptions, maxAge: 0 })
  return response
}
