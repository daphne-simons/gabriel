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
    // Start zoom animation after 3.5 seconds
    const zoomTimer = setTimeout(() => {
      setShowZoom(true)
      // initial loading state
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
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          initial={{ scale: 1 }}
          animate={{
            scale: showZoom ? 5 : 1,
            opacity: showZoom ? 0 : 1
          }}
          exit={{ opacity: 0 }}
          transition={{
            scale: { duration: 2, ease: "easeInOut" },
            opacity: { duration: 1 }
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
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          // entry={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}