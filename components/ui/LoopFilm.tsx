'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * A short, silent studio clip that loops while it is on screen and rests on its
 * poster otherwise. Several of these share a page, so only the visible ones
 * spend battery and bandwidth: with `preload="none"` nothing downloads until
 * the first play. Reduced motion keeps the poster.
 */
export function LoopFilm({
  src,
  poster,
  className,
  eager = false,
}: {
  src: string
  poster: string
  className?: string
  /** Start loading immediately (above the fold). */
  eager?: boolean
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {
            // Autoplay refused (data saver); the poster stands in.
          })
        } else {
          el.pause()
        }
      },
      { rootMargin: '200px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduced])

  return (
    <video
      ref={ref}
      src={reduced ? undefined : src}
      poster={poster}
      muted
      loop
      playsInline
      preload={eager ? 'auto' : 'none'}
      aria-hidden
      className={cn('h-full w-full object-cover', className)}
    />
  )
}
