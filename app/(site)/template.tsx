'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import BackgroundStars from './components/Constellation/BackgroundStars'
import { Canvas } from '@react-three/fiber'
import SpinningMoon3D from './components/SpinningMoon'

// Global variable to track if this is the initial site load
let hasInitiallyLoaded = false
export default function Template({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const previousPathname = useRef<string>('')


  const isHomePage = pathname === '/'
  const isMoonPage = pathname === '/moon'
  const isSearchPage = pathname === '/search-results'
  const isEnquiryPage = pathname === '/enquiry'
  const isAboutPage = pathname === '/about'
  console.log("pathname is:", pathname);

  const isComingFromEnquiry = previousPathname.current === '/enquiry' && isHomePage


  const [isLoading, setIsLoading] = useState(true)
  const [showZoom, setShowZoom] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  console.log('initial load:', isInitialLoad)

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
    // Check if this is the initial load
    if (isHomePage && !hasInitiallyLoaded) {
      setIsInitialLoad(true)
      hasInitiallyLoaded = true
    } else {
      setIsInitialLoad(false)
    }

    // Reset states when pathname changes
    setIsLoading(true)
    setShowZoom(false)
    setShowContent(false)

    //  HOME PAGE - Initial Load with Moon Animation
    if (isHomePage && isInitialLoad) {
      // Start zoom animation after 3 seconds
      const zoomTimer = setTimeout(() => {
        setShowZoom(true)
      }, 3000)

      // Hide loading and show children after 3.5 seconds
      const loadingTimer = setTimeout(() => {
        setIsLoading(false)
      }, 3500)

      // Show content after transition completes
      const contentTimer = setTimeout(() => {
        setShowContent(true)
      }, 3500)

      return () => {
        clearTimeout(zoomTimer)
        clearTimeout(loadingTimer)
        clearTimeout(contentTimer)
      }
    }
    // HOME PAGE - Coming from Enquiry (no moon, faster transition)
    else if (isComingFromEnquiry) {
      const zoomTimer = setTimeout(() => {
        setShowZoom(true)
      }, 1000)

      const loadingTimer = setTimeout(() => {
        setIsLoading(false)
      }, 1500)

      const contentTimer = setTimeout(() => {
        setShowContent(true)
      }, 1500)

      return () => {
        clearTimeout(zoomTimer)
        clearTimeout(loadingTimer)
        clearTimeout(contentTimer)
      }
    }
    // HOME PAGE - Subsequent visits (use regular transition)
    else if (isHomePage && !isInitialLoad) {
      // Start zoom animation after 2 seconds (same as other pages)
      const zoomTimer = setTimeout(() => {
        setShowZoom(true)
      }, 2000)

      // Hide loading and show children after 2.5 seconds
      const loadingTimer = setTimeout(() => {
        setIsLoading(false)
      }, 2500)

      // Show content after transition completes
      const contentTimer = setTimeout(() => {
        setShowContent(true)
      }, 2500)

      return () => {
        clearTimeout(zoomTimer)
        clearTimeout(loadingTimer)
        clearTimeout(contentTimer)
      }
    }
    //  OTHER PAGES
    else if (isMoonPage || isSearchPage || isEnquiryPage || isAboutPage) {
      // Start zoom animation after 1 seconds
      const zoomTimer = setTimeout(() => {
        setShowZoom(true)
      }, 1000)

      // Hide loading and show children after 1.5 seconds
      const loadingTimer = setTimeout(() => {
        setIsLoading(false)
      }, 1500)

      // Show content after transition completes
      const contentTimer = setTimeout(() => {
        setShowContent(true)
      }, 1500)

      return () => {
        clearTimeout(zoomTimer)
        clearTimeout(loadingTimer)
        clearTimeout(contentTimer)
      }
    }
    // Update previous pathname
    return () => {
      previousPathname.current = pathname
    }
  }, [pathname, isInitialLoad, isComingFromEnquiry]) // Add isInitialLoad dependency

  if (isHomePage) {
    return (
      <>
        <AnimatePresence>
          {isLoading && (
            <motion.div
              key={isComingFromEnquiry ? "loading-from-enquiry" : (isInitialLoad ? "loading-initial" : "loading-home-return")}
              initial={{
                scale: 1,
                opacity: isInitialLoad ? 1 : 0,
                rotate: 0
              }}
              animate={{
                scale: showZoom ? (isInitialLoad ? 5 : 2) : 1,
                rotate: showZoom && isInitialLoad ? 15 : 0,
                opacity: 1,
              }}
              exit={{ opacity: 0 }}
              transition={{
                scale: {
                  duration: isComingFromEnquiry ? 1.5 : (isInitialLoad ? 3 : 2),
                  ease: "easeInOut"
                },
                rotate: {
                  duration: isInitialLoad ? 3 : 2,
                  ease: [0.25, 0.1, 0.25, 1]
                },
                opacity: {
                  duration: isComingFromEnquiry ? 0.5 : (isInitialLoad ? 0.5 : 1),
                  ease: "easeInOut"
                }
              }}
              className="fixed inset-0 z-50"
              style={{
                transformOrigin: showZoom
                  ? (window.innerWidth < 768 ? 'center 40vh' : 'center center')
                  : 'center center'
              }}
            >
              {/* OLD moon loader - CSS only*/}

              {/* <div className="main-bg">
              <div className="bg-wrapper">
                <div className="dots-1 dots"></div>
                <div className="dots-2 dots"></div>
                <div className="dots-3 dots"></div>
                <div className="h-screen flex justify-center items-center">
                  <div className="moon-container">
                    <div className="moon-spin"></div>
                    <section className="moon-texture"></section>
                  </div>
                </div>
              </div>
            </div> */}
              {/* TODO; fix weird white line flashing on the top left and top of the screen*/}
              <div className="main-bg z-10 bg-[#000814]">
                <div className="bg-wrapper z-10">
                  {/* 3D Stars Background */}
                  <div className="absolute inset-0 z-20 bg-[#000814]">
                    <Canvas
                      className="!bg-transparent"
                      style={{ background: 'transparent' }}
                      gl={{ alpha: true, antialias: true }}
                    >
                      <BackgroundStars rotationSpeed={{ x: 0, y: 0 }} />
                      {/* TODO: fix so that the moon only shows on Initial Load:*/}
                      {!isComingFromEnquiry && (
                        <SpinningMoon3D
                          position={[0, 0, 2]}
                          scale={isMobile ? 2 : 2.3}
                          rotationSpeed={0.005}
                        />
                      )}
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
        {/* Dark overlay to prevent white flash */}
        {!showContent && (
          <div className="fixed inset-0 bg-[#000814] z-40"></div>
        )}
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