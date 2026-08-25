'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { brand } from '@/lib/data'
import { BookingCard } from '@/components/home/SplitHero'

/**
 * The phone's version of the editorial hero. The desktop layout leans on a
 * pinned stage and a wide split, neither of which survives a 390px screen — so
 * here the work itself carries the screen and the type sits on top of it.
 */
export function MobileHero() {
  const frame = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: frame,
    offset: ['start start', 'end start'],
  })
  // A slow drift on the plate, a faster one on the type: depth without a pin.
  const plateY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const typeY = useTransform(scrollYProgress, [0, 1], ['0%', '-22%'])
  const typeOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <div className="md:hidden">
      <section
        ref={frame}
        className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden"
      >
        <motion.div
          style={reduced ? undefined : { y: plateY }}
          className="absolute inset-0 -top-[8%] h-[116%]"
        >
          <Image
            src="/img/goddess-braids.jpg"
            alt="Goddess braids by KULAMA"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        {/* Enough shade for the type, not so much that the work disappears */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(20,10,6,0.92)_8%,rgba(20,10,6,0.55)_42%,rgba(20,10,6,0.18)_100%)]"
        />

        <motion.div
          style={reduced ? undefined : { y: typeY, opacity: typeOpacity }}
          className="relative z-10 px-6 pb-20"
        >
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[var(--color-brand-gold)]">
            {brand.tagline}
          </p>
          <h2 className="mt-4 font-display text-[3.4rem] leading-[0.98] tracking-tight text-[var(--color-paper)]">
            <span className="italic">Personalised</span>
            <br />
            hair care &amp;{' '}
            <span className="font-script not-italic text-[var(--color-brand-gold)]">braiding</span>.
          </h2>
          <p className="mt-5 max-w-[34ch] text-[0.95rem] leading-relaxed text-[rgba(244,236,226,0.82)]">
            KULAMA gives you expert styling, premium aftercare, and the calm of a studio that
            takes your hair as seriously as you do.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="/rezervasyon"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-paper)] px-6 py-3.5 text-sm font-semibold text-[var(--color-ink-900)]"
            >
              Book Now <ArrowUpRight size={16} />
            </Link>
            <Link
              href="/galeri"
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(244,236,226,0.35)] px-6 py-3.5 text-sm font-semibold text-[var(--color-paper)]"
            >
              View the gallery
            </Link>
          </div>
        </motion.div>
      </section>

      <div className="px-6 py-14">
        <BookingCard />
      </div>
    </div>
  )
}
