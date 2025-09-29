'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import BackgroundStars from './components/Constellation/BackgroundStars'
import { Canvas } from '@react-three/fiber'
import CameraZoom from './components/CameraZoom'

// Global variable to track if this is the initial site load
let hasInitiallyLoaded = false
export default function Template({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const isHomePage = pathname === '/'
  const isMoonPage = pathname === '/moon'
  const isSearchPage = pathname === '/search-results'
  const isEnquiryPage = pathname === '/enquiry'
  const isAboutPage = pathname === '/about'

  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Initialize cameFromEnquiry by checking sessionStorage immediately, using sessionStorage instead of useRef because it persists. UseRef was being reset too often
  const [cameFromEnquiry, setCameFromEnquiry] = useState(() => {
    if (typeof window !== 'undefined') {
      const prevPath = sessionStorage.getItem('previousPathname') || ''
      return prevPath === '/enquiry' && pathname === '/'
    }
    return false
  })

  console.log('initial load:', isInitialLoad)
  console.log('pathname is:', pathname)
  console.log('cameFromEnquiry:', cameFromEnquiry)

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Get previous pathname from sessionStorage (persists across remounts)
    const prevPath = sessionStorage.getItem('previousPathname') || ''

    // Only update cameFromEnquiry if we haven't already (on first render only)
    if (prevPath === '/enquiry' && isHomePage && !cameFromEnquiry) {
      setCameFromEnquiry(true)
    }

    // Reset cameFromEnquiry when leaving home page
    if (!isHomePage && cameFromEnquiry) {
      setCameFromEnquiry(false)
    }

    // Store current pathname for next navigation
    sessionStorage.setItem('previousPathname', pathname)

    console.log('Effect running - prevPath:', prevPath, 'current cameFromEnquiry:', cameFromEnquiry)

    // Check if this is the initial load
    if (isHomePage && !hasInitiallyLoaded) {
      setIsInitialLoad(true)
      hasInitiallyLoaded = true
    } else {
      setIsInitialLoad(false)
    }

    // Reset states when pathname changes
    setIsLoading(true)
    setShowContent(false)

    //  HOME PAGE - Initial Load with Moon Animation
    if (isHomePage && isInitialLoad) {
      // Camera animation handles timing via onZoomComplete callback
    }
    // HOME PAGE - Coming from Enquiry (no moon, faster transition)
    else if (cameFromEnquiry) {
      // Shorter wait since no moon
      const loadingTimer = setTimeout(() => {
        setIsLoading(false)
        setShowContent(true)
      }, 1500)

      return () => {
        clearTimeout(loadingTimer)
      }
    }
    // HOME PAGE - Subsequent visits (use regular transition)
    else if (isHomePage && !isInitialLoad) {
      // Camera animation handles timing via onZoomComplete callback
    }
    //  OTHER PAGES
    else if (isMoonPage || isSearchPage || isEnquiryPage || isAboutPage) {
      // Start zoom animation after 1 seconds
      const loadingTimer = setTimeout(() => {
        setIsLoading(false)
      }, 1500)

      const contentTimer = setTimeout(() => {
        setShowContent(true)
      }, 1500)

      return () => {
        clearTimeout(loadingTimer)
        clearTimeout(contentTimer)
      }
    }

  }, [pathname, isInitialLoad, isHomePage, isMoonPage, isSearchPage, isEnquiryPage, isAboutPage])

  if (isHomePage) {

    return (
      <>
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              key={cameFromEnquiry ? "loading-from-enquiry" : (isInitialLoad ? "loading-initial" : "loading-home-return")}
              initial={{
                opacity: isInitialLoad ? 1 : 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: {
                  duration: cameFromEnquiry ? 0.5 : 1,
                  ease: "easeInOut"
                }
              }}
              className="fixed inset-0 z-50 bg-[#000814]"
            >

              <Canvas
                className="w-full h-full"
                style={{ background: '#000814' }}
                gl={{ alpha: false, antialias: true }}
                camera={{ position: [0, 0, 5], fov: 75 }}
              >
                {/* Camera zoom contains stars and moon */}
                <CameraZoom
                  showMoon={!cameFromEnquiry}
                  isInitialLoad={isInitialLoad}
                  isMobile={isMobile}
                  onZoomComplete={() => {
                    setIsLoading(false)
                    setShowContent(true)
                  }}
                />
              </Canvas>
            </motion.div >
          )
          }
        </AnimatePresence >

        {/* Hide content until transition completes */}
        < div className={`transition-opacity duration-300 ${showContent ? 'opacity-100' : 'opacity-0'}`
        }>
          {children}
        </div >
        {/* Dark overlay to prevent white flash */}
        {
          !showContent && (
            <div className="fixed inset-0 bg-[#000814] z-40"></div>
          )
        }
      </ >
    )
  } else if (isMoonPage || isSearchPage || isEnquiryPage || isAboutPage) {
    return (
      <div className="bg-[#000814] min-h-screen">
        <AnimatePresence>
          {isLoading && (
            <motion.div
              key={`loading-${pathname}`} // Unique key per page
              initial={{ scale: 1, opacity: 0 }}
              animate={{
                opacity: 1,
              }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: {
                  duration: 1,
                  ease: "easeInOut"
                }
              }}
              className="fixed inset-0 z-50 bg-[#000814]"
              style={{
                transformOrigin: 'center center'
              }}
            >
              <div className="main-bg bg-[#000814]">
                <div className="bg-wrapper">
                  <div className="h-screen flex justify-center items-center bg-[#000814]">
                    <Canvas
                      className="!bg-transparent"
                      style={{ background: 'transparent' }}
                      gl={{ alpha: true, antialias: true }}
                    >
                      <BackgroundStars rotationSpeed={{ x: 0, y: 0 }} />
                    </Canvas>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hide content until transition completes */}
        <div className={`transition-opacity duration-300 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
          {children}
        </div>
      </div >
    )
  }

  // Fallback for other pages
  return <>{children}</>
}