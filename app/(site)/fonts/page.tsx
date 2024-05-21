'use client'
import { useRef, useState } from 'react'

export default function FontsPage() {
  const textRef = useRef<HTMLHeadingElement>(null)
  const [fontSettings, setFontSettings] = useState({ wght: 200, opsz: 50 })

  const updateText = (e: React.MouseEvent<HTMLDivElement>) => {
    const multiplierWidth = e.clientX / window.innerWidth
    const multiplierOpsz = e.clientY / window.innerHeight
    const randomWeight = multiplierWidth * (600 - 200) + 200
    const randomOpsz = multiplierOpsz * (72 - 50) + 50

    setFontSettings({ wght: randomWeight, opsz: randomOpsz })
  }

  return (
    // User event is handled on the outer div (so that it works with react, rather than using window.eventlisteners, bad 4 react)
    <div
      className="flex justify-center items-center h-screen"
      onMouseMove={updateText}
    >
      <h1
        ref={textRef}
        className="my-variable-text text-7xl"
        style={{
          fontVariationSettings: `"wght" ${fontSettings.wght}, "opsz" ${fontSettings.opsz}`,
        }}
      >
        Gabriel
      </h1>
    </div>
  )
}
