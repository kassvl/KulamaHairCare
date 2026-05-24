'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface HeadProps {
  yOffset?: number
}

/**
 * Stylized "girl looking down" — abstract dome + jaw hint + scalp ring where
 * braids attach. Deliberately not a portrait. Slow yaw + pitch sway.
 */
export function Head({ yOffset = 4.5 }: HeadProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(t * 0.45) * 0.05
      groupRef.current.rotation.x = -0.55 + Math.sin(t * 0.3) * 0.03
      groupRef.current.position.y = yOffset + Math.sin(t * 0.4) * 0.05
    }
  })

  return (
    <group ref={groupRef} position={[0, yOffset, 0]} rotation={[-0.55, 0, 0]}>
      {/* Skin (warm caramel) */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.05, 48, 48]} />
        <meshStandardMaterial color={0x5a3a25} roughness={0.6} metalness={0.05} />
      </mesh>

      {/* Jaw hint — slightly elongated mass behind */}
      <mesh position={[0, -0.4, -0.1]} scale={[0.9, 0.85, 0.7]}>
        <sphereGeometry args={[1.0, 32, 32]} />
        <meshStandardMaterial color={0x4a2e1d} roughness={0.7} />
      </mesh>

      {/* Scalp / hair cap — where braids "attach". Espresso-dark hemisphere */}
      <mesh position={[0, 0.18, 0]}>
        <sphereGeometry args={[1.13, 48, 48, 0, Math.PI * 2, 0, Math.PI / 2.1]} />
        <meshStandardMaterial color={0x2a160d} roughness={0.5} />
      </mesh>

      {/* Subtle gold cuff ring around the scalp parting (decorative) */}
      <mesh position={[0, 0.95, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.25, 0.025, 8, 32]} />
        <meshStandardMaterial color={0xd9a441} roughness={0.3} metalness={0.7} />
      </mesh>
    </group>
  )
}
