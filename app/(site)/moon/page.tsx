'use client'
import { Canvas } from '@react-three/fiber'
import { useEffect, useMemo, useState } from 'react'
import { AdditiveBlending } from 'three'
import ConstellationLines from '../components/constellation/ConstellationLines'
import Particle from '../components/constellation/Particle'
import BackgroundStars from '../components/constellation/BackgroundStars'

export default function MoonPage() {
  const [particles, setParticles] = useState<Array<{ username: string; position: [number, number, number] }>>([])

  // POSITION LOGIC
  // Simple seeded random number generator (Linear Congruential Generator)
  const seededRandom = (seed: number) => {
    let value = seed
    return () => {
      value = (value * 16807) % 2147483647
      return (value - 1) / 2147483646 // Return value between 0 and 1
    }
  }
  // Hash string to number for consistent seeding
  const hashString = (str: string): number => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32bit integer
    }
    return Math.abs(hash)
  }
  // Generate constellation positions based on user data
  const generateConstellationPositions = (users: { username: string }[]): Array<{ username: string; position: [number, number, number] }> => {
    return users.map((user, index) => {
      // Create deterministic random generator based on username
      const seed = hashString(user.username)
      const random = seededRandom(seed)

      // Generate consistent position for this user
      const angle = (index / users.length) * Math.PI * 2 + random() * 0.5 // Base angle with slight variation
      const radius = 80 + random() * 120 // Varied distances from center
      const height = (random() - 0.5) * 100 // Some vertical variation

      // Add some randomness to make it look more natural
      const x = Math.cos(angle) * radius + (random() - 0.5) * 60
      const y = Math.sin(angle) * radius + (random() - 0.5) * 60 + height
      const z = (random() - 0.5) * 50 // Slight depth variation

      return {
        username: user.username,
        position: [x, y, z] as [number, number, number]
      }
    })
  }

  const loadUsers = () => {
    // TODO: replace this with data from sanity studio.
    return [
      { username: 'alice' },
      { username: 'bob' },
      { username: 'charlie' },
      { username: 'diana' },
      { username: 'eve' },
      { username: 'frank' },
      { username: 'grace' },
      { username: 'henry' },
      { username: 'iris' },
      { username: 'jack' },
    ]
  }

  useEffect(() => {
    const users = loadUsers()
    const positionedParticles = generateConstellationPositions(users)
    setParticles(positionedParticles)
  }, [])

  console.log(particles)
  function StarMaterial() {
    return useMemo(() => (
      <meshBasicMaterial
        color="#ffffff"
        transparent
        opacity={0.9}
        blending={AdditiveBlending}
      />
    ), [])
  }
  function StarGeometry() {
    return useMemo(() => (
      <circleGeometry args={[2, 8]} />
    ), [])
  }

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#000814" }}>
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 75, position: [0, 0, 300] }}
      >
        {/* Background stars with slower moving speed */}
        <BackgroundStars
          count={3000}
          size={0.9}
          rotationSpeed={{ x: 0.00005, y: 0.0001 }}
        />
        {/* Lines connecting stars */}
        <ConstellationLines particles={particles} />
        {/* Subtle ambient lighting to enhance the glow */}
        <ambientLight intensity={0.3} />
        {/* Stars/Particles */}
        <group>
          {particles?.map((particle, index) => (
            <Particle
              key={particle.username}
              position={particle.position}
            >
              <StarGeometry />
              <StarMaterial />
            </Particle>
          ))}
        </group>
      </Canvas>
    </div>
  )
}
