'use client'
import { useRef } from 'react'

interface Props {
  fontSettings: { wght: number; opsz: number }
  logoColor: string
}
export default function HomeLogo({ fontSettings, logoColor }: Props) {
  const textRef = useRef<HTMLHeadingElement>(null)

  return (
    <div className="pb-8 sm:px-8">
      <h1 ref={textRef} className={`font-gramercy`} data-testid="home-logo">
        <span
          className={`absolute mx-auto flex blur-lg ${logoColor} bg-clip-text text-[4rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[5.5rem]  box-content text-transparent text-center select-none`}
        >
          Gabriel
        </span>

        <span
          className={`relative top-0 justify-center flex items-center ${logoColor} bg-clip-text text-[3.5rem] sm:text-[4rem] md:text-[5rem] lg:text-[5.5rem] text-transparent text-center select-auto my-variable-text `}
          style={{
            fontVariationSettings: `"wght" ${fontSettings.wght}, "opsz" ${fontSettings.opsz}`,
          }}
        >
          Gabriel
        </span>
      </h1>
    </div >
  )
}
