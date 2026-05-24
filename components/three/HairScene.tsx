'use client'

import { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { Head } from './Head'
import { Braid } from './Braid'

interface HairSceneProps {
  count?: number
}

/**
 * Pointer-events-none fixed overlay containing the head + braid scene.
 *
 * Camera framing has been carefully tuned so that the head sits at the top
 * of the viewport and the braids cascade down through the whole page.
 */
export function HairScene({ count = 14 }: HairSceneProps) {
  // Anchor points for the braids — distributed across the front half of the
  // scalp in TWO arcs (front row + slightly inset second row) so the weave
  // reads as full and natural rather than a single fan.
  const braids = useMemo(() => {
    const list: {
      anchorX: number
      anchorZ: number
      phase: number
      amp: number
      freq: number
      length: number
    }[] = []

    // Front row
    const frontCount = Math.ceil(count * 0.6)
    for (let i = 0; i < frontCount; i++) {
      const t = frontCount === 1 ? 0.5 : i / (frontCount - 1)
      const angle = (t - 0.5) * Math.PI * 0.85 // ~77° spread
      const r = 1.05
      const anchorX = Math.sin(angle) * r
      const anchorZ = Math.cos(angle) * 0.3 + 0.05
      list.push({
        anchorX,
        anchorZ,
        phase: t * 6.28 + i * 0.41,
        amp: 0.5 + (i % 3) * 0.12,
        freq: 0.42 + (i % 4) * 0.06,
        length: 13 + (i % 2) * 1.2,
      })
    }

    // Back row (slightly inset)
    const backCount = count - frontCount
    for (let i = 0; i < backCount; i++) {
      const t = backCount === 1 ? 0.5 : i / (backCount - 1)
      const angle = (t - 0.5) * Math.PI * 0.65
      const r = 0.85
      const anchorX = Math.sin(angle) * r
      const anchorZ = Math.cos(angle) * 0.18 - 0.4
      list.push({
        anchorX,
        anchorZ,
        phase: t * 6.28 + i * 0.55 + 1.6,
        amp: 0.42 + (i % 3) * 0.1,
        freq: 0.38 + (i % 4) * 0.05,
        length: 12 + (i % 2) * 1.4,
      })
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
        camera={{ position: [0, 0.6, 5.4], fov: 42, near: 0.1, far: 60 }}
        dpr={[1, 1.6]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        onCreated={({ camera }) => {
          // Look at a point slightly above origin so the head sits high.
          camera.lookAt(0, 2.4, 0)
          camera.updateProjectionMatrix()
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Warm key from upper-front, soft gold rim, cool fill from below */}
          <ambientLight intensity={0.45} color={0xfff2dc} />
          <directionalLight
            position={[3, 6, 5]}
            intensity={1.6}
            color={0xffe2b3}
          />
          <directionalLight
            position={[-3, 2, -3]}
            intensity={0.55}
            color={0xc97b3f}
          />
          <pointLight
            position={[0, 5, 2.5]}
            intensity={0.5}
            color={0xd9a441}
            distance={6}
          />

          <Head yOffset={3.4} />

          {braids.map((b, i) => (
            <Braid
              key={i}
              anchorX={b.anchorX}
              anchorZ={b.anchorZ}
              phase={b.phase}
              amplitude={b.amp}
              frequency={b.freq}
              length={b.length}
              segments={18}
              strandRadius={0.05}
              weaveRadius={0.075}
              baseColor={0x1d0e07}
              tipColor={0x9a5325}
            />
          ))}

          {/* Warm fog so braids fade gracefully into the cream paper */}
          <fog attach="fog" args={[0xf4ece2, 7, 16]} />
        </Suspense>
      </Canvas>
    </div>
  )
}
