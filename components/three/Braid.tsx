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
  /** Strand tube radius */
  strandRadius?: number
  /** How far each strand orbits the centre (sets braid thickness) */
  weaveRadius?: number
  /** Hex color for the braid base */
  baseColor?: number
  /** Hex color for highlights at the tip */
  tipColor?: number
}

const STRANDS = 3
const TWO_PI = Math.PI * 2

/**
 * Procedural 3-strand helical braid.
 *
 * Each braid is rendered as **three** TubeGeometries that orbit a shared
 * spine curve at 120° intervals, twisting around it as we travel down — the
 * classic three-strand weave look.
 *
 * The spine curve sways with sin + perlin so the whole rope drapes naturally.
 * Tip strands receive a warmer colour via vertex colours so the braid fades
 * from espresso at the scalp to caramel-gold at the tip.
 */
export function Braid({
  anchorX,
  anchorZ,
  phase,
  amplitude = 0.55,
  frequency = 0.55,
  length = 13,
  segments = 18,
  strandRadius = 0.052,
  weaveRadius = 0.075,
  baseColor = 0x1d0e07,
  tipColor = 0x8a4a25,
}: BraidProps) {
  const groupRef = useRef<THREE.Group>(null)

  // Re-usable scratch frame & vectors so we don't allocate every frame.
  const scratch = useMemo(
    () => ({
      tmp: new THREE.Vector3(),
      normal: new THREE.Vector3(),
      binormal: new THREE.Vector3(),
      tangent: new THREE.Vector3(),
      up: new THREE.Vector3(0, 1, 0),
    }),
    [],
  )

  // Shared spine — re-shaped each frame.
  const spine = useMemo(() => {
    const pts: THREE.Vector3[] = []
    for (let i = 0; i <= segments; i++) {
      pts.push(new THREE.Vector3(anchorX, -i * (length / segments), anchorZ))
    }
    return new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.5)
  }, [anchorX, anchorZ, length, segments])

  // Three strand tubes, each kept as a mutable mesh whose geometry is
  // rebuilt every frame to match the current weave.
  const strandMeshes = useRef<THREE.Mesh[]>([])

  const materials = useMemo(() => {
    return Array.from({ length: STRANDS }).map(() => {
      return new THREE.MeshStandardMaterial({
        vertexColors: true,
        roughness: 0.42,
        metalness: 0.18,
      })
    })
  }, [])

  // Pre-build initial geometries so React renders meshes at all.
  const initialGeometries = useMemo(() => {
    return Array.from({ length: STRANDS }).map(() => {
      const empty = new THREE.BufferGeometry()
      empty.setAttribute('position', new THREE.Float32BufferAttribute([], 3))
      return empty
    })
  }, [])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime

    // 1) Animate the spine control points.
    const spinePts = spine.points
    for (let i = 0; i <= segments; i++) {
      const k = i / segments
      const looseness = Math.pow(k, 1.35)
      const sway = Math.sin(t * frequency + phase + i * 0.32) * amplitude * looseness
      const drift = noise2D(t * 0.18 + phase, i * 0.27) * 0.5 * looseness
      const swayZ =
        Math.cos(t * frequency * 0.55 + phase * 0.7 + i * 0.3) *
        amplitude *
        0.55 *
        looseness
      const p = spinePts[i]!
      p.set(anchorX + sway + drift, -i * (length / segments), anchorZ + swayZ)
    }
    // updateArcLengths is optional for re-sampling; the curve recomputes on getPointAt.

    // 2) For each strand, build a list of points that orbit the spine.
    //    We sample the spine at higher resolution for smoother tubes.
    const sampleCount = segments * 4 // points per strand
    const helixTwists = 3.4 // how many full rotations along the length

    for (let s = 0; s < STRANDS; s++) {
      const strandPoints: THREE.Vector3[] = []
      const phaseS = (s / STRANDS) * TWO_PI

      for (let i = 0; i <= sampleCount; i++) {
        const u = i / sampleCount // 0 at top, 1 at tip
        const center = spine.getPointAt(u)
        const tangent = spine.getTangentAt(u)
        // Build a stable normal/binormal frame from world-up.
        scratch.normal.copy(scratch.up).cross(tangent).normalize()
        if (scratch.normal.lengthSq() < 0.0001) {
          // Tangent is parallel to up — fall back to X axis.
          scratch.normal.set(1, 0, 0)
        }
        scratch.binormal.copy(tangent).cross(scratch.normal).normalize()

        const angle = phaseS + u * TWO_PI * helixTwists
        const r = weaveRadius
        const offsetX =
          scratch.normal.x * Math.cos(angle) * r +
          scratch.binormal.x * Math.sin(angle) * r
        const offsetY =
          scratch.normal.y * Math.cos(angle) * r +
          scratch.binormal.y * Math.sin(angle) * r
        const offsetZ =
          scratch.normal.z * Math.cos(angle) * r +
          scratch.binormal.z * Math.sin(angle) * r

        strandPoints.push(
          new THREE.Vector3(
            center.x + offsetX,
            center.y + offsetY,
            center.z + offsetZ,
          ),
        )
      }

      // Build a TubeGeometry along the strand path.
      const strandCurve = new THREE.CatmullRomCurve3(
        strandPoints,
        false,
        'catmullrom',
        0.5,
      )
      const newGeo = new THREE.TubeGeometry(
        strandCurve,
        sampleCount,
        strandRadius,
        6,
        false,
      )

      // Add gradient vertex colours: espresso → caramel toward tip.
      const positions = newGeo.attributes.position!
      const count = positions.count
      const colors = new Float32Array(count * 3)
      const baseRgb = new THREE.Color(baseColor)
      const tipRgb = new THREE.Color(tipColor)
      const colorCache = new THREE.Color()
      // Each tube ring has (radialSegments + 1) vertices and there are
      // `tubularSegments + 1` rings → infer ring index from vertex index.
      const ringSize = 7 // radialSegments(6) + 1
      const ringCount = sampleCount + 1
      for (let v = 0; v < count; v++) {
        const ringIdx = Math.floor(v / ringSize)
        const u = ringCount > 1 ? ringIdx / (ringCount - 1) : 0
        // Bias colour toward tip mostly in the last 35 %.
        const blend = Math.pow(u, 1.7)
        colorCache.copy(baseRgb).lerp(tipRgb, blend)
        colors[v * 3] = colorCache.r
        colors[v * 3 + 1] = colorCache.g
        colors[v * 3 + 2] = colorCache.b
      }
      newGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

      // Swap geometry on the existing mesh (dispose old to avoid GPU leak).
      const mesh = strandMeshes.current[s]
      if (mesh) {
        mesh.geometry.dispose()
        mesh.geometry = newGeo
      }
    }
  })

  return (
    <group ref={groupRef}>
      {Array.from({ length: STRANDS }).map((_, s) => (
        <mesh
          key={s}
          ref={(el) => {
            if (el) strandMeshes.current[s] = el
          }}
          geometry={initialGeometries[s]}
          material={materials[s]}
          castShadow={false}
          receiveShadow={false}
        />
      ))}
    </group>
  )
}
