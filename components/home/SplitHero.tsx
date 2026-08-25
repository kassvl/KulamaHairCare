'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, Clock4, MapPin, Sparkles } from 'lucide-react'
import { brand } from '@/lib/data'

/**
 * The entrance: a tall scroll track with a pinned stage. Each layer — watermark,
 * headline, booking card, veil — is driven off the same scroll progress at a
 * different rate, so the composition separates in depth as you come down the page.
 */
export function SplitHero() {
  const track = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [isPhone, setIsPhone] = useState(false)

  // On a phone this section lays out normally: no pinned stage, no veil. The
  // pinned version only has ~250px of travel there, which drained the content
  // to blank paper for the rest of the scroll.
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const sync = () => setIsPhone(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const flat = isPhone || reduced

  const { scrollYProgress } = useScroll({
    target: track,
    offset: ['start start', 'end start'],
  })

  // Springing the progress keeps the layers from jittering against Lenis.
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  // Depth ladder — furthest layer drifts least, nearest travels most.
  const watermarkY = useTransform(progress, [0, 1], ['0%', '-46%'])
  const watermarkOpacity = useTransform(progress, [0, 0.55], [1, 0])
  const textY = useTransform(progress, [0, 1], ['0%', '-88%'])
  const textOpacity = useTransform(progress, [0, 0.62], [1, 0])
  const cardY = useTransform(progress, [0, 1], ['0%', '-128%'])
  const cardOpacity = useTransform(progress, [0, 0.68], [1, 0])
  const veilOpacity = useTransform(progress, [0.15, 0.85], [0, 1])

  return (
    <section
      ref={track}
      className="relative isolate hidden md:block md:h-[150svh]"
      aria-label="Book a seat at KULAMA"
    >
      <div className="flex flex-col justify-center overflow-hidden py-24 md:sticky md:top-0 md:h-[100svh] md:py-0 md:pt-32">
        {/* Depth 0 — oversized wordmark, the slowest thing on screen */}
        <motion.div
          aria-hidden
          style={flat ? undefined : { y: watermarkY, opacity: watermarkOpacity }}
          className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 select-none text-center md:block"
        >
          <span className="font-display text-[26vw] italic font-medium leading-none tracking-tight text-[rgba(58,27,20,0.055)]">
            {brand.name}
          </span>
        </motion.div>

        {/* Editorial split */}
        <div className="relative z-10 mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-12 px-6 lg:grid-cols-12">
          {/* LEFT — story */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <motion.div style={flat ? undefined : { y: textY, opacity: textOpacity }}>
              <p className="kbd">{brand.tagline}</p>
              <h2 className="mt-4 font-display text-5xl leading-[1.02] tracking-tight text-[var(--color-ink-900)] sm:text-6xl md:text-7xl">
                <span className="italic">Personalised</span>
                <br />
                hair care &amp;{' '}
                <span className="font-script not-italic text-[var(--color-brand-clay)]">
                  braiding
                </span>
                .
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--color-ink-700)] md:text-lg">
                KULAMA gives you expert styling, premium aftercare, and the calm of a
                studio that takes your hair as seriously as you do.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/rezervasyon" className="btn btn-primary group">
                  Book Now
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
                <Link href="/galeri" className="btn btn-ghost">
                  View the gallery
                </Link>
              </div>
            </motion.div>
          </motion.div>

          {/* CENTRE seam spacer (only renders on lg) — keeps grid aligned */}
          <div className="hidden lg:col-span-2 lg:block" />

          {/* RIGHT — booking quick card */}
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <motion.div style={flat ? undefined : { y: cardY, opacity: cardOpacity }}>
              <BookingCard />
            </motion.div>
          </motion.aside>
        </div>

        {/* Veil — closes the entrance so the next section arrives on clean paper */}
        <motion.div
          aria-hidden
          style={flat ? { opacity: 0 } : { opacity: veilOpacity }}
          className="pointer-events-none absolute inset-0 bg-[var(--color-paper)]"
        />

        {/* Subtle gradient at bottom so braids fade gracefully */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--color-paper)] to-transparent"
        />
      </div>
    </section>
  )
}

export function BookingCard() {
  return (
    <div className="card relative overflow-hidden p-7 md:p-8">
      <div className="flex items-center justify-between">
        <p className="kbd flex items-center gap-2 text-[var(--color-ink-700)]">
          <span className="live-dot block h-1.5 w-1.5 rounded-full bg-[var(--color-brand-gold)]" />
          taking new bookings
        </p>
        <Sparkles size={16} className="text-[var(--color-brand-gold)]" />
      </div>

      <p className="mt-5 font-display text-2xl italic leading-tight text-[var(--color-ink-900)] md:text-3xl">
        Reserve your seat at the chair.
      </p>
      <p className="mt-2 text-sm text-[var(--color-ink-700)]">
        Pick a style and a date — we&rsquo;ll confirm with you within 24 hours.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <Stat icon={<Clock4 size={14} />} label="lead time" value="2–7 days" />
        <Stat icon={<MapPin size={14} />} label="studio" value="Pl. Grunwaldzki" />
        <Stat label="happy clients" value={brand.stats.clients} accent />
        <Stat label="years of practice" value={brand.stats.years} accent />
      </div>

      <Link
        href="/rezervasyon"
        className="btn btn-primary group mt-6 w-full justify-center"
      >
        Open the booking flow
        <ArrowUpRight
          size={16}
          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </Link>

      <p className="mt-4 text-center font-script text-base text-[var(--color-brand-gold)]">
        see you in the chair ✦
      </p>
    </div>
  )
}

function Stat({
  icon,
  label,
  value,
  accent,
}: {
  icon?: React.ReactNode
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div className="rounded-2xl border border-[rgba(58,27,20,0.1)] bg-[rgba(244,236,226,0.6)] p-4">
      <p className="kbd flex items-center gap-1.5">
        {icon}
        {label}
      </p>
      <p
        className={
          'mt-1.5 ' +
          (accent
            ? 'stat-number'
            : 'font-display text-xl italic text-[var(--color-ink-900)]')
        }
      >
        {value}
      </p>
    </div>
  )
}
