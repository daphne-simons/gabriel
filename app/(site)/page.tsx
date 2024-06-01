'use client'
import { useState } from 'react'

import Link from 'next/link'
import BackGround from './components/BackGround'
import SearchBar from './components/SearchBar'
import MoonWidget from './components/MoonWidget'
import HomeLogo from './components/HomeLogo'

export default function Home() {
  const [fontSettings, setFontSettings] = useState({ wght: 200, opsz: 72 })

  const updateText = (e: React.MouseEvent<HTMLDivElement>) => {
    const multiplierWidth = e.clientX / window.innerWidth
    const multiplierOpsz = e.clientY / window.innerHeight
    const randomWeight = multiplierWidth * (1000 - 200) + 200
    const randomOpsz = multiplierOpsz * (72 - 12) + 12

    setFontSettings({ wght: randomWeight, opsz: randomOpsz })
  }
  return (
    <>
      {/* This is listening to the mousemoves on the whole page, to update the Variable fontSettings in the HomeLogo */}
      <div onMouseMove={updateText}>
        {/* Background wrapper to dynamically change theme according to Moon Phase. */}
        <BackGround>
          <div className="flex flex-col justify-between h-screen">
            {/* Nav */}
            <div className="flex justify-between mt-5 px-7 text-sm">
              <Link href="/about" className="flex gap-8 hover:underline">
                About
              </Link>
              <MoonWidget />
            </div>
            {/* Middle section  */}
            <div className="middle flex flex-col justify-evenly items-center h-[30%] -mt-40">
              {/* Heading */}
              <HomeLogo fontSettings={fontSettings} />
              {/* Div for Search Input */}
              <SearchBar />
              <div>
                {/* Feeling Lucky/ Contact Button */}
                <Link href="/contact">
                  <button className="px-4 py-2 bg-gray-300 rounded border border-[#202124] hover:border hover:border-gray-500 text-sm">
                    I&apos;m Feeling Lucky
                  </button>
                </Link>
              </div>
            </div>
            {/* TODO - Footer */}

            <div></div>
          </div>
        </BackGround>
      </div>
    </>
  )
}
