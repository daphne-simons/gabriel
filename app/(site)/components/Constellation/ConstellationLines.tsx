'use client'
import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Vector3 } from 'three'

export default function ConstellationLines({ color, particles, lineThickness }: { color: string, particles: Array<{ name: string; position: [number, number, number] }>, lineThickness: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const linesRef = useRef<THREE.Mesh[]>([])
  const glowLinesRef = useRef<THREE.Mesh[]>([])
  const LINE_THICKNESS = lineThickness

  const connections = useMemo(() => {
    if (particles.length < 2) return []

    const lines = []
    const maxConnections = 2
    const maxDistance = 180

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
            baseOpacity: Math.max(0.4, 0.8 - (distance / maxDistance) * 0.4) // Less dramatic fade
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
    glowLinesRef.current = []

    // Create custom shader material for soft glow
    const createGlowMaterial = (baseOpacity: number, radius: number = 1.0) => {
      return new THREE.ShaderMaterial({
        uniforms: {
          color: { value: new THREE.Color(color) },
          opacity: { value: baseOpacity },
          radius: { value: radius }
        },
        vertexShader: `
          varying vec2 vUv;
          varying vec3 vNormal;
          void main() {
            vUv = uv;
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color;
          uniform float opacity;
          uniform float radius;
          varying vec2 vUv;
          varying vec3 vNormal;
          
          void main() {
            // Create circular gradient based on UV coordinates
            vec2 center = vec2(0.5, 0.5);
            float dist = distance(vUv, center) * 2.0; // Scale distance
            
            // Create soft falloff
            float alpha = 1.0 - smoothstep(0.0, radius, dist);
            alpha = pow(alpha, 2.0); // Sharper falloff for more defined center
            
            gl_FragColor = vec4(color, alpha * opacity);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthTest: true,
        side: THREE.DoubleSide
      })
    }

    connections.forEach((connection) => {
      const startPos = new Vector3(...particles[connection.startIndex].position)
      const endPos = new Vector3(...particles[connection.endIndex].position)

      const curve = new THREE.LineCurve3(startPos, endPos)

      // Create main line with soft glow shader
      const tubeGeometry = new THREE.TubeGeometry(
        curve,
        1,
        LINE_THICKNESS * 0.8,
        8,
        false
      )

      const material = createGlowMaterial(connection.baseOpacity * 2, 1)
      const tubeMesh = new THREE.Mesh(tubeGeometry, material)
      tubeMesh.renderOrder = 1

      // Create larger glow halo
      const glowGeometry = new THREE.TubeGeometry(
        curve,
        1,
        LINE_THICKNESS * 3.0, // Much wider for diffuse glow
        8,
        false
      )

      const glowMaterial = createGlowMaterial(connection.baseOpacity * 1, 2)
      const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial)
      glowMesh.renderOrder = 0

      groupRef.current!.add(glowMesh) // Add glow first
      groupRef.current!.add(tubeMesh) // Add main line on top

      glowLinesRef.current.push(glowMesh)
      linesRef.current.push(tubeMesh)
    })

    return () => {
      if (groupRef.current) {
        groupRef.current.clear()
      }
      linesRef.current = []
      glowLinesRef.current = []
    }
  }, [connections, particles, LINE_THICKNESS])

  useFrame((state) => {
    if (!groupRef.current || linesRef.current.length === 0) return

    const time = state.clock.getElapsedTime()

    connections.forEach((connection, index) => {
      const mesh = linesRef.current[index]
      const glowMesh = glowLinesRef.current[index]
      if (!mesh || !glowMesh) return

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

      // Update main line geometry
      const newGeometry = new THREE.TubeGeometry(
        curve,
        1,
        LINE_THICKNESS * 0.8,
        8,
        false
      )

      // Update glow line geometry
      const newGlowGeometry = new THREE.TubeGeometry(
        curve,
        1,
        LINE_THICKNESS * 3.0,
        8,
        false
      )

      mesh.geometry.dispose()
      mesh.geometry = newGeometry

      glowMesh.geometry.dispose()
      glowMesh.geometry = newGlowGeometry

      const currentDistance = new Vector3(...dynamicStartPos).distanceTo(new Vector3(...dynamicEndPos))
      // 
      const maxDistance = 180
      const dynamicOpacity = Math.max(0.3, 0.9 - (currentDistance / maxDistance) * 0.3) * connection.baseOpacity

      // Update shader material uniforms
      if (mesh.material instanceof THREE.ShaderMaterial) {
        mesh.material.uniforms.opacity.value = dynamicOpacity * 1.5
      }

      if (glowMesh.material instanceof THREE.ShaderMaterial) {
        glowMesh.material.uniforms.opacity.value = dynamicOpacity * 0.5
      }
    })
  })

  return <group ref={groupRef} />
}