'use client'
import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import * as THREE from 'three';

interface ParticleProps {
  position: [number, number, number],
  children: React.ReactNode
}
export default function Particle({ position, children }: ParticleProps) {

  const meshRef = useRef<THREE.Mesh>(null)
  // Gentle twinkling animation
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      const twinkle = 0.7 + Math.sin(time * 2 + position[0] * 0.1) * 0.3
      meshRef.current.scale.setScalar(twinkle)
    }
  })

  return <mesh ref={meshRef} position={position}>{children}</mesh>
}
