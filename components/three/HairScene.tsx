'use client'

import { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { Head } from './Head'
import { Braid } from './Braid'

interface HairSceneProps {
  /** Number of braids — keep low (8–14) for perf */
  count?: number
}

/**
 * The full-bleed pointer-events-none R3F overlay. The Canvas is fixed to the
 * viewport and the camera looks slightly down so braids appear to fall onto
 * the page.
 */
export function HairScene({ count = 11 }: HairSceneProps) {
  // Pre-compute braid anchor points as a hemisphere ring on the scalp.
  const braids = useMemo(() => {
    const list: { anchorX: number; anchorZ: number; phase: number; amp: number; freq: number }[] = []
    for (let i = 0; i < count; i++) {
      const t = i / (count - 1) // 0..1 across the row
      // Anchors arc across the front of the scalp (x: -0.9..0.9, slight z dip)
      const angle = (t - 0.5) * Math.PI * 0.78 // ~70° spread
      const anchorX = Math.sin(angle) * 0.95
      const anchorZ = Math.cos(angle) * 0.25 - 0.05
      const phase = t * 6.28 + i * 0.4
      const amp = 0.45 + (i % 3) * 0.1
      const freq = 0.45 + (i % 4) * 0.07
      list.push({ anchorX, anchorZ, phase, amp, freq })
    }
    return list
  }, [count])

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{ contain: 'layout paint' }}
    >
      <Canvas
        camera={{ position: [0, 1.5, 6], fov: 38 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Soft warm key + cool fill */}
          <ambientLight intensity={0.55} color={0xfff2dc} />
          <directionalLight position={[3, 6, 4]} intensity={1.2} color={0xffe1b3} />
          <directionalLight position={[-4, 2, -2]} intensity={0.4} color={0xe6c08a} />

          <Head yOffset={4.6} />
          {braids.map((b, i) => (
            <Braid
              key={i}
              anchorX={b.anchorX}
              anchorZ={b.anchorZ}
              phase={b.phase}
              amplitude={b.amp}
              frequency={b.freq}
              length={14}
              segments={14}
              radius={0.085}
              color={0x2a160d}
            />
          ))}

          {/* Faint warm fog so braids fade into the paper at the bottom */}
          <fog attach="fog" args={[0xf4ece2, 8, 18]} />
        </Suspense>
      </Canvas>
    </div>
  )
}
