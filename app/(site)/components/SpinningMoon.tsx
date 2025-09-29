import React, { useRef, useMemo } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import * as THREE from 'three'

const SpinningMoon3D = ({
  position = [0, 0, 0],
  scale = 1,
  rotationSpeed = 0.005
}) => {
  const moonRef = useRef<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes, THREE.BufferGeometryEventMap>, THREE.Material | THREE.Material[], THREE.Object3DEventMap> | null>(null);

  // Load moon texture 
  const moonTexture = useLoader(TextureLoader, '/moon-imgs/moon-map.jpg')

  // Create a more detailed moon surface with bump mapping
  const bumpTexture = useMemo(() => {
    // If you have a bump map, load it here, otherwise we'll use the same texture
    return moonTexture
  }, [moonTexture])

  // Animation loop
  useFrame((state, delta) => {
    if (moonRef.current) {
      // Rotate the moon
      moonRef.current.rotation.y += rotationSpeed

      // Optional: Add a subtle floating effect
      moonRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group position={new THREE.Vector3(...position)}>
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
      <mesh ref={moonRef} scale={scale}>
        <sphereGeometry args={[0.5, 64, 64]} />
        <meshPhongMaterial
          map={moonTexture}
          bumpMap={bumpTexture}
          bumpScale={0.1}
          shininess={2}
          // transparent={true}
          opacity={1}
        />
      </mesh>

      {/* Optional: Add a subtle glow effect */}
      {/* <mesh scale={1}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial
          color="#fefee0"
          transparent={true}
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh> */}
    </group>
  )
}

export default SpinningMoon3D