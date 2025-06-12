'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Template({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [showZoom, setShowZoom] = useState(false)

  useEffect(() => {
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
            initial={{ scale: 1, opacity: 1 }}
            animate={{
              scale: showZoom ? 5 : 1,
              // opacity: showZoom ? 1 : 0.9
            }}
            exit={{ opacity: 0 }}
            transition={{
              scale: { duration: 3, ease: "easeInOut" },
              opacity: { duration: 3, ease: "easeInOut" }
            }}
            className="fixed inset-0 z-50"
          >
            <div className="main-bg">
              <div className="bg-wrapper">
                <div className="dots-1 dots"></div>
                <div className="dots-2 dots"></div>
                <div className="dots-3 dots"></div>
                <div className="h-screen flex justify-center items-center">
                  <div className="med-moon-container">
                    <div className="med-moon-spin"></div>
                    <section className="med-moon-texture"></section>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        key="content"
        initial={{ scale: 0.9, filter: "blur(10px)" }}
        animate={{
          opacity: isLoading ? 0 : 1,
          scale: isLoading ? 1 : 1,
          filter: isLoading ? "blur(10px)" : "blur(0px)"
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          // delay: showZoom ? 0.2 : 0
        }}
      >
        {children}
      </motion.div>
    </>
  )
}