'use client'
import { useRef } from 'react'

interface Props {
  fontSettings: { wght: number; opsz: number }
}
export default function HomeLogo({ fontSettings }: Props) {
  const textRef = useRef<HTMLHeadingElement>(null)

  return (
    <div className="pb-8 sm:px-8">
      <h1 ref={textRef} className={`font-gramercy`}>
        <span
          className={`absolute mx-auto flex border blur bg-yellow-400 bg-clip-text text-[4rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[5.5rem]  box-content text-transparent text-center select-none`}
        >
          Gabriel
        </span>

        <span
          className={`relative top-0 justify-center flex items-center bg-yellow-200 bg-clip-text text-[3.5rem] sm:text-[4rem] md:text-[5rem] lg:text-[5.5rem] text-transparent text-center select-auto my-variable-text `}
          style={{
            fontVariationSettings: `"wght" ${fontSettings.wght}, "opsz" ${fontSettings.opsz}`,
          }}
        >
          Gabriel
        </span>
      </h1>
    </div>
  )
}
