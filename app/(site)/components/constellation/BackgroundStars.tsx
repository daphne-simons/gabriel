import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { AdditiveBlending } from 'three'
import * as THREE from 'three'

interface BackgroundStarsProps {
  count?: number // Number of stars (default: 2000)
  radius?: number // Base radius of star field (default: 400)
  depth?: number // Additional depth range (default: 200)
  size?: number // Size of individual stars (default: 1)
  opacity?: number // Opacity of stars (default: 0.8)
  color?: number // Color of stars (default: 0xffffff - white)
  rotationSpeed?: {
    x?: number // X rotation speed (default: 0.0002)
    y?: number // Y rotation speed (default: 0.0005)
  }
}

// Custom component for making background stars
export default function BackgroundStars({
  count = 2000,
  radius = 400,
  depth = 200,
  size = 1,
  opacity = 0.8,
  color = 0xffffff,
  rotationSpeed = { x: 0.0002, y: 0.0005 }
}: BackgroundStarsProps = {}) {
  const starsRef = useRef<THREE.Points>(null)

  const starsGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count * 3; i += 3) {
      // Create stars in a sphere around the scene
      const starRadius = radius + Math.random() * depth
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i] = starRadius * Math.sin(phi) * Math.cos(theta)
      positions[i + 1] = starRadius * Math.sin(phi) * Math.sin(theta)
      positions[i + 2] = starRadius * Math.cos(phi)
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geometry
  }, [count, radius, depth])

  const starsMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      color,
      size,
      transparent: true,
      opacity,
      blending: AdditiveBlending
    })
  }, [color, size, opacity])

  // Gentle rotation animation
  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y += rotationSpeed.y || 0.0005
      starsRef.current.rotation.x += rotationSpeed.x || 0.0002
    }
  })

  return (
    <points ref={starsRef} geometry={starsGeometry} material={starsMaterial} />
  )
}