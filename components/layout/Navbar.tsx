'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Instagram, Menu, Phone, X } from 'lucide-react'
import { nav, brand } from '@/lib/data'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  // Over the dark film entrance the bar turns light-on-dark.
  const [onDark, setOnDark] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const intro = document.getElementById('intro')
    const onScroll = () => {
      setScrolled(window.scrollY > 16)
      setOnDark(intro ? window.scrollY < intro.offsetTop + intro.offsetHeight - 72 : false)
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
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300',
        onDark
          ? 'border-transparent text-[var(--color-paper)]'
          : scrolled
            ? 'border-[rgba(35,20,13,0.12)] bg-[rgba(241,232,216,0.92)] text-[var(--color-ink-900)] backdrop-blur-md'
            : 'border-transparent text-[var(--color-ink-900)]',
      )}
    >
      <div className="mx-auto max-w-[1480px] px-5 md:px-8">
        <nav className="flex h-16 items-center justify-between md:h-[4.5rem]">
          <Link
            href="/"
            className="font-display text-[1.65rem] font-medium tracking-[-0.02em]"
            aria-label={brand.fullName}
          >
            Kulama
          </Link>

          <ul className="hidden items-center gap-7 lg:flex">
            {nav.slice(2).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  className="text-sm font-medium opacity-80 underline-offset-[6px] transition-opacity hover:opacity-100 aria-[current=page]:underline aria-[current=page]:opacity-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href="/rezervasyon"
              className={cn(
                'btn hidden !py-2.5 sm:inline-flex',
                onDark ? 'btn-light' : 'btn-primary',
              )}
            >
              Book an appointment
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className={cn(
                'grid h-10 w-10 place-items-center rounded-[2px] border lg:hidden',
                onDark ? 'border-[rgba(241,232,216,0.4)]' : 'border-[rgba(35,20,13,0.2)]',
              )}
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
              <span className="font-display text-[1.65rem] font-medium text-[var(--color-paper)]">
                Kulama
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-11 w-11 place-items-center rounded-[2px] border border-[rgba(244,236,226,0.25)] text-[var(--color-paper)]"
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
                      className="block py-4 font-display text-4xl font-medium text-[var(--color-paper)]"
                    >
                      {item.label}
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
                className="btn btn-light w-full justify-center !py-4"
              >
                Book an appointment
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
