import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
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

// Color mapping for moon phases
const moonPhaseColors = {
  'new-moon': '#d0d6ff',
  'waxing': '#c2d0ed',
  'first-quarter': '#d4d0e8',
  'waxing-gibbous': '#ffefef',
  'full-moon': '#fffbf8',
  'waning-gibbous': '#ffefef',
  'last-quarter': '#d4d0e8',
  'waning': '#c2d0ed' // Changed from #ff0000 to match the commented value
}
// Helper function to extract color value
const getColorValue = (colorInput: string): string => {
  // If it's already a hex/rgb color, return as is
  if (colorInput.startsWith('#') || colorInput.startsWith('rgb')) {
    return colorInput
  }

  // Handle Tailwind class names like 'bg-pStarsWaning'
  if (colorInput.includes('pStars')) {
    const phaseName = colorInput.replace('bg-pStars', '')
    const kebabCase = phaseName.replace(/([A-Z])/g, '-$1').toLowerCase().substring(1)
    return moonPhaseColors[kebabCase as keyof typeof moonPhaseColors] || '#ffffff'
  }

  // Fallback to white
  return '#ffffff'
}

// Custom component for making background stars
export default function BackgroundStars({
  count = 2000,
  radius = 400,
  depth = 200,
  size = 1,
  opacity = 0.8,
  color = '#ffffff',
  rotationSpeed = { x: 0.0002, y: 0.0005 }
}: BackgroundStarsProps = {}) {
  const [resolvedColor, setResolvedColor] = useState('#ffffff')
  const starsRef = useRef<THREE.Points>(null)

  // Resolve the color value
  useEffect(() => {
    const newColor = getColorValue(color)
    setResolvedColor(newColor)
    console.log(`Resolved ${color} to ${newColor}`)
  }, [color])

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
      color: resolvedColor,
      size,
      transparent: true,
      opacity,
      blending: AdditiveBlending
    })
  }, [resolvedColor, size, opacity])

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