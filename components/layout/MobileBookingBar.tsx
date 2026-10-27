'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
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
      // The entrance has its own call to action; appear once it has gone by.
      const past = intro
        ? window.scrollY > intro.offsetTop + intro.offsetHeight - window.innerHeight * 0.2
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
          <div className="flex items-center gap-2 rounded-[3px] border border-[rgba(201,161,90,0.3)] bg-[rgba(28,16,10,0.94)] p-1.5 pl-4 shadow-[0_18px_40px_-18px_rgba(20,10,6,0.9)] backdrop-blur-md">
            <p className="min-w-0 flex-1 truncate font-display text-lg font-medium text-[var(--color-paper)]">
              Kulama
            </p>

            <a
              href={`https://wa.me/${brand.phone.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message the studio on WhatsApp"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-[2px] border border-[rgba(244,236,226,0.25)] text-[var(--color-paper)]"
            >
              <MessageCircle size={17} />
            </a>
            <Link
              href="/rezervasyon"
              className="btn btn-light shrink-0 !px-5 !py-3"
            >
              Book an appointment
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
