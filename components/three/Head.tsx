'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface HeadProps {
  yOffset?: number
}

/**
 * Stylized "girl looking down" head — built from a Lathe profile so the
 * silhouette is smooth and recognisable. Includes:
 *  - skull (lathe geometry profile)
 *  - hair cap (slightly oversized hemisphere, espresso-dark)
 *  - centre parting (thin gold strip)
 *  - subtle jaw / chin hints implied by the lathe curve
 *  - small forehead hint via shading
 *
 * The whole group leans forward (rotation.x ≈ -0.45) so the camera, looking
 * up from below, reads it as someone looking down into the page.
 */
export function Head({ yOffset = 3.4 }: HeadProps) {
  const groupRef = useRef<THREE.Group>(null)

  // Lathe profile — a 2D silhouette spun around the Y axis.
  // We sketch a half-section of a head: top dome → forehead → cheek → jaw.
  const skullGeometry = useMemo(() => {
    const pts: THREE.Vector2[] = []
    // (radius, y) — y goes from top (positive) to chin (negative).
    pts.push(new THREE.Vector2(0.0, 1.25)) // crown
    pts.push(new THREE.Vector2(0.42, 1.18))
    pts.push(new THREE.Vector2(0.78, 1.05))
    pts.push(new THREE.Vector2(0.98, 0.85))
    pts.push(new THREE.Vector2(1.05, 0.55)) // widest just above ears
    pts.push(new THREE.Vector2(1.05, 0.2))
    pts.push(new THREE.Vector2(1.0, -0.1))
    pts.push(new THREE.Vector2(0.92, -0.4))
    pts.push(new THREE.Vector2(0.78, -0.7)) // cheek
    pts.push(new THREE.Vector2(0.55, -0.95)) // jawline
    pts.push(new THREE.Vector2(0.3, -1.1)) // chin curve
    pts.push(new THREE.Vector2(0.0, -1.18)) // chin tip
    return new THREE.LatheGeometry(pts, 64)
  }, [])

  const skullMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0x6e4626, // warm caramel skin
        roughness: 0.55,
        metalness: 0.05,
      }),
    [],
  )

  // Hair cap — same lathe but the upper portion only, slightly enlarged.
  const hairCapGeometry = useMemo(() => {
    const pts: THREE.Vector2[] = []
    pts.push(new THREE.Vector2(0.0, 1.34))
    pts.push(new THREE.Vector2(0.46, 1.27))
    pts.push(new THREE.Vector2(0.84, 1.13))
    pts.push(new THREE.Vector2(1.04, 0.92))
    pts.push(new THREE.Vector2(1.12, 0.6))
    pts.push(new THREE.Vector2(1.12, 0.32))
    pts.push(new THREE.Vector2(1.07, 0.05)) // hair line at the temples / nape
    return new THREE.LatheGeometry(pts, 64)
  }, [])

  const hairMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0x1d0e07, // espresso
        roughness: 0.42,
        metalness: 0.12,
      }),
    [],
  )

  // Centre parting — thin gold strip running front-to-back along the crown.
  const partingGeometry = useMemo(
    () => new THREE.BoxGeometry(0.04, 0.025, 1.6),
    [],
  )
  const partingMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0xd9a441,
        roughness: 0.3,
        metalness: 0.85,
      }),
    [],
  )

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (groupRef.current) {
      // Gentle lean-forward + subtle nod
      groupRef.current.rotation.x = -0.42 + Math.sin(t * 0.3) * 0.025
      // Slow look left/right
      groupRef.current.rotation.y = Math.sin(t * 0.18) * 0.06
      // Tiny vertical breathing
      groupRef.current.position.y = yOffset + Math.sin(t * 0.4) * 0.04
    }
  })

  return (
    <group ref={groupRef} position={[0, yOffset, 0]}>
      {/* Skin / skull */}
      <mesh geometry={skullGeometry} material={skullMaterial} />

      {/* Hair cap — sits on top, slightly larger so it reads as separate volume */}
      <mesh geometry={hairCapGeometry} material={hairMaterial} position={[0, 0.04, 0]} />

      {/* Centre parting — thin gold accent on the top of the head */}
      <mesh
        geometry={partingGeometry}
        material={partingMaterial}
        position={[0, 1.32, 0]}
      />

      {/* Faint forehead shadow plate to ground the parting visually */}
      <mesh position={[0, 1.0, 0.95]} rotation={[Math.PI / 2.2, 0, 0]}>
        <circleGeometry args={[0.6, 32]} />
        <meshStandardMaterial
          color={0x2a1810}
          transparent
          opacity={0.18}
          roughness={1}
        />
      </mesh>
    </group>
  )
}
