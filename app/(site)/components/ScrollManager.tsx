// components/ScrollManager.tsx
'use client'

import { useEffect } from 'react'

export default function ScrollManager() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual'

      // Prevent iOS bounce scrolling
      document.body.style.overscrollBehavior = 'none'
    }
  }, [])

  return null // This component renders nothing
}