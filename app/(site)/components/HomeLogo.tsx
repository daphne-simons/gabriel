'use client'
import { useRef } from 'react'

interface Props {
  fontSettings: { wght: number; opsz: number }
}
export default function HomeLogo({ fontSettings }: Props) {
  const textRef = useRef<HTMLHeadingElement>(null)

  return (
    <h1 ref={textRef} className={`font-gramercy`}>
      <span
        className={`absolute mx-auto py-4 flex border blur bg-yellow-400 bg-clip-text text-6xl box-content text-transparent text-center select-none`}
      >
        Gabriel
      </span>

      <h1
        className={`relative top-0 py-4 justify-center flex items-center bg-yellow-200 bg-clip-text text-6xl text-transparent text-center select-auto my-variable-text `}
        style={{
          fontVariationSettings: `"wght" ${fontSettings.wght}, "opsz" ${fontSettings.opsz}`,
        }}
      >
        Gabriel
      </h1>
    </h1>
  )
}
