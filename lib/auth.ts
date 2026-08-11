import 'server-only'
import { createHmac, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'

/**
 * Admin authentication — a single shared password for the studio owner.
 *
 * `ADMIN_PASSWORD` gates the login; the session is a signed, expiring cookie so
 * we never store the password itself in the browser. With no `ADMIN_PASSWORD`
 * configured, login always fails and the panel stays locked.
 */
export const COOKIE_NAME = 'kulama_admin'

const SESSION_HOURS = 12

function secret() {
  const value = process.env.ADMIN_SESSION_SECRET ?? process.env.ADMIN_PASSWORD
  return value ? `kulama:${value}` : null
}

export function adminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD)
}

function sign(payload: string, key: string) {
  return createHmac('sha256', key).update(payload).digest('base64url')
}

function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  if (bufA.length !== bufB.length) return false
  return timingSafeEqual(bufA, bufB)
}

export function checkPassword(candidate: string) {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) return false
  return safeEqual(candidate, expected)
}

/** `<expiresAt>.<signature>` — verifiable without any server-side session store. */
export function issueSessionToken() {
  const key = secret()
  if (!key) return null
  const expires = Date.now() + SESSION_HOURS * 60 * 60 * 1000
  return `${expires}.${sign(String(expires), key)}`
}

export function verifySessionToken(token: string | undefined) {
  const key = secret()
  if (!key || !token) return false

  const [expires, signature] = token.split('.')
  if (!expires || !signature) return false
  if (!safeEqual(signature, sign(expires, key))) return false

  return Number(expires) > Date.now()
}

/** True when the current request carries a valid admin session cookie. */
export async function isAuthenticated() {
  const jar = await cookies()
  return verifySessionToken(jar.get(COOKIE_NAME)?.value)
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: SESSION_HOURS * 60 * 60,
} as const
