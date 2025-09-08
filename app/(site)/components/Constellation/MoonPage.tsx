'use client'
import { Canvas } from '@react-three/fiber'
import { useEffect, useMemo, useState } from 'react'
import { AdditiveBlending } from 'three'
import ConstellationLines from './ConstellationLines'
import Particle from './Particle'
import BackgroundStars from './BackgroundStars'
import { ContributorModel, SubmissionModel } from '@/sanity/models/sanity-client-models'

export default function MoonPage({ contributors, submissions }: { contributors: ContributorModel[], submissions: SubmissionModel[] }) {
  // Generate once per component mount
  const [sessionSeed] = useState(() => Math.random())

  const [particles, setParticles] = useState<Array<{
    name: string;
    position: [number, number, number];
    imageUrl?: string
  }>>([])

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
  // Generate constellation positions based on user data with session variation
  const generateConstellationPositions = (consultants: { name: string; imageUrl?: string }[]): Array<{ name: string; position: [number, number, number], imageUrl?: string }> => {
    const positions:
      Array<{ name: string; position: [number, number, number], imageUrl?: string }> = []
    const minDistance = 75 // Minimum distance between stars
    const maxAttempts = 50 // Maximum attempts to place each star

    consultants.forEach((consultant, index) => {
      // Combine name hash with session seed for variation between sessions
      const nameHash = hashString(consultant.name)
      const combinedSeed = nameHash + Math.floor(sessionSeed * 1000000)
      const random = seededRandom(combinedSeed)

      let attempts = 0
      let validPosition = false
      let newPosition: [number, number, number] = [0, 0, 0]

      // Try to find a valid position that doesn't conflict with existing stars
      while (!validPosition && attempts < maxAttempts) {
        // Safe viewing bounds - keep stars well within camera view

        const safeRadius = 80
        const maxRadius = 120 // horizontal ofset of 40
        const safeHeight = 130

        // Generate position attempt
        const angle = (index / consultants.length) * Math.PI * 2 + random() * 0.4 + (attempts * 0.1) // Add attempt variation
        const radius = safeRadius + random() * (maxRadius - safeRadius)
        const height = (random() - 0.5) * safeHeight

        const x = Math.cos(angle) * radius + (random() - 0.5) * 30
        const y = Math.sin(angle) * radius + (random() - 0.5) * 30 + height
        const z = (random() - 0.5) * 30

        newPosition = [x, y, z]

        // Check if this position is far enough from all existing positions
        validPosition = positions.every(existingParticle => {
          const [ex, ey, ez] = existingParticle.position
          const distance = Math.sqrt(
            Math.pow(x - ex, 2) +
            Math.pow(y - ey, 2) +
            Math.pow(z - ez, 2)
          )
          return distance >= minDistance
        })

        attempts++
      }

      // If we couldn't find a valid position after max attempts, 
      // place it anyway but try to spread it out more
      if (!validPosition) {
        const fallbackAngle = (index / consultants.length) * Math.PI * 2
        const fallbackRadius = 80 + (index % 3) * 40 // Spread across different radius rings
        newPosition = [
          Math.cos(fallbackAngle) * fallbackRadius,
          Math.sin(fallbackAngle) * fallbackRadius + (index % 2 - 0.5) * 60,
          (index % 3 - 1) * 20
        ]
      }

      positions.push({
        name: consultant.name,
        position: newPosition,
        imageUrl: consultant.imageUrl
      })
    })

    return positions
  }

  const getLatestSubmissionUrl = (contributorName: string): string | undefined => {
    const latestSubmission = submissions.find((submission) =>
      submission.contributor.name === contributorName
    );
    return latestSubmission?.assets[0]?.url;
  }

  const loadConsultants = () => {
    const consultants = contributors.map((contributor: any) => {
      return {
        name: contributor.name,
        imageUrl: getLatestSubmissionUrl(contributor.name)
      }
    })
    return consultants
  }

  useEffect(() => {
    const consultants = loadConsultants()
    const positionedParticles = generateConstellationPositions(consultants)
    setParticles(positionedParticles)
  }, [sessionSeed, contributors, submissions])

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
      <circleGeometry args={[2, 15]} />
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
        {/* Subtle ambient lighting to enhance the glow */}
        <ambientLight intensity={0.3} />
        {/* Lines connecting stars */}
        <ConstellationLines particles={particles} />
        {/* Stars/Particles */}
        <group>
          {particles?.map((particle, index) => (
            <Particle
              key={particle.name}
              position={particle.position}
              imageUrl={particle.imageUrl}
              name={particle.name}
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
