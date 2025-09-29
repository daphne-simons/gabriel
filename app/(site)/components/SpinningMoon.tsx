import React, { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import * as THREE from 'three'

interface SpinningMoon3DProps {
  position?: [number, number, number]
  scale?: number
  rotationSpeed?: number
}
export default function SpinningMoon3D({
  position = [0, 0, 0],
  scale = 1,
  rotationSpeed = 0.005
}: SpinningMoon3DProps) {
  // States:
  const [responsiveScale, setResponsiveScale] = useState(scale)
  const [responsivePosition, setResponsivePosition] = useState<[number, number, number]>(position)

  // Moon rendering:
  const moonRef = useRef<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes, THREE.BufferGeometryEventMap>, THREE.Material | THREE.Material[], THREE.Object3DEventMap> | null>(null);
  // Load moon texture 
  const moonTexture = useLoader(TextureLoader, '/moon-imgs/moon-map.jpg')
  // Create a more detailed moon surface with bump mapping
  const bumpTexture = useMemo(() => {
    // If you have a bump map, load it here, otherwise we'll use the same texture
    return moonTexture
  }, [moonTexture])

  // Handle responsive sizing
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth

      if (width < 640) {
        // Mobile small
        setResponsiveScale(scale * 0.5)
        setResponsivePosition([position[0], position[1] + 0.5, position[2]]) // slightly higher for mobile
      } else if (width < 768) {
        // Mobile
        setResponsiveScale(scale * 0.6)
        setResponsivePosition([position[0], position[1] + 0.3, position[2]]) // less high for tablets
      } else if (width < 1024) {
        // Tablet
        setResponsiveScale(scale * 0.8)
        setResponsivePosition([position[0], position[1], position[2]])
      } else {
        // Desktop
        setResponsiveScale(scale)
        setResponsivePosition(position)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [scale, position])

  // Animation loop
  useFrame((state, delta) => {
    if (moonRef.current) {
      // Rotate the moon
      moonRef.current.rotation.y += rotationSpeed
      // Adds a subtle floating effect
      moonRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group position={new THREE.Vector3(...responsivePosition)}>
      {/* Ambient light for overall illumination */}
      <ambientLight intensity={0.3} />

      {/* Directional light to simulate sunlight */}
      <directionalLight
        position={[35, 0, 5]}
        intensity={5}
        color="#fefee0"
      />

      {/* Point light for additional glow */}
      <pointLight
        position={[0, 0, 2]}
        intensity={1}
        color="#fefee0"
        distance={20}
      />

      {/* The Moon Sphere */}
      <mesh ref={moonRef} scale={responsiveScale}>
        <sphereGeometry args={[0.5, 64, 64]} />
        <meshPhongMaterial
          map={moonTexture}
          bumpMap={bumpTexture}
          bumpScale={0.1}
          shininess={2}
          opacity={1}
        />
      </mesh>
    </group>
  )
}
