'use client'
import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Vector3 } from 'three'

export default function ConstellationLines({ particles, lineThickness }: { particles: Array<{ name: string; position: [number, number, number] }>, lineThickness: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const linesRef = useRef<THREE.Mesh[]>([])
  const LINE_THICKNESS = lineThickness

  const connections = useMemo(() => {
    if (particles.length < 2) return []

    const lines = []
    const maxConnections = 2
    const maxDistance = 160

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
            baseOpacity: Math.max(0.1, 1 - (distance / maxDistance))
          })
          connectionCount++
        }
      }
    }
    return lines
  }, [particles])

  useEffect(() => {
    if (!groupRef.current) return

    groupRef.current.clear()
    linesRef.current = []

    connections.forEach((connection) => {
      const startPos = new Vector3(...particles[connection.startIndex].position)
      const endPos = new Vector3(...particles[connection.endIndex].position)

      const curve = new THREE.LineCurve3(startPos, endPos)

      const tubeGeometry = new THREE.TubeGeometry(
        curve,
        1,
        LINE_THICKNESS,
        6,
        false
      )

      const material = new THREE.MeshBasicMaterial({
        color: 0x60a5fa,
        transparent: true,
        opacity: connection.baseOpacity * 0.7,
        depthWrite: false, // Allow particles to render on top
        depthTest: true,
      })

      const tubeMesh = new THREE.Mesh(tubeGeometry, material)

      // Set render order - lower numbers render first (behind). E.g. constellation lines will render first
      tubeMesh.renderOrder = 0

      groupRef.current!.add(tubeMesh)
      linesRef.current.push(tubeMesh)
    })

    return () => {
      if (groupRef.current) {
        groupRef.current.clear()
      }
      linesRef.current = []
    }
  }, [connections, particles, LINE_THICKNESS])

  useFrame((state) => {
    if (!groupRef.current || linesRef.current.length === 0) return

    const time = state.clock.getElapsedTime()

    connections.forEach((connection, index) => {
      const mesh = linesRef.current[index]
      if (!mesh) return

      const startParticle = particles[connection.startIndex]
      const endParticle = particles[connection.endIndex]

      const calculateDynamicPosition = (basePosition: [number, number, number]) => {
        const parallaxZ = Math.sin(time * 0.8 + basePosition[0] * 0.05) * 3
        const parallaxX = Math.sin(time * 0.6 + basePosition[1] * 0.03) * 4
        const parallaxY = Math.cos(time * 0.7 + basePosition[0] * 0.04) * 4

        return [
          basePosition[0] + parallaxX,
          basePosition[1] + parallaxY,
          basePosition[2] + parallaxZ - 1 // Move lines slightly back
        ]
      }

      const dynamicStartPos = calculateDynamicPosition(startParticle.position)
      const dynamicEndPos = calculateDynamicPosition(endParticle.position)

      const startPos = new Vector3(...dynamicStartPos)
      const endPos = new Vector3(...dynamicEndPos)
      const curve = new THREE.LineCurve3(startPos, endPos)

      const newGeometry = new THREE.TubeGeometry(
        curve,
        1,
        LINE_THICKNESS,
        6,
        false
      )

      mesh.geometry.dispose()
      mesh.geometry = newGeometry

      const currentDistance = new Vector3(...dynamicStartPos).distanceTo(new Vector3(...dynamicEndPos))
      const maxDistance = 150
      const dynamicOpacity = Math.max(0.1, 1 - (currentDistance / maxDistance)) * connection.baseOpacity * 0.7

      if (mesh.material instanceof THREE.MeshBasicMaterial) {
        mesh.material.opacity = dynamicOpacity
      }
    })
  })

  return <group ref={groupRef} />
}