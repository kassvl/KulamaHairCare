'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Clock4, MapPin, Sparkles } from 'lucide-react'
import { brand } from '@/lib/data'

// Load R3F only on the client (it touches `window`/`OffscreenCanvas`).
const HairScene = dynamic(
  () => import('@/components/three/HairScene').then((m) => m.HairScene),
  { ssr: false, loading: () => null },
)

export function SplitHero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden pt-28 md:pt-32">
      {/* 3D layer — fixed full-bleed, behind everything */}
      <HairScene />

      {/* Editorial split */}
      <div className="relative z-10 mx-auto grid min-h-[calc(100svh-7rem)] max-w-[1400px] grid-cols-1 gap-12 px-6 lg:grid-cols-12">
        {/* LEFT — story */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-end pb-12 lg:col-span-5 lg:pb-20"
        >
          <p className="kbd">{brand.tagline}</p>
          <h1 className="mt-4 font-display text-5xl leading-[1.02] tracking-tight text-[var(--color-ink-900)] sm:text-6xl md:text-7xl">
            <span className="italic">Personalised</span>
            <br />
            hair care &amp;{' '}
            <span className="font-script not-italic text-[var(--color-brand-clay)]">
              braiding
            </span>
            .
          </h1>
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

        {/* CENTRE seam spacer (only renders on lg) — keeps grid aligned */}
        <div className="hidden lg:col-span-2 lg:block" />

        {/* RIGHT — booking quick card */}
        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-end pb-12 lg:col-span-5 lg:pb-20"
        >
          <BookingCard />
        </motion.aside>
      </div>

      {/* Subtle gradient at bottom so braids fade gracefully */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--color-paper)] to-transparent"
      />
    </section>
  )
}

function BookingCard() {
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
        <Stat icon={<MapPin size={14} />} label="studio" value="Rynek 12/3" />
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
