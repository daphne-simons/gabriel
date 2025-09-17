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
  const textureRef = useRef<THREE.Texture | null>(null)

  // Load texture manually
  useEffect(() => {
    if (!imageUrl || imageUrl.trim() === '') {
      setTexture(null)
      setImageError(false)
      return
    }

    const loader = new THREE.TextureLoader()
    let mounted = true

    loader.load(
      imageUrl,
      (loadedTexture) => {
        if (!mounted) {
          loadedTexture.dispose()
          return
        }

        loadedTexture.wrapS = loadedTexture.wrapT = THREE.ClampToEdgeWrapping
        loadedTexture.minFilter = THREE.LinearFilter
        loadedTexture.magFilter = THREE.LinearFilter
        loadedTexture.generateMipmaps = false
        loadedTexture.flipY = false

        if (textureRef.current && textureRef.current !== loadedTexture) {
          textureRef.current.dispose()
        }

        textureRef.current = loadedTexture
        setTexture(loadedTexture)
        setImageError(false)
      },
      undefined,
      (error) => {
        if (!mounted) return
        console.warn(`Failed to load texture for ${name}:`, error)
        setImageError(true)
        setTexture(null)
      }
    )

    return () => {
      mounted = false
      if (textureRef.current) {
        textureRef.current.dispose()
        textureRef.current = null
      }
    }
  }, [imageUrl, name])

  const imageGeometry = useMemo(() => new THREE.PlaneGeometry(8, 8), [])

  const imageMaterial = useMemo(() => {
    if (texture && imageUrl && !imageError) {
      return new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
        alphaTest: 0.1,
        // Add depth control properties
        depthWrite: true,
        depthTest: true,
      })
    }
    return null
  }, [texture, imageUrl, imageError])

  const fallbackMaterial = useMemo(() => (
    new THREE.MeshBasicMaterial({
      color: "#ffffff",
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      // Add depth control properties
      depthWrite: true,
      depthTest: true,
    })
  ), [])

  const fallbackGeometry = useMemo(() => new THREE.CircleGeometry(2, 15), [])

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()

      let finalScale = 2

      if (isHovered) {
        finalScale = 8
      } else {
        const pulseIntensity = 0.15
        const pulseSpeed = 1.5
        finalScale = 4 + Math.sin(time * pulseSpeed + position[0] * 0.1) * pulseIntensity
      }

      const currentScale = THREE.MathUtils.lerp(
        meshRef.current.scale.x,
        finalScale,
        0.15
      )
      meshRef.current.scale.setScalar(currentScale)

      const parallaxZ = Math.sin(time * 0.8 + position[0] * 0.05) * 3
      const parallaxX = Math.sin(time * 0.6 + position[1] * 0.03) * 4
      const parallaxY = Math.cos(time * 0.7 + position[0] * 0.04) * 4

      // Add a small forward offset to ensure particles are always in front of lines
      meshRef.current.position.set(
        position[0] + parallaxX,
        position[1] + parallaxY,
        position[2] + parallaxZ + 2 // Add 2 units forward to stay in front of lines
      )
    }
  })

  const shouldUseImage = imageUrl && !imageError && texture && imageMaterial
  const geometry = shouldUseImage ? imageGeometry : fallbackGeometry
  const material = shouldUseImage ? imageMaterial : fallbackMaterial

  useEffect(() => {
    return () => {
      if (imageMaterial && imageMaterial !== fallbackMaterial) {
        imageMaterial.dispose()
      }
    }
  }, [imageMaterial])

  return (
    <mesh
      ref={meshRef}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      geometry={geometry}
      material={material}
      // Set render order - higher numbers render later (on top)
      renderOrder={1}
    >
      {children}
    </mesh>
  )
}