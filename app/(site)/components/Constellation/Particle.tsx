'use client'
import { useFrame } from '@react-three/fiber'
import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react'
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
  const [isLoading, setIsLoading] = useState(false)
  const meshRef = useRef<THREE.Mesh>(null)
  const textureRef = useRef<THREE.Texture | null>(null)
  const loadedImageUrl = useRef<string | null>(null)

  // Memoize the texture loader to prevent recreation
  const textureLoader = useMemo(() => new THREE.TextureLoader(), [])

  // Load texture function
  const loadTexture = useCallback(async (url: string) => {
    if (isLoading || loadedImageUrl.current === url) return

    setIsLoading(true)
    setImageError(false)

    try {
      const loadedTexture = await new Promise<THREE.Texture>((resolve, reject) => {
        textureLoader.load(
          url,
          resolve,
          undefined,
          reject
        )
      })

      // Configure texture properly - remove flipY: false to fix upside down images
      loadedTexture.wrapS = loadedTexture.wrapT = THREE.ClampToEdgeWrapping
      loadedTexture.minFilter = THREE.LinearFilter
      loadedTexture.magFilter = THREE.LinearFilter
      loadedTexture.generateMipmaps = false
      // Remove this line: loadedTexture.flipY = false (this was causing upside down images)

      // Dispose old texture if it exists
      if (textureRef.current && textureRef.current !== loadedTexture) {
        textureRef.current.dispose()
      }

      textureRef.current = loadedTexture
      loadedImageUrl.current = url
      setTexture(loadedTexture)
      setImageError(false)
    } catch (error) {
      console.warn(`Failed to load texture for ${name}:`, error)
      setImageError(true)
      setTexture(null)
    } finally {
      setIsLoading(false)
    }
  }, [textureLoader, name, isLoading])


  // Load texture when imageUrl changes
  useEffect(() => {
    if (!imageUrl || imageUrl.trim() === '') {
      setTexture(null)
      setImageError(false)
      loadedImageUrl.current = null
      return
    }

    // Only load if we haven't loaded this URL already
    if (loadedImageUrl.current !== imageUrl) {
      loadTexture(imageUrl)
    }
  }, [imageUrl, loadTexture])

  // Handle WebGL context loss/restore
  useEffect(() => {
    const handleContextLost = () => {
      console.log('WebGL context lost, will reload textures when restored')
    }

    const handleContextRestored = () => {
      console.log('WebGL context restored, reloading texture')
      if (imageUrl && imageUrl.trim() !== '') {
        // Reset loaded URL to force reload
        loadedImageUrl.current = null
        loadTexture(imageUrl)
      }
    }

    const canvas = document.querySelector('canvas')
    if (canvas) {
      canvas.addEventListener('webglcontextlost', handleContextLost)
      canvas.addEventListener('webglcontextrestored', handleContextRestored)

      return () => {
        canvas.removeEventListener('webglcontextlost', handleContextLost)
        canvas.removeEventListener('webglcontextrestored', handleContextRestored)
      }
    }
  }, [imageUrl, loadTexture])

  const imageGeometry = useMemo(() => new THREE.PlaneGeometry(8, 8), [])

  const imageMaterial = useMemo(() => {
    if (texture && imageUrl && !imageError) {
      return new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
        alphaTest: 0.1,
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
      depthWrite: true,
      depthTest: true,
    })
  ), [])


  const fallbackGeometry = useMemo(() => new THREE.CircleGeometry(2, 15), [])

  // This useFrame makes the constellation move slightly and pulse the scale of the jpegs
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

      meshRef.current.position.set(
        position[0] + parallaxX,
        position[1] + parallaxY,
        position[2] + parallaxZ + 2
      )
    }
  })

  const shouldUseImage = imageUrl && !imageError && texture && imageMaterial
  const geometry = shouldUseImage ? imageGeometry : fallbackGeometry
  const material = shouldUseImage ? imageMaterial : fallbackMaterial

  // Clean up only on unmount, not on every material change
  useEffect(() => {
    return () => {
      if (textureRef.current) {
        textureRef.current.dispose()
        textureRef.current = null
      }
    }
  }, [])

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