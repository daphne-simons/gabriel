'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function Template({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  const [isLoading, setIsLoading] = useState(isHomePage)
  // const [isLoading, setIsLoading] = useState(true)
  const [showZoom, setShowZoom] = useState(false)

  useEffect(() => {

    // Only run loading animation on home page
    if (!isHomePage) return
    // Start zoom animation after 3.5 seconds - 
    // change to 1 second for trial
    const zoomTimer = setTimeout(() => {
      setShowZoom(true)
    }, 3000)

    // Hide loading and show children after 4 seconds
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 3500)

    return () => {
      clearTimeout(zoomTimer)
      clearTimeout(loadingTimer)
    }
  }, [])

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loading"
            initial={{ scale: 1, opacity: 1, rotate: 0 }}
            animate={{
              scale: showZoom ? 5 : 1,
              rotate: showZoom ? 15 : 0, // Subtle 15-degree rotation
            }}
            exit={{ opacity: 0 }}
            transition={{
              scale: { duration: 3, ease: "easeInOut" },
              rotate: { duration: 3, ease: [0.25, 0.1, 0.25, 1] }, // Custom cubic-bezier },
              opacity: { duration: 3, ease: "easeInOut" }
            }}
            className="fixed inset-0 z-50"
            style={{
              transformOrigin: showZoom
                ? (window.innerWidth < 768 ? 'center 40vh' : 'center center')
                : 'center center'
            }}
          >
            <div className="main-bg">
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
            </div>
          </motion.div>
        )}
      </AnimatePresence >
      {/* The App content, e.g. HomePage for '/' route*/}
      {children}
    </>
  )
}