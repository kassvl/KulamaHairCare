'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

/**
 * A full-bleed image band that drifts against the page as it passes through the
 * viewport. The plate is over-scaled so the drift never exposes an edge.
 */
export function ParallaxPlate({
  src,
  alt,
  caption,
  className,
}: {
  src: string
  alt: string
  caption?: string
  className?: string
}) {
  const frame = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: frame,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-9%', '9%'])

  return (
    <div
      ref={frame}
      className={
        'relative overflow-hidden rounded-3xl border border-[rgba(58,27,20,0.12)] ' +
        (className ?? '')
      }
    >
      <motion.div style={reduced ? undefined : { y }} className="absolute inset-0 scale-[1.22]">
        <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
      </motion.div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(20,10,6,0.6),transparent_55%)]"
      />

      {caption && (
        <p className="absolute inset-x-0 bottom-0 p-6 font-script text-2xl text-[var(--color-brand-gold)] md:p-8 md:text-3xl">
          {caption}
        </p>
      )}
    </div>
  )
}
