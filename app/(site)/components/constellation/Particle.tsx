'use client'
import { useFrame } from '@react-three/fiber'
import React, { useRef, useState } from 'react'
import * as THREE from 'three'

interface ParticleProps {
  position: [number, number, number]
  children: React.ReactNode
}

export default function Particle({ position, children }: ParticleProps) {
  const [isHovered, setIsHovered] = useState(false)
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()

      // Conditional pulsing - only pulse when NOT hovered
      let finalScale = 1

      if (isHovered) {
        // When hovered: static large scale (no pulsing)
        finalScale = 2
      } else {
        // When not hovered: gentle pulsing effect
        const pulseIntensity = 0.15
        const pulseSpeed = 1.5
        finalScale = 1 + Math.sin(time * pulseSpeed + position[0] * 0.1) * pulseIntensity
      }

      // Smooth transition to target scale
      const currentScale = THREE.MathUtils.lerp(
        meshRef.current.scale.x,
        finalScale,
        0.15
      )
      meshRef.current.scale.setScalar(currentScale)

      // Subtle parallax movement - forward/back and slight drift
      const parallaxZ = Math.sin(time * 0.8 + position[0] * 0.05) * 3 // Gentle Z movement
      const parallaxX = Math.sin(time * 0.6 + position[1] * 0.03) * 4 // Subtle X drift
      const parallaxY = Math.cos(time * 0.7 + position[0] * 0.04) * 4 // Subtle Y drift

      // Apply parallax to position
      meshRef.current.position.set(
        position[0] + parallaxX,
        position[1] + parallaxY,
        position[2] + parallaxZ
      )
    }
  })

  return (
    <mesh
      ref={meshRef}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      {children}
    </mesh>
  )
}