'use client'

import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { brand } from '@/lib/data'

/** Fraction of the scroll track spent scrubbing before the type arrives. */
const SCRUB_END = 0.62

/**
 * The entrance. A tall scroll track pins one stage; scrolling scrubs the film
 * frame by frame instead of playing it. Once the film has run its length the
 * wordmark and the line settle over the last frame, then the stage dissolves
 * into paper for the rest of the site.
 */
export function VideoIntro() {
  const track = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const wanted = useRef(0)
  const [duration, setDuration] = useState(0)
  // Driven by a state flag, not a motion value: the cue must actually leave the
  // tree once scrolling starts, not merely fade to a transparent overlay.
  const [cueVisible, setCueVisible] = useState(true)
  const reduced = useReducedMotion()
  const onStage = useInView(track, { margin: '0px 0px -20% 0px' })

  const { scrollYProgress } = useScroll({
    target: track,
    offset: ['start start', 'end end'],
  })

  // Pick the lighter cut on small screens; both are all-intra so seeking is exact.
  useEffect(() => {
    const el = video.current
    if (!el) return
    const small = window.matchMedia('(max-width: 768px)').matches
    el.src = small ? '/video/braids-mobile.mp4' : '/video/braids.mp4'
    el.load()
  }, [])

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    setCueVisible(p < 0.08)
    if (!duration) return
    wanted.current = Math.min(Math.max(p / SCRUB_END, 0), 1) * duration
  })

  // Chase the scroll position rather than snapping to it — the easing is what
  // makes a scrubbed film read as motion instead of a slideshow.
  useEffect(() => {
    if (reduced || !onStage) return
    let frame = 0
    const tick = () => {
      const el = video.current
      if (el && el.readyState >= 2) {
        const drift = wanted.current - el.currentTime
        if (Math.abs(drift) > 0.008) el.currentTime += drift * 0.22
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [reduced, onStage])

  // Reduced motion: skip the scrub, hold the closing frame.
  useEffect(() => {
    if (!reduced || !duration) return
    const el = video.current
    if (el) el.currentTime = duration - 0.05
  }, [reduced, duration])

  const filmScale = useTransform(scrollYProgress, [0, 1], [1.1, 1])
  const paperVeil = useTransform(scrollYProgress, [0.46, 0.78], [0, 0.66])
  const exitVeil = useTransform(scrollYProgress, [0.94, 1], [0, 1])

  const markOpacity = useTransform(scrollYProgress, [0.6, 0.74], [0, 1])
  const markY = useTransform(scrollYProgress, [0.6, 0.74], [56, 0])
  const lineOpacity = useTransform(scrollYProgress, [0.71, 0.84], [0, 1])
  const lineY = useTransform(scrollYProgress, [0.71, 0.84], [32, 0])

  return (
    <section
      ref={track}
      id="intro"
      className="relative isolate z-20 h-[300svh] md:h-[340svh]"
      aria-label={`${brand.fullName} introduction`}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[var(--color-brand-deep)]">
        <motion.video
          ref={video}
          muted
          playsInline
          preload="auto"
          poster="/video/braids-poster.jpg"
          aria-hidden
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
          style={reduced ? undefined : { scale: filmScale }}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Warms the film into the site's palette */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,transparent_35%,rgba(42,24,16,0.45)_100%)]"
        />

        {/* Paper wash — lifts the frame toward the page as the type arrives */}
        <motion.div
          aria-hidden
          style={reduced ? { opacity: 0.62 } : { opacity: paperVeil }}
          className="pointer-events-none absolute inset-0 bg-[var(--color-paper)]"
        />

        {/* Local scrim — keeps the type legible over the braids beneath it */}
        <motion.div
          aria-hidden
          style={reduced ? { opacity: 1 } : { opacity: markOpacity }}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_50%,var(--color-paper)_18%,rgba(244,236,226,0.55)_55%,transparent_78%)]"
        />

        {/* Wordmark + line */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            style={reduced ? undefined : { opacity: markOpacity, y: markY }}
          >
            <h1 className="font-display text-[15vw] italic font-medium leading-[0.9] tracking-tight text-[var(--color-ink-900)] md:text-[11vw]">
              {brand.name}
            </h1>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.42em] text-[var(--color-brand-clay)] md:mt-5 md:text-sm">
              Hair Care &amp; Braids
            </p>
          </motion.div>

          <motion.p
            style={reduced ? undefined : { opacity: lineOpacity, y: lineY }}
            className="mt-8 max-w-[22ch] font-display text-2xl italic leading-tight text-[var(--color-ink-900)] md:mt-10 md:max-w-[28ch] md:text-4xl"
          >
            Personalised hair care &amp;{' '}
            <span className="font-script not-italic text-[var(--color-brand-clay)]">braiding</span>.
          </motion.p>
        </div>

        {/* Scroll cue */}
        <motion.div
          aria-hidden
          initial={{ opacity: 1 }}
          animate={{ opacity: cueVisible && !reduced ? 1 : 0 }}
          transition={{ duration: 0.35 }}
          className="pointer-events-none absolute inset-x-0 bottom-10 flex flex-col items-center gap-3"
        >
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[rgba(244,236,226,0.92)] drop-shadow-[0_1px_6px_rgba(20,10,6,0.7)]">
            {brand.tagline}
          </span>
          <span className="scroll-cue block h-12 w-px bg-gradient-to-b from-transparent via-[rgba(244,236,226,0.75)] to-transparent" />
        </motion.div>

        {/* Dissolve into the page */}
        <motion.div
          aria-hidden
          style={reduced ? { opacity: 0 } : { opacity: exitVeil }}
          className="pointer-events-none absolute inset-0 bg-[var(--color-paper)]"
        />
      </div>
    </section>
  )
}
