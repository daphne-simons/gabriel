'use client'
import { useFrame } from '@react-three/fiber'
import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react'
import * as THREE from 'three'

interface ParticleProps {
  position: [number, number, number]
  imageUrl?: string
  name: string
  children?: React.ReactNode
  color: string
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
  'waning': '#c2d0ed'
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

function hexToRgba(hex: string, alpha = 1) {
  // Remove '#' if present
  hex = hex.startsWith('#') ? hex.slice(1) : hex;

  // Handle 3-digit hex codes
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  // Handle 8-digit hex codes (with alpha)
  if (hex.length === 8) {
    alpha = parseInt(hex.slice(6, 8), 16) / 255;
    hex = hex.slice(0, 6);
  }

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  console.log(`rgba(${r}, ${g}, ${b}, ${alpha})`)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function Particle({ position, children, imageUrl, name, color }: ParticleProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [texture, setTexture] = useState<THREE.Texture | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  // const meshRef = useRef<THREE.Mesh>(null)
  const meshRef = useRef<THREE.Group<THREE.Object3DEventMap> | null>(null);
  const textureRef = useRef<THREE.Texture | null>(null)
  const loadedImageUrl = useRef<string | null>(null)
  const [resolvedColor, setResolvedColor] = useState('#ffffff')

  // Resolve the color value
  useEffect(() => {
    const newColor = getColorValue(color)
    setResolvedColor(newColor)
    console.log(`Resolved ${color} to ${newColor}`)
  }, [color])


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
        opacity: 1,
        side: THREE.DoubleSide,
        alphaTest: 0.1,
        depthWrite: true,
        depthTest: true,
      })
    }
    return null
  }, [texture, imageUrl, imageError])

  // Create soft glow texture with radial gradient - using white gradient
  const glowTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    const size = 128
    canvas.width = size
    canvas.height = size

    const context = canvas.getContext('2d')!
    const centerX = size / 2
    const centerY = size / 2
    const radius = size / 2

    // Create radial gradient with WHITE instead of resolvedColor
    const gradient = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)')     // White center
    gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.7)')   // Still bright white
    gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.4)')   // Fading white
    gradient.addColorStop(0.9, 'rgba(255, 255, 255, 0.1)')   // Very faint white
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')       // Transparent edge

    context.fillStyle = gradient
    context.fillRect(0, 0, size, size)

    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true

    return texture
  }, []) // Remove resolvedColor dependency

  // Glow material for behind particles - now depends on resolvedColor to recreate when color changes
  const glowMaterial = useMemo(() => (
    new THREE.MeshBasicMaterial({
      map: glowTexture,
      color: resolvedColor, // Tint the white gradient with star color
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: true,
    })
  ), [glowTexture, resolvedColor]) // Add resolvedColor dependency


  const fallbackMaterial = useMemo(() => (
    new THREE.MeshBasicMaterial({
      color: "#ffffff",
      transparent: true,
      opacity: 1,
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
  // Use plane geometry for the glow texture
  const glowGeometry = useMemo(() => new THREE.PlaneGeometry(14, 14), []) // Good size for soft spread

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
    <group
      ref={meshRef}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      {/* Soft circular glow behind all particles */}
      <mesh
        geometry={glowGeometry}
        material={glowMaterial}
        renderOrder={0}
      />
      {/* Main image/circle layer */}
      <mesh
        geometry={geometry}
        material={material}
        renderOrder={1}
      >
        {children}
      </mesh>
    </group>
  )
}