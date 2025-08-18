'use client'
import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Vector3 } from 'three'

export default function ConstellationLines({ particles }: { particles: Array<{ name: string; position: [number, number, number] }> }) {
  const groupRef = useRef<THREE.Group>(null)
  const linesRef = useRef<THREE.Line[]>([])

  const connections = useMemo(() => {
    if (particles.length < 2) return []

    const lines = []
    const maxConnections = 2 // Maximum connections per particle
    const maxDistance = 160 // Maximum distance to connect particles

    for (let i = 0; i < particles.length; i++) {
      const currentParticle = particles[i]
      let connectionCount = 0

      for (let j = i + 1; j < particles.length && connectionCount < maxConnections; j++) {
        const targetParticle = particles[j]

        const distance = new Vector3(...currentParticle.position).distanceTo(new Vector3(...targetParticle.position))

        if (distance < maxDistance) {
          lines.push({
            startIndex: i,
            endIndex: j,
            baseOpacity: Math.max(1, 1 - (distance / maxDistance))
          })
          connectionCount++
        }
      }
    }
    return lines
  }, [particles])

  // Create Three.js line objects
  useEffect(() => {
    if (!groupRef.current) return

    // Clear existing lines
    groupRef.current.clear()
    linesRef.current = []

    connections.forEach((connection) => {
      const points = []
      points.push(new Vector3(...particles[connection.startIndex].position))
      points.push(new Vector3(...particles[connection.endIndex].position))

      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const material = new THREE.LineBasicMaterial({
        color: 0x60a5fa,
        transparent: true,
        opacity: connection.baseOpacity * 0.7
      })

      const line = new THREE.Line(geometry, material)
      groupRef.current!.add(line)
      linesRef.current.push(line)
    })

    return () => {
      if (groupRef.current) {
        groupRef.current.clear()
      }
      linesRef.current = []
    }
  }, [connections, particles])

  // Update line positions every frame to follow the moving particles
  useFrame((state) => {
    if (!groupRef.current || linesRef.current.length === 0) return

    const time = state.clock.getElapsedTime()

    connections.forEach((connection, index) => {
      const line = linesRef.current[index]
      if (!line) return

      const startParticle = particles[connection.startIndex]
      const endParticle = particles[connection.endIndex]

      // Calculate the same parallax movement as the Particle component
      const calculateDynamicPosition = (basePosition: [number, number, number]) => {
        const parallaxZ = Math.sin(time * 0.8 + basePosition[0] * 0.05) * 3
        const parallaxX = Math.sin(time * 0.6 + basePosition[1] * 0.03) * 4
        const parallaxY = Math.cos(time * 0.7 + basePosition[0] * 0.04) * 4

        return [
          basePosition[0] + parallaxX,
          basePosition[1] + parallaxY,
          basePosition[2] + parallaxZ
        ]
      }

      const dynamicStartPos = calculateDynamicPosition(startParticle.position)
      const dynamicEndPos = calculateDynamicPosition(endParticle.position)

      // Update line geometry with new positions
      const positions = line.geometry.attributes.position
      positions.setXYZ(0, dynamicStartPos[0], dynamicStartPos[1], dynamicStartPos[2])
      positions.setXYZ(1, dynamicEndPos[0], dynamicEndPos[1], dynamicEndPos[2])
      positions.needsUpdate = true

      // Optional: Update opacity based on current distance for more dynamic effect
      const currentDistance = new Vector3(...dynamicStartPos).distanceTo(new Vector3(...dynamicEndPos))
      const maxDistance = 150
      const dynamicOpacity = Math.max(0.3, 1 - (currentDistance / maxDistance)) * connection.baseOpacity * 0.7

      if (line.material instanceof THREE.LineBasicMaterial) {
        line.material.opacity = dynamicOpacity
      }
    })
  })

  return <group ref={groupRef} />
}