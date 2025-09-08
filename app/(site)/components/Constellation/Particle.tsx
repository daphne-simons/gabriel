'use client'
import { useFrame } from '@react-three/fiber'
import React, { useMemo, useRef, useState, useEffect } from 'react'
import * as THREE from 'three'

interface ParticleProps {
  position: [number, number, number]
  imageUrl?: string
  name: string
  children?: React.ReactNode
}

export default function Particle({ position, children, imageUrl, name }: ParticleProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [texture, setTexture] = useState<THREE.Texture | null>(null)
  const meshRef = useRef<THREE.Mesh>(null)

  // Load texture manually to avoid hook rule violations with useTexture
  useEffect(() => {
    if (!imageUrl || imageUrl.trim() === '') {
      setTexture(null)
      return
    }

    const loader = new THREE.TextureLoader()

    loader.load(
      imageUrl,
      // Success callback
      (loadedTexture) => {
        loadedTexture.wrapS = loadedTexture.wrapT = THREE.ClampToEdgeWrapping
        loadedTexture.minFilter = THREE.LinearFilter
        loadedTexture.magFilter = THREE.LinearFilter
        setTexture(loadedTexture)
        setImageError(false)
      },
      // Progress callback (optional)
      undefined,
      // Error callback
      (error) => {
        console.warn(`Failed to load texture for ${name}:`, error)
        setImageError(true)
        setTexture(null)
      }
    )

    // Cleanup function
    return () => {
      if (texture) {
        texture.dispose()
      }
    }
  }, [imageUrl, name])

  // Geometry and material for image
  const imageGeometry = useMemo(() => new THREE.PlaneGeometry(8, 8), [])

  const imageMaterial = useMemo(() => {
    if (texture && imageUrl && !imageError) {
      return new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
      })
    }
    return null
  }, [texture, imageUrl, imageError])

  // Fallback circle material and geometry
  const fallbackMaterial = useMemo(() => (
    new THREE.MeshBasicMaterial({
      color: "#ffffff",
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    })
  ), [])

  const fallbackGeometry = useMemo(() => new THREE.CircleGeometry(2, 15), [])

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

  // Determine which geometry and material to use
  const shouldUseImage = imageUrl && !imageError && texture && imageMaterial
  const geometry = shouldUseImage ? imageGeometry : fallbackGeometry
  const material = shouldUseImage ? imageMaterial : fallbackMaterial

  return (
    <mesh
      ref={meshRef}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      geometry={geometry}
      material={material}
    >
      {/* Render legacy children if provided (for backwards compatibility) */}
      {children}
    </mesh>
  )
}