'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { brand } from '@/lib/data'

/** Fraction of the run spent on the film before the type arrives. */
const FILM_END = 0.62

/**
 * The entrance.
 *
 * On a pointer device the film is *scrubbed*: a tall track pins the stage and
 * scrolling walks the footage frame by frame. On a phone that gesture is
 * unreliable — iOS throttles seeking and the track would swallow the first few
 * swipes — so the film simply plays itself, then hands off to the page.
 *
 * Both paths drive one `stage` value (0→1), so the choreography of wordmark,
 * strapline and veils is written once.
 */
export function VideoIntro() {
  const track = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const wanted = useRef(0)
  const handedOff = useRef(false)

  /**
   * `scrub` — pointer device, scroll walks the footage.
   * `play`  — phone, the film runs on its own clock.
   * `still` — reduced motion, or a phone that refused to autoplay: hold the
   *           closing frame with the type already resolved.
   */
  const [mode, setMode] = useState<'pending' | 'scrub' | 'play' | 'still'>('pending')
  const [duration, setDuration] = useState(0)
  const [cueVisible, setCueVisible] = useState(true)

  const reduced = useReducedMotion()
  const onStage = useInView(track, { margin: '0px 0px -20% 0px' })

  const { scrollYProgress } = useScroll({
    target: track,
    offset: ['start start', 'end end'],
  })

  const stage = useMotionValue(0)

  /* ── Which path are we on? ─────────────────────────────────────── */
  useEffect(() => {
    const el = video.current
    if (!el) return

    const small = window.matchMedia('(max-width: 768px)').matches
    el.src = small ? '/video/braids-mobile.mp4' : '/video/braids.mp4'
    el.load()

    if (reduced) return setMode('still')
    if (!small) return setMode('scrub')

    // Muted + inline is what lets a phone start a video without a tap.
    el.muted = true
    el.playsInline = true
    el.play().then(
      () => setMode('play'),
      // Data-saver or a locked-down browser refused; skip to the type.
      () => setMode('still'),
    )
  }, [reduced])

  /* ── Desktop: scroll drives the stage ──────────────────────────── */
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (mode !== 'scrub') return
    setCueVisible(p < 0.08)
    stage.set(p)
    if (duration) wanted.current = Math.min(Math.max(p / FILM_END, 0), 1) * duration
  })

  // Chase the scroll position rather than snapping to it — the easing is what
  // makes a scrubbed film read as motion instead of a slideshow.
  useEffect(() => {
    if (mode !== 'scrub' || !onStage) return
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
  }, [mode, onStage])

  /* ── Mobile: playback drives the stage ─────────────────────────── */
  const onTimeUpdate = useCallback(() => {
    const el = video.current
    if (mode !== 'play' || !el?.duration) return
    stage.set((el.currentTime / el.duration) * FILM_END)
  }, [mode, stage])

  /**
   * The film is spent: resolve the type, hold it for a beat, then hand the
   * screen to the page. Stops short of 1 so the exit veil never covers the
   * wordmark — the handoff is the scroll, not a fade to blank paper.
   */
  const finish = useCallback(() => {
    if (handedOff.current) return
    handedOff.current = true
    setCueVisible(false)
    animate(stage, 0.9, { duration: 1.2, ease: [0.22, 1, 0.36, 1] })
    window.setTimeout(() => {
      // Only if they haven't already started exploring on their own.
      if (window.scrollY < 40) {
        document
          .getElementById('intro')
          ?.nextElementSibling?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 1900)
  }, [stage])

  // No scrub, no playback — hold the closing frame with the type resolved.
  useEffect(() => {
    if (mode !== 'still' || !duration) return
    const el = video.current
    if (el) el.currentTime = duration - 0.05
    stage.set(0.9)
    setCueVisible(false)
  }, [mode, duration, stage])

  /* ── Choreography ──────────────────────────────────────────────── */
  const filmScale = useTransform(stage, [0, 1], [1.1, 1])
  const paperVeil = useTransform(stage, [0.46, 0.78], [0, 0.66])
  const exitVeil = useTransform(stage, [0.94, 1], [0, 1])
  const markOpacity = useTransform(stage, [0.6, 0.74], [0, 1])
  const markY = useTransform(stage, [0.6, 0.74], [56, 0])
  const lineOpacity = useTransform(stage, [0.71, 0.84], [0, 1])
  const lineY = useTransform(stage, [0.71, 0.84], [32, 0])

  return (
    <section
      ref={track}
      id="intro"
      // Phones get a single screen — the film runs on its own clock. Pointer
      // devices get a long track to scrub along.
      className="relative isolate z-20 h-[100svh] md:h-[340svh]"
      aria-label={`${brand.fullName} introduction`}
    >
      <div className="h-[100svh] overflow-hidden bg-[var(--color-brand-deep)] md:sticky md:top-0">
        <motion.video
          ref={video}
          muted
          playsInline
          preload="auto"
          poster="/video/braids-poster.jpg"
          aria-hidden
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
          onTimeUpdate={onTimeUpdate}
          onEnded={() => mode === 'play' && finish()}
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
          style={{ opacity: paperVeil }}
          className="pointer-events-none absolute inset-0 bg-[var(--color-paper)]"
        />

        {/* Local scrim — keeps the type legible over the braids beneath it */}
        <motion.div
          aria-hidden
          style={{ opacity: markOpacity }}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_50%,var(--color-paper)_18%,rgba(244,236,226,0.55)_55%,transparent_78%)]"
        />

        {/* Wordmark + line */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <motion.div style={{ opacity: markOpacity, y: markY }}>
            <h1 className="font-display text-[15vw] italic font-medium leading-[0.9] tracking-tight text-[var(--color-ink-900)] md:text-[11vw]">
              {brand.name}
            </h1>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.42em] text-[var(--color-brand-clay)] md:mt-5 md:text-sm">
              Hair Care &amp; Braids
            </p>
          </motion.div>

          <motion.p
            style={{ opacity: lineOpacity, y: lineY }}
            className="mt-8 max-w-[22ch] font-display text-2xl italic leading-tight text-[var(--color-ink-900)] md:mt-10 md:max-w-[28ch] md:text-4xl"
          >
            Personalised hair care &amp;{' '}
            <span className="font-script not-italic text-[var(--color-brand-clay)]">braiding</span>.
          </motion.p>
        </div>

        {/* An escape hatch while the film runs — nobody should feel held */}
        {mode === 'play' && !handedOff.current && (
          <button
            type="button"
            onClick={finish}
            className="absolute right-5 top-5 z-10 rounded-full bg-[rgba(20,10,6,0.45)] px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[rgba(244,236,226,0.95)] backdrop-blur-sm md:hidden"
          >
            Skip
          </button>
        )}

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
          style={{ opacity: exitVeil }}
          className="pointer-events-none absolute inset-0 bg-[var(--color-paper)]"
        />
      </div>
    </section>
  )
}
