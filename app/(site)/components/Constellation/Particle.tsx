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
  // New dynamic variables for pulsing control
  pulseIntensity?: number      // How much the glow pulses (0-1, default 0.3)
  pulseSpeed?: number          // Speed of pulsing (default 1.0)
  breathingIntensity?: number  // How much the glow size changes (0-1, default 0.2)
  glowBaseSize?: number        // Base size of glow (default 16)

}

export default function Particle({
  position,
  children,
  imageUrl,
  name,
  color,
  pulseIntensity = 0.3,
  pulseSpeed = 1.0,
  breathingIntensity = 0.2,
  glowBaseSize = 16
}: ParticleProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [texture, setTexture] = useState<THREE.Texture | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const meshRef = useRef<THREE.Group<THREE.Object3DEventMap> | null>(null);
  const glowMeshRef = useRef<THREE.Mesh | null>(null);
  const textureRef = useRef<THREE.Texture | null>(null)
  const loadedImageUrl = useRef<string | null>(null)

  //// TEXTURES:

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
  const imageGeometry = useMemo(() => new THREE.PlaneGeometry(10, 10), [])

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
  // For behind particles - Uses shaders and changes color with moon phase
  const glowMaterial = useMemo(() => (
    new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(color) },
        opacity: { value: 0.3 },
        pulseAmount: { value: 1.0 } // Dynamic uniform for pulsing
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
      uniform float pulseAmount;
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

        // Apply pulsing effect to both brightness and alpha
        float finalOpacity = alpha * opacity * pulseAmount;
        vec3 finalColor = color * (0.8 + 0.2 * pulseAmount); // Subtle brightness variation
        
        gl_FragColor = vec4(color, alpha * opacity);
      }
    `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: true,
    })
  ), [color])

  // FALLBACK STARS:
  // Uses shaders to achieve a soft edge for fallback circle
  const fallbackMaterial = useMemo(() => (
    new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(color) }, // Use dynamic color instead of white
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
  ), [color])

  const fallbackGeometry = useMemo(() => new THREE.PlaneGeometry(4, 4), [])

  // CONSTELLATION MOVEMENT + GLOW PULSING: 
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()

      // JPEG scaling logic
      let finalScale = 2

      if (isHovered) {
        finalScale = 8
      } else {
        const pulseIntensityLocal = 0.15
        const pulseSpeedLocal = 1.5
        finalScale = 4 + Math.sin(time * pulseSpeedLocal + position[0] * 0.1) * pulseIntensityLocal
      }

      const currentScale = THREE.MathUtils.lerp(
        meshRef.current.scale.x,
        finalScale,
        0.15
      )
      meshRef.current.scale.setScalar(currentScale)

      // Existing parallax movement
      const parallaxZ = Math.sin(time * 0.8 + position[0] * 0.05) * 3
      const parallaxX = Math.sin(time * 0.6 + position[1] * 0.03) * 4
      const parallaxY = Math.cos(time * 0.7 + position[0] * 0.04) * 4

      meshRef.current.position.set(
        position[0] + parallaxX,
        position[1] + parallaxY,
        position[2] + parallaxZ + 2
      )
    }

    // NEW GLOW PULSING LOGIC
    if (glowMeshRef.current && glowMaterial) {
      const time = state.clock.getElapsedTime()

      // Create unique phase offset for each particle based on position
      const phaseOffset = (position[0] + position[1] + position[2]) * 0.1

      // Calculate pulsing values
      const breathingPulse = Math.sin(time * pulseSpeed + phaseOffset) * breathingIntensity + 1
      const brightnessPulse = Math.sin(time * pulseSpeed * 0.8 + phaseOffset) * pulseIntensity + 1

      // Apply breathing effect to glow size
      const glowScale = breathingPulse * (isHovered ? 1.5 : 1.0) // Enhance on hover
      glowMeshRef.current.scale.setScalar(glowScale)

      // Apply brightness pulsing to shader uniform
      if (glowMaterial.uniforms.pulseAmount) {
        glowMaterial.uniforms.pulseAmount.value = brightnessPulse * (isHovered ? 1.3 : 1.0)
      }
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
        ref={glowMeshRef}
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