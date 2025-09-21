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
  const meshRef = useRef<THREE.Group<THREE.Object3DEventMap> | null>(null);
  const textureRef = useRef<THREE.Texture | null>(null)
  const loadedImageUrl = useRef<string | null>(null)
  const [resolvedColor, setResolvedColor] = useState('#ffffff')

  //// TEXTURES:

  // Resolve the color value
  useEffect(() => {
    const newColor = getColorValue(color)
    setResolvedColor(newColor)
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

  //// MATERIALS: 
  const imageGeometry = useMemo(() => new THREE.PlaneGeometry(8, 8), [])

  const imageMaterial = useMemo(() => {
    // imageUrl = '' // Use to simulate no image data - use fallback circles
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

  // GLOW EFFECT: 
  // For behind particles - Uses shaders and changes when resolvedColor changes with moon phase
  const glowMaterial = useMemo(() => (
    new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(resolvedColor) },
        opacity: { value: 0.3 }
      },
      vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
      fragmentShader: `
      uniform vec3 color;
      uniform float opacity;
      varying vec2 vUv;
      
      void main() {
        // Calculate distance from center
        vec2 center = vec2(0.5, 0.5);
        float dist = distance(vUv, center);
        
        // Discard pixels outside the circle (creates circular shape)
        if (dist > 0.5) {
          discard;
        }
        
        // Create soft radial gradient within the circle
        float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
        
        // Multi-stop gradient effect for smoother falloff
        if (dist < 0.15) {
          alpha = 0.8; // Bright center
        } else if (dist < 0.3) {
          alpha = mix(0.8, 0.6, (dist - 0.15) / 0.15);
        } else if (dist < 0.45) {
          alpha = mix(0.6, 0.2, (dist - 0.3) / 0.15);
        } else {
          alpha = mix(0.2, 0.0, (dist - 0.45) / 0.05); // Fade to transparent at edge
        }
        
        gl_FragColor = vec4(color, alpha * opacity);
      }
    `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: true,
    })
  ), [resolvedColor])

  // FALLBACK STARS:
  // Uses shaders to achieve a soft edge for fallback circle
  const fallbackMaterial = useMemo(() => (
    new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(resolvedColor) }, // Use resolved color instead of white
        opacity: { value: 1.0 }
      },
      vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
      fragmentShader: `
      uniform vec3 color;
      uniform float opacity;
      varying vec2 vUv;
      
      void main() {
        // Calculate distance from center
        vec2 center = vec2(0.5, 0.5);
        float dist = distance(vUv, center);
        
        // Create smooth falloff with softer edges
        float alpha = 1.0 - smoothstep(0.1, 0.5, dist); // Start fadeout later for softer look
        alpha = pow(alpha, 1.5); // Less harsh falloff
        
        gl_FragColor = vec4(color, alpha * opacity);
      }
    `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: true,
    })
  ), [resolvedColor]) // Add resolvedColor as dependency

  const fallbackGeometry = useMemo(() => new THREE.PlaneGeometry(4, 4), [])

  // CONSTELLATION MOVEMENT - JPEG PULSE: 
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
  const glowGeometry = useMemo(() => new THREE.PlaneGeometry(16, 16), []) // Good size for soft spread

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
      {/* GLOW behind all particles */}
      <mesh
        geometry={glowGeometry}
        material={glowMaterial}
        renderOrder={0}
      />
      {/* JPEG layer */}
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