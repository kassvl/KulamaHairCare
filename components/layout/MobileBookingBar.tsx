'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, MessageCircle } from 'lucide-react'
import { brand } from '@/lib/data'

/**
 * A booking bar pinned to the bottom of small screens. It stays out of the way
 * during the film intro and on the pages where it would be redundant.
 */
export function MobileBookingBar() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)

  const redundant =
    pathname?.startsWith('/rezervasyon') || pathname?.startsWith('/admin')

  useEffect(() => {
    if (redundant) return setVisible(false)

    const intro = document.getElementById('intro')
    const onScroll = () => {
      // Clear the intro *and* the hero — the hero has its own call to action.
      const past = intro
        ? window.scrollY > intro.offsetTop + intro.offsetHeight + window.innerHeight * 0.7
        : window.scrollY > 320
      setVisible(past)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pathname, redundant])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-30 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] lg:hidden"
        >
          <div className="flex items-center gap-2 rounded-full border border-[rgba(244,236,226,0.14)] bg-[rgba(42,24,16,0.92)] p-1.5 pl-5 shadow-[0_18px_40px_-18px_rgba(20,10,6,0.9)] backdrop-blur-md">
            <div className="min-w-0 flex-1">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-brand-gold)]">
                taking new bookings
              </p>
              <p className="truncate font-display text-base italic text-[var(--color-paper)]">
                Reserve your seat
              </p>
            </div>

            <a
              href={`https://wa.me/${brand.phone.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message the studio on WhatsApp"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[rgba(244,236,226,0.25)] text-[var(--color-paper)]"
            >
              <MessageCircle size={17} />
            </a>
            <Link
              href="/rezervasyon"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--color-paper)] px-5 py-3 text-sm font-semibold text-[var(--color-ink-900)]"
            >
              Book <ArrowUpRight size={15} />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
