'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import BackGround from '../BackGround'
import HomeSearchBar from '../HomeSearchBar'
import MoonWidget from '../MoonWidget'
import HomeLogo from '../Logos/HomeLogo'
import MoonLoader from '../MoonLoader'
import getMoon from '@/query/utils/getMoonData'
import { useQuery } from '@tanstack/react-query'
import { calculateBgColor } from '@/app/(site)/utils/moon-utils'
import { Category } from '@/sanity/models/sanity-client-models'

export default function HomePage({ categories }: { categories: Category[] }) {
  // Variable Font changes logic:
  const [fontSettings, setFontSettings] = useState({ wght: 200, opsz: 72 })
  const [isOpen, setIsOpen] = useState(false)

  const updateText = (e: React.MouseEvent<HTMLDivElement>) => {
    const multiplierWidth = e.clientX / window.innerWidth
    const multiplierOpsz = e.clientY / window.innerHeight
    const randomWeight = multiplierWidth * (1000 - 200) + 200
    const randomOpsz = multiplierOpsz * (72 - 12) + 12

    setFontSettings({ wght: randomWeight, opsz: randomOpsz })
  }

  // getMoon() data from query utils:
  const {
    data: moonData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['moon'],
    queryFn: () => getMoon(),
  })

  if (isLoading) {
    return (
      <>
        <div className="bg-gray-800 h-screen flex items-center justify-center z-0">
          <MoonLoader size="medMoon" />
        </div>
      </>
    )
  }

  if (isError) {
    return <div>Sorry There was an Error</div>
  }
  // For generating dynamic themes for Moon:
  if (moonData) {
    const lightValue = Number(
      moonData.phase[new Date().getDate()].lighting.toFixed(0)
    )
    // To test dynamic moon theme:
    const theme = calculateBgColor(lightValue)
    // To test hard coded Full Moon Styling:
    // const theme = calculateBgColor(50)

    // closes dropdown when clicking elsewhere on page
    const closeDropDown = () => {
      if (isOpen === false) return
      else setIsOpen(!isOpen)
    }

    if (theme)
      return (
        <Suspense fallback={<div>Loading...</div>}>
          {/* This is listening to the mousemoves on the whole page, to update the Variable fontSettings in the HomeLogo */}
          <div onMouseMove={updateText} onClick={closeDropDown}>
            {/* Background wrapper to dynamically change theme according to Moon Phase. */}
            <BackGround theme={theme}>
              {/* TODO: make everything here totally sharp! not inheret blur effect from BackGround */}
              <div
                className={`flex flex-col justify-between h-screen fill-current ${theme.textColor} z-20`}
              >
                {/* Nav */}
                <div className="flex justify-between mt-5 px-7 text-sm">
                  <Link href="/about" className="flex gap-8 hover:underline">
                    About
                  </Link>
                  <MoonWidget size={'smallMoon'} />
                </div>
                {/* Middle section  */}
                <div className="relative middle flex flex-col justify-evenly items-center h-[30%] -top-44 max-md:-top-20">
                  {/* Heading */}
                  <HomeLogo fontSettings={fontSettings} />
                  {/* Div for Search Input  && */}
                  {/* Feeling Lucky/ Contact Button */}
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
}
