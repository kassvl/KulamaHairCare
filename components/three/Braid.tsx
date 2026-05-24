'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { noise2D } from './noise'

interface BraidProps {
  /** World x position of the top anchor (where it attaches to the head) */
  anchorX: number
  /** World z position of the top anchor */
  anchorZ: number
  /** Phase offset so sibling braids don't move in lockstep */
  phase: number
  /** How much this braid swings laterally */
  amplitude?: number
  /** Frequency multiplier for the sway */
  frequency?: number
  /** Total length of the braid (world units) */
  length?: number
  /** Number of segments along the curve */
  segments?: number
  /** Tube radius */
  radius?: number
  /** Hex color for the braid base */
  color?: number
}

/**
 * Procedural braid rope. Renders a TubeGeometry along a CatmullRom curve whose
 * control points are shifted each frame by a sin + perlin field, giving a
 * lazy-rope sway. Hair-realistic? No. Stylized? Very.
 */
export function Braid({
  anchorX,
  anchorZ,
  phase,
  amplitude = 0.55,
  frequency = 0.6,
  length = 14,
  segments = 14,
  radius = 0.085,
  color = 0x3a1b14,
}: BraidProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const curve = useMemo(() => {
    const pts: THREE.Vector3[] = []
    for (let i = 0; i <= segments; i++) {
      pts.push(new THREE.Vector3(anchorX, -i * (length / segments), anchorZ))
    }
    return new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.5)
  }, [anchorX, anchorZ, length, segments])

  // Allocate one geometry we reshape each frame by overwriting curve points.
  const geometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, segments * 4, radius, 8, false)
  }, [curve, segments, radius])

  // Slight twist in the material via vertex colors (cheap "braid" hint)
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color,
      roughness: 0.55,
      metalness: 0.05,
    })
  }, [color])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    const points = curve.points
    for (let i = 0; i <= segments; i++) {
      const k = i / segments // 0 at top, 1 at tip
      // Stiffer at the top (anchor stays put), looser at the tip.
      const looseness = Math.pow(k, 1.4)
      const sway =
        Math.sin(t * frequency + phase + i * 0.4) * amplitude * looseness
      const drift = noise2D(t * 0.15 + phase, i * 0.3) * 0.45 * looseness
      const swayZ =
        Math.cos(t * frequency * 0.6 + phase * 0.7 + i * 0.35) *
        amplitude *
        0.6 *
        looseness
      const p = points[i]!
      p.set(anchorX + sway + drift, -i * (length / segments), anchorZ + swayZ)
    }
    curve.updateArcLengths?.()

    // Re-bake the tube geometry in place — cheap enough at ~14 segments.
    const next = new THREE.TubeGeometry(curve, segments * 4, radius, 8, false)
    geometry.copy(next)
    next.dispose()
  })

  return <mesh ref={meshRef} geometry={geometry} material={material} castShadow={false} />
}
