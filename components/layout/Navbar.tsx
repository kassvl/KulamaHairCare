'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { nav, brand } from '@/lib/data'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-300',
        scrolled ? 'py-2' : 'py-4',
      )}
    >
      <div className="mx-auto max-w-[1400px] px-6">
        <nav
          className={cn(
            'flex items-center justify-between rounded-full border px-4 py-2.5 backdrop-blur-md transition-all duration-300',
            scrolled
              ? 'border-[rgba(58,27,20,0.15)] bg-[rgba(244,236,226,0.85)] shadow-[0_8px_24px_-8px_rgba(58,27,20,0.18)]'
              : 'border-transparent bg-[rgba(244,236,226,0.45)]',
          )}
        >
          <Link
            href="/"
            className="font-display text-2xl italic font-medium tracking-tight text-[var(--color-ink-900)]"
            aria-label={brand.fullName}
          >
            {brand.name}.
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.slice(1, 6).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-3.5 py-1.5 text-sm font-medium text-[var(--color-ink-700)] transition-colors hover:bg-[rgba(58,27,20,0.06)] hover:text-[var(--color-ink-900)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href="/rezervasyon"
              className="btn btn-primary hidden sm:inline-flex"
            >
              Book Now
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="grid h-10 w-10 place-items-center rounded-full border border-[rgba(58,27,20,0.15)] text-[var(--color-ink-900)] lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 space-y-1 rounded-3xl border border-[rgba(58,27,20,0.12)] bg-[var(--color-paper)] p-3 lg:hidden"
          >
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-sm font-medium text-[var(--color-ink-900)] hover:bg-[rgba(58,27,20,0.06)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </div>
    </motion.header>
  )
}
