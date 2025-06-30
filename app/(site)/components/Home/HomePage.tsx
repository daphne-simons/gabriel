'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import BackGround from '../BackGround'
import HomeSearchBar from '../Home/HomeSearchBar'
import MoonWidget from '../MoonWidget'
import HomeLogo from '../Logos/HomeLogo'
import { calculateBgColor, getMoonPhaseForWidget } from '@/app/(site)/utils/moon-utils'
import { Category } from '@/sanity/models/sanity-client-models'


const useVariableFontAnimation = () => {
  const [fontSettings, setFontSettings] = useState({ wght: 200, opsz: 72 })
  const [isTouch, setIsTouch] = useState(false)
  const animationRef = useRef<number | null>(null)
  const timeRef = useRef(0)

  // Mobile/Touch device detection - moved inside useEffect
  const isTouchDevice = () => {
    if (typeof window === 'undefined') return false
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    )
  }
  // Manual mouse update (your existing logic)
  const updateText = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch) return // Don't update on touch devices

    const multiplierWidth = e.clientX / window.innerWidth
    const multiplierOpsz = e.clientY / window.innerHeight
    const randomWeight = multiplierWidth * (1000 - 200) + 200
    const randomOpsz = multiplierOpsz * (72 - 12) + 12

    setFontSettings({ wght: randomWeight, opsz: randomOpsz })
  }

  // Automatic animation for touch devices
  const animateFont = () => {
    timeRef.current += 0.02

    const x = (Math.sin(timeRef.current) + Math.sin(timeRef.current * 0.7) * 0.5 + 1) / 2
    const y = (Math.cos(timeRef.current * 0.8) + Math.cos(timeRef.current * 1.2) * 0.3 + 1) / 2

    const weight = x * (1000 - 200) + 200
    const opsz = y * (72 - 12) + 12

    setFontSettings({ wght: weight, opsz: opsz })

    if (animationRef.current) {
      animationRef.current = requestAnimationFrame(animateFont)
    }
  }

  useEffect(() => {
    // Detect touch device after component mounts
    const touchDevice = isTouchDevice()
    setIsTouch(touchDevice)

    if (touchDevice) {
      // Start animation for touch devices
      animationRef.current = requestAnimationFrame(animateFont)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }
  }, [])


  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }
  }, [])

  return {
    fontSettings,
    updateText,
    isTouch
  }
}


export default function HomePage({ categories }: { categories: Category[] }) {

  const { fontSettings, updateText } = useVariableFontAnimation()
  const [isOpen, setIsOpen] = useState(false)
  // Calculates moon theme directly from JSON file - no API needed!
  const theme = calculateBgColor() // Uses current date by default
  const phase = getMoonPhaseForWidget()

  // Closes dropdown when clicking elsewhere on page
  const closeDropDown = () => {
    if (isOpen === false) return
    else setIsOpen(!isOpen)
  }

  return (
    <Suspense >
      {/* This is listening to the mousemoves on the whole page, to update the Variable fontSettings in the HomeLogo */}
      <div onMouseMove={updateText} onClick={closeDropDown}>
        {/* Background wrapper to dynamically change theme according to Moon Phase. */}
        <BackGround theme={theme}>
          <div
            className={`flex flex-col justify-between h-screen fill-current ${theme.textColor} z-20`}
          >
            {/* Nav */}
            <div className="flex justify-between mt-5 px-7 text-sm">
              <Link href="/about" className="flex gap-8 hover:underline items-center">
                About
              </Link>
              <MoonWidget size={'smallMoon'} phase={phase} />
            </div>
            {/* Middle section  */}
            <div className="relative middle flex flex-col justify-evenly items-center h-[30%] -top-44 max-md:-top-20">
              {/* Heading */}
              <HomeLogo fontSettings={fontSettings} logoColor={theme.logoColor} />
              {/* Search Input  && Feeling Lucky Button */}
              <HomeSearchBar
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                categories={categories}
                theme={theme}
              />
            </div>
            <div></div>
          </div>
        </BackGround>
      </div>
    </Suspense>
  )
}
