'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Lock } from 'lucide-react'

export function AdminLogin({ configured }: { configured: boolean }) {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    setBusy(true)
    setError(null)
    try {
      const response = await fetch('/api/admin/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (response.ok) {
        router.refresh()
        return
      }
      const data = await response.json().catch(() => ({}))
      setError(data.error ?? 'Wrong password.')
    } catch {
      setError('Could not reach the server.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto flex min-h-[100svh] max-w-md flex-col justify-center px-6">
      <p className="font-display text-5xl italic font-medium text-[var(--color-ink-900)]">
        KULAMA.
      </p>
      <p className="kbd mt-2">studio desk</p>

      {!configured ? (
        <div className="card mt-8 p-6">
          <p className="text-sm leading-relaxed text-[var(--color-ink-700)]">
            The admin panel has no password set yet. Add an{' '}
            <code className="rounded bg-[var(--color-paper-2)] px-1.5 py-0.5 text-xs">
              ADMIN_PASSWORD
            </code>{' '}
            environment variable and redeploy to unlock it.
          </p>
        </div>
      ) : (
        <form onSubmit={submit} className="card mt-8 p-6">
          <label className="block">
            <span className="kbd">Password</span>
            <input
              type="password"
              value={password}
              autoFocus
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-2xl border border-[rgba(58,27,20,0.15)] bg-[var(--color-paper)] px-4 py-3 text-sm focus:border-[var(--color-brand-clay)] focus:outline-none"
            />
          </label>

          {error && <p className="mt-3 text-sm text-[var(--color-brand-clay)]">{error}</p>}

          <button
            type="submit"
            disabled={busy || password.length === 0}
            className="btn btn-primary mt-5 w-full justify-center disabled:opacity-60"
          >
            {busy ? (
              <>
                Checking <Loader2 size={16} className="animate-spin" />
              </>
            ) : (
              <>
                Unlock <Lock size={16} />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  )
}
