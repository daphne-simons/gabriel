'use client'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Vector3 } from 'three'
// Component to create glowing lines between particles using Three.js objects directly
export default function ConstellationLines({ particles }: { particles: Array<{ username: string; position: [number, number, number] }> }) {
  const groupRef = useRef<THREE.Group>(null)

  const connections = useMemo(() => {
    if (particles.length < 2) return []

    const lines = []
    const maxConnections = 2 // Maximum connections per particle
    const maxDistance = 120 // Maximum distance to connect particles

    for (let i = 0; i < particles.length; i++) {
      const currentParticle = particles[i]
      let connectionCount = 0

      for (let j = i + 1; j < particles.length && connectionCount < maxConnections; j++) {
        const targetParticle = particles[j]

        const distance = new Vector3(...currentParticle.position).distanceTo(new Vector3(...targetParticle.position))

        if (distance < maxDistance) {
          lines.push({
            start: currentParticle.position,
            end: targetParticle.position,
            opacity: Math.max(0.3, 1 - (distance / maxDistance))
          })
          connectionCount++
        }
      }
    }
    return lines
  }, [particles])

  // Create Three.js line objects directly
  useEffect(() => {
    if (!groupRef.current) return

    // Clear existing lines
    groupRef.current.clear()

    connections.forEach((connection, index) => {
      const points = []
      points.push(new Vector3(...connection.start))
      points.push(new Vector3(...connection.end))

      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const material = new THREE.LineBasicMaterial({
        color: 0x60a5fa,
        transparent: true,
        opacity: connection.opacity * 0.7
      })

      const line = new THREE.Line(geometry, material)
      groupRef.current!.add(line)
    })

    return () => {
      if (groupRef.current) {
        groupRef.current.clear()
      }
    }
  }, [connections])

  return <group ref={groupRef} />
}