import React, { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import BackgroundStars from './Constellation/BackgroundStars'
import SpinningMoon3D from './SpinningMoon'

interface CameraZoomProps {
  showMoon: boolean
  isInitialLoad: boolean
  isMobile: boolean
  onZoomComplete: () => void
  onProgress?: (progress: number) => void // 👈 new

}

export default function CameraZoom({
  showMoon,
  isInitialLoad,
  isMobile,
  onZoomComplete,
  onProgress
}: CameraZoomProps) {
  const { camera } = useThree()
  const hasZoomedRef = useRef(false)
  const zoomStartTimeRef = useRef<number | null>(null)
  const rotationRef = useRef(0)

  useEffect(() => {
    // Reset camera position when component mounts
    camera.position.set(0, 0, 5)
    camera.lookAt(0, 0, 0)
    hasZoomedRef.current = false
    zoomStartTimeRef.current = null
  }, [camera])

  useFrame((state) => {
    if (!hasZoomedRef.current) {
      const currentTime = state.clock.elapsedTime

      // initialize start time
      if (zoomStartTimeRef.current === null) {
        zoomStartTimeRef.current = currentTime + 1
      }

      if (currentTime >= zoomStartTimeRef.current) {
        const zoomDuration = 2.0
        const zoomProgress = Math.min(
          (currentTime - zoomStartTimeRef.current) / zoomDuration,
          1
        )

        // Quadratic ease-in
        const eased = zoomProgress * zoomProgress

        // Camera zoom
        const startZ = 5
        const endZ = 3
        camera.position.z = startZ + (endZ - startZ) * eased

        // Initial load rotation
        if (isInitialLoad) {
          rotationRef.current = eased * 15 * (Math.PI / 180) // 15 degrees
          camera.rotation.z = rotationRef.current
        }

        // 🔑 delayed opacity fade
        if (typeof onProgress === 'function') {
          const fadeStart = 0.8 // start fading after 70% progress
          const fadeProgress = zoomProgress < fadeStart
            ? 0
            : (zoomProgress - fadeStart) / (1 - fadeStart) // maps 0 → 1 only after fadeStart
          onProgress(fadeProgress)
        }
        if (zoomProgress >= 1) {
          hasZoomedRef.current = true
          onZoomComplete()
        }
      }
    }
  })


  return (
    <>
      <BackgroundStars rotationSpeed={{ x: 0, y: 0 }} />
      {showMoon && (
        <SpinningMoon3D
          position={isMobile ? [0, -0.3, 2] : [0, 0, 1.6]}
          scale={isMobile ? 2.2 : 2.3}
          rotationSpeed={0.005}
        />
      )}
    </>
  )
}
