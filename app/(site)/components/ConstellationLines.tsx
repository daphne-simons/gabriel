// Component to create glowing lines between particles
'use client'
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { AdditiveBlending, Vector3 } from 'three';

export default function ConstellationLines({ particles }: { particles: Array<{ username: string; position: [number, number, number] }> }) {
  const linesRef = useRef<THREE.Group>(null)

  const connections = useMemo(() => {
    const lines = []
    const maxConnections = 3 // Maximum connections per particle
    const maxDistance = 150 // Maximum distance to connect particles

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
            opacity: Math.max(0.1, 1 - (distance / maxDistance))
          })
          connectionCount++
        }
      }
    }
    return lines
  }, [particles])

  return (
    <group ref={linesRef}>
      {connections.map((connection, index) => (
        <line key={index}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                ...connection.start,
                ...connection.end
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#4a9eff"
            transparent
            opacity={connection.opacity * 0.4}
            blending={AdditiveBlending}
          />
        </line>
      ))}
    </group>
  )
}