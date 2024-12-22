'use client'
import { useState } from 'react'

import Link from 'next/link'
import BackGround from './components/BackGround'
import HomeSearchBar from './components/HomeSearchBar'
import MoonWidget from './components/MoonWidget'
import HomeLogo from './components/Logos/HomeLogo'
import { useQuery } from '@tanstack/react-query'
import getMoon from '@/query/utils/getMoonData'
import { calculateBgColor } from '@/functions/util-functions'
import MoonLoader from './components/MoonLoader'

export default function Home() {
  // Variable Font changes logic:
  const [fontSettings, setFontSettings] = useState({ wght: 200, opsz: 72 })
  const updateText = (e: React.MouseEvent<HTMLDivElement>) => {
    const multiplierWidth = e.clientX / window.innerWidth
    const multiplierOpsz = e.clientY / window.innerHeight
    const randomWeight = multiplierWidth * (1000 - 200) + 200
    const randomOpsz = multiplierOpsz * (72 - 12) + 12

    setFontSettings({ wght: randomWeight, opsz: randomOpsz })
  }
  // useQuery to getMoon() data from query utils:
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
    // To test dynamic moon data:
    // const theme = calculateBgColor(lightValue)
    // To test hard coded Full Moon Styling:
    const theme = calculateBgColor(90)

    if (theme)
      return (
        <>
          {/* This is listening to the mousemoves on the whole page, to update the Variable fontSettings in the HomeLogo */}
          <div onMouseMove={updateText}>
            {/* Background wrapper to dynamically change theme according to Moon Phase. */}
            <BackGround theme={theme}>
              <div className="flex flex-col justify-between h-screen">
                {/* Nav */}
                <div className="flex justify-between mt-5 px-7 text-sm">
                  <Link href="/about" className="flex gap-8 hover:underline">
                    About
                  </Link>
                  <MoonWidget size={'medMoon'} />
                </div>
                {/* Middle section  */}
                <div className="relative middle flex flex-col justify-evenly items-center h-[30%] -top-44">
                  {/* Heading */}
                  <HomeLogo fontSettings={fontSettings} />
                  {/* Div for Search Input */}
                  <HomeSearchBar {...theme} />
                  {/* Feeling Lucky/ Contact Button */}
                </div>
                {/* TODO - Footer */}
                <div></div>
              </div>
            </BackGround>
          </div>
        </>
      )
  }
}
