'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import { AdditiveBlending } from 'three'
import Particle from '../components/Particle'

export default function MoonPage() {
  const [particles, setParticles] = useState<{ username: string }[]>([])

  const loadUsers = () => {
    // return await supabase.from('lw8_tickets').select('*')
    // TODO: replace this with numbers of contributors in sanity studio.
    return [
      { username: '1' },
      { username: '2' },
      { username: '3' },
      { username: '4' },
      { username: '5' },
      { username: '6' },
      { username: '7' },
      { username: '8' },
      { username: '9' },
      { username: '10' },
    ]
  }

  useEffect(() => {
    const data = loadUsers()
    setParticles(data)
  }, [])

  const Material = () =>
    useMemo(() =>
      <meshStandardMaterial color="#ffffff" blending={AdditiveBlending} />,
      [])
  const Geometry = () =>
    useMemo(() =>
      <circleGeometry args={[3, 10]} />,
      [])


  return (
    <div style={{ width: "100vw", height: "100vh", background: "#000000" }}>
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 75, position: [0, 0, 500] }}
      >
        <ambientLight intensity={0.3} />
        <group>
          {particles?.map((particle, index) => (
            <Particle
              key={particle.username}
            >
              <Geometry />
              <Material />
            </Particle>

          ))}
        </group>
      </Canvas>
    </div>
  )
}
