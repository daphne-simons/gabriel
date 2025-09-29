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
}

export default function CameraZoom({
  showMoon,
  isInitialLoad,
  isMobile,
  onZoomComplete
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
      // Start zoom after delay
      const currentTime = state.clock.elapsedTime

      if (zoomStartTimeRef.current === null) {
        // zoomStartTimeRef.current = currentTime + (isInitialLoad ? 3 : 2) // too fast
        zoomStartTimeRef.current = currentTime + 1

      }

      if (currentTime >= zoomStartTimeRef.current) {
        // const zoomDuration = isInitialLoad ? 3 : 2 // too fast
        const zoomDuration = 2.8

        const zoomProgress = Math.min((currentTime - zoomStartTimeRef.current) / zoomDuration, 1)

        // Easing function (easeInOut)
        const eased = zoomProgress < 0.5
          ? 2 * zoomProgress * zoomProgress
          : 1 - Math.pow(-2 * zoomProgress + 2, 2) / 2

        // Zoom camera from start to end
        const startZ = 5
        const endZ = 4
        camera.position.z = startZ + (endZ - startZ) * eased

        // Add rotation for initial load
        if (isInitialLoad) {
          rotationRef.current = eased * 15 * (Math.PI / 180) // 15 degrees
          camera.rotation.z = rotationRef.current
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
          position={[0, 0, 2]}
          scale={isMobile ? 2 : 2.3}
          rotationSpeed={0.005}
        />
      )}
    </>
  )
}
