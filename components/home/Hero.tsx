'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { LoopFilm } from '@/components/ui/LoopFilm'
import { brand } from '@/lib/data'
import { heroFilms } from '@/lib/content'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * The entrance: three real studio clips, shot upright on a phone, stand side
 * by side like a contact strip; the wordmark sits across their feet. A phone
 * gets one clip, full screen. This is the page's single orchestrated moment —
 * the films open in turn, then the name rises — everything after it is still.
 */
export function Hero() {
  const reduced = useReducedMotion()
  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: EASE },
        }

  return (
    <section
      id="intro"
      aria-label={brand.fullName}
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-[var(--color-brand-deep)] text-[var(--color-paper)]"
    >
      {/* Films */}
      <div aria-hidden className="absolute inset-0 -z-10">
        {/* Phone: one clip */}
        <div className="absolute inset-0 md:hidden">
          <LoopFilm src={heroFilms.mobile.src} poster={heroFilms.mobile.poster} eager />
        </div>

        {/* Pointer screens: the strip */}
        <div className="absolute inset-0 hidden grid-cols-3 gap-[3px] md:grid">
          {heroFilms.strip.map((film, i) => (
            <motion.div
              key={film.src}
              className="relative overflow-hidden"
              {...(reduced
                ? {}
                : {
                    initial: { clipPath: 'inset(100% 0 0 0)' },
                    animate: { clipPath: 'inset(0% 0 0 0)' },
                    transition: { duration: 1.1, delay: 0.1 + i * 0.14, ease: EASE },
                  })}
            >
              <LoopFilm src={film.src} poster={film.poster} eager />
            </motion.div>
          ))}
        </div>

        {/* Ground the type: dark from the floor up, a little from the ceiling for the bar */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(28,16,10,0.96)_0%,rgba(28,16,10,0.72)_30%,rgba(28,16,10,0.08)_62%,rgba(28,16,10,0.42)_100%)]" />
      </div>

      <div className="mx-auto w-full max-w-[1480px] px-5 pb-10 md:px-8 md:pb-12">
        <div className="overflow-hidden">
          <motion.h1
            {...rise(0.55)}
            className="-ml-[0.04em] font-display text-[27vw] font-medium leading-[0.8] tracking-[-0.045em] md:text-[length:min(28vw,26rem)]"
          >
            Kulama
          </motion.h1>
        </div>

        <motion.div
          {...rise(0.8)}
          className="mt-6 flex flex-col gap-6 border-t border-[rgba(201,161,90,0.45)] pt-5 md:mt-8 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-[34ch] text-[1.05rem] leading-snug text-[rgba(241,232,216,0.88)] md:text-lg">
            Locs, braids and cornrows, done by hand at {brand.address.split(',')[0]} in
            Wrocław.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href="/rezervasyon" className="btn btn-light">
              Book an appointment
            </Link>
            <Link href="/pricing" className="btn btn-outline-light">
              See prices
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
