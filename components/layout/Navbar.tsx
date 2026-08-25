'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Instagram, Menu, Phone, X } from 'lucide-react'
import { nav, brand } from '@/lib/data'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  // The film intro is full-bleed and dark; the bar would be unreadable over it.
  const [behindIntro, setBehindIntro] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const intro = document.getElementById('intro')
    const onScroll = () => {
      setScrolled(window.scrollY > 16)
      setBehindIntro(
        intro
          ? window.scrollY < intro.offsetTop + intro.offsetHeight - window.innerHeight * 0.55
          : false,
      )
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pathname])

  // The menu takes over the screen; the page behind it must not scroll.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  // Route changes should never leave the overlay hanging around.
  useEffect(() => setOpen(false), [pathname])

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={behindIntro ? { y: -96, opacity: 0 } : { y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: behindIntro ? 'none' : 'auto' }}
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-[padding] duration-300',
        scrolled ? 'py-2' : 'py-4',
      )}
      aria-hidden={behindIntro}
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

      </div>

      {/* Full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex flex-col bg-[var(--color-brand-deep)] lg:hidden"
          >
            <div className="flex items-center justify-between px-6 pt-6">
              <span className="font-display text-2xl italic font-medium text-[var(--color-paper)]">
                {brand.name}.
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-11 w-11 place-items-center rounded-full border border-[rgba(244,236,226,0.25)] text-[var(--color-paper)]"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center px-6">
              <ul>
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.06 + i * 0.055,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="border-b border-[rgba(244,236,226,0.12)]"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between py-4 font-display text-4xl italic font-medium text-[var(--color-paper)]"
                    >
                      {item.label}
                      <span className="text-xs not-italic tracking-[0.3em] text-[var(--color-brand-gold)]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              className="px-6 pb-10"
            >
              <Link
                href="/rezervasyon"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-paper)] px-6 py-4 text-sm font-semibold text-[var(--color-ink-900)]"
              >
                Book Now <ArrowUpRight size={16} />
              </Link>
              <div className="mt-5 flex items-center justify-between text-sm text-[rgba(244,236,226,0.75)]">
                <a
                  href={`tel:${brand.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2"
                >
                  <Phone size={14} /> {brand.phone}
                </a>
                <a
                  href={brand.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <Instagram size={14} /> {brand.instagramHandle}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
