import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'

const Particle = ({ children }) => {
  const particle = useRef(null)

  const widthRadius = 100
  const heightRadius = 100

  useFrame(({ clock }) => {
    const timer = clock.getElapsedTime()
    particle.current.position.x = Math.sin(timer) * widthRadius
  }
  )

  return <mesh ref={particle}>{children}</mesh>
}

export default Particle