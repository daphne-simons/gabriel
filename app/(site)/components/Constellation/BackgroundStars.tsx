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
  color?: string // Color of stars (default: #ffffff - white)
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
  size = 2,
  opacity = 0.8,
  color = '#ffffff',
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

  // Simple approach: create a basic circular texture
  const circleTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    const context = canvas.getContext('2d')!

    // Draw a simple white circle with soft edges
    const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
    gradient.addColorStop(0.8, 'rgba(255, 255, 255, 1)')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

    context.fillStyle = gradient
    context.fillRect(0, 0, 64, 64)

    return new THREE.CanvasTexture(canvas)
  }, [])

  const starsMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      color,
      size,
      map: circleTexture,
      transparent: true,
      opacity,
      blending: AdditiveBlending,
      // alphaTest: 0.1,
      sizeAttenuation: true
    })
  }, [color, size, opacity, circleTexture])

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