'use client'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useEffect, useMemo, useRef, useState } from 'react'
import { AdditiveBlending } from 'three'
import ConstellationLines from './ConstellationLines'
import Particle from './Particle'
import BackgroundStars from './BackgroundStars'
import { ContributorModel, SubmissionModel } from '@/sanity/models/sanity-client-models'
import { calculateBgColor, calculateMoonPhase, determineConstellationPhase } from '../../utils/moon-utils'
import GeneralLogo from '../Logos/GeneralLogo'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

export default function MoonPage({ contributors, submissions }: { contributors: ContributorModel[], submissions: SubmissionModel[] }) {
  const router = useRouter()

  // Fetch relevant moon phase data
  const theme = calculateBgColor() // Gets moon phase data
  const moonPhase = calculateMoonPhase() // Uses current date by default
  const { name, lightingRange } = moonPhase
  const constellationPhase = determineConstellationPhase(name, lightingRange)
  const { starDensity, position, color, driftSpeed, lineThickness } = constellationPhase // Dynamic variables for constellation styling

  // STATES
  const [sessionSeed] = useState(() => Math.random())  // Generate once per component mount, so that positions only change on re-render
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
    const minDistance = 80 // Minimum distance between stars
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

        const safeRadius = 120
        const maxRadius = 140 // horizontal ofset of 40
        const safeHeight = 120

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
        const fallbackRadius = 80 + (index % 3) * 50 // Spread across different radius rings
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
  // USE EFFECTS
  useEffect(() => {
    const consultants = loadConsultants()
    const positionedParticles = generateConstellationPositions(consultants)
    setParticles(positionedParticles)
  }, [sessionSeed])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        console.log('close')
        router.push('/') // navigate back home
      }
    }
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, []);

  function StarMaterial() {
    return useMemo(() => (
      <meshBasicMaterial
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

  // SATELLITE CAMERA - Dynamic momentum for moon phases

  function SatelliteCamera({ initialPosition, phaseName }: {
    initialPosition: [number, number, number],
    phaseName: string
  }) {
    const { camera } = useThree()
    const timeRef = useRef(0)
    const basePositionRef = useRef(new THREE.Vector3(...initialPosition))

    // Initialize camera position immediately without animation
    useEffect(() => {
      camera.position.set(...initialPosition)
      camera.lookAt(0, 0, 0)
      basePositionRef.current.set(...initialPosition)
      timeRef.current = 0
    }, [phaseName]) // Reset when phase changes

    // Different orbital characteristics for each phase
    const getPhaseOrbit = (phase: string) => {
      switch (phase) {
        case 'New Moon':
          return {
            driftSpeed: 0.008,
            orbitRadius: 15,
            verticalDrift: 8,
            direction: -1 // Counterclockwise
          }
        case 'Waxing Crescent':
          return {
            driftSpeed: 0.012,
            orbitRadius: 20,
            verticalDrift: 12,
            direction: 1
          }
        case 'First Quarter':
          return {
            driftSpeed: 0.010,
            orbitRadius: 18,
            verticalDrift: 10,
            direction: -1
          }
        case 'Waxing Gibbous':
          return {
            driftSpeed: 0.015,
            orbitRadius: 25,
            verticalDrift: 15,
            direction: 1
          }
        case 'Full Moon':
          return {
            driftSpeed: 0.020,
            orbitRadius: 30,
            verticalDrift: 20,
            direction: -1 // Dramatic reverse orbit
          }
        case 'Waning Gibbous':
          return {
            driftSpeed: 0.015,
            orbitRadius: 25,
            verticalDrift: 15,
            direction: 1
          }
        case 'Last Quarter':
          return {
            driftSpeed: 0.010,
            orbitRadius: 18,
            verticalDrift: 10,
            direction: -1
          }
        case 'Waning Crescent':
          return {
            driftSpeed: 0.008,
            orbitRadius: 12,
            verticalDrift: 6,
            direction: 1
          }
        default:
          return {
            driftSpeed: 0.012,
            orbitRadius: 20,
            verticalDrift: 10,
            direction: 1
          }
      }
    }

    useFrame((state, delta) => {
      timeRef.current += delta
      const time = timeRef.current
      const basePos = basePositionRef.current
      const orbit = getPhaseOrbit(phaseName)

      // Create subtle orbital drift around the initial position
      const driftX = Math.cos(time * orbit.driftSpeed * orbit.direction) * orbit.orbitRadius
      const driftY = Math.sin(time * orbit.driftSpeed * orbit.direction * 0.7) * orbit.orbitRadius * 0.6
      const driftZ = Math.sin(time * orbit.driftSpeed * 0.5) * orbit.verticalDrift

      // Apply drift to the base position
      camera.position.set(
        basePos.x + driftX,
        basePos.y + driftY,
        basePos.z + driftZ
      )

      // Always maintain center view of the constellation 
      camera.lookAt(0, 0, 0)
    })

    return null
  }
  return (
    <div className="w-full h-screen bg-[#000814] flex" >
      <Link href="/" className="pl-4 pt-4 z-20 absolute" aria-label="Gabriel logo that navigates back to home page">
        <GeneralLogo logoColor={theme.logoColor} />
      </Link>
      <Link href="/" className="right-0 top-0 z-20 absolute p-4" aria-label="close button to return back home">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className={`size-7 ${theme.xColor}`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </Link>
      {/* 3D Canvas */}
      <Canvas
        dpr={[1, 2]}
      >
        <SatelliteCamera initialPosition={position} phaseName={moonPhase.name} />
        {/* Background stars with slower moving speed */}
        <BackgroundStars
          color={color}
          count={starDensity}
          rotationSpeed={driftSpeed}
        />
        {/* Subtle ambient lighting to enhance the glow */}
        <ambientLight intensity={0.4} />
        {/* Lines connecting stars */}
        <ConstellationLines color={color} particles={particles} lineThickness={lineThickness} />
        {/* Stars/Particles */}
        <group>
          {particles?.map((particle, index) => (
            <Particle
              key={particle.name}
              position={particle.position}
              imageUrl={particle.imageUrl}
              name={particle.name}
              color={color}
            >
              <StarGeometry />
              <StarMaterial />
            </Particle>
          ))}
        </group>
      </Canvas>
    </div >
  )
}

