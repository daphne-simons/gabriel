'use client'

import { useEffect, useState } from 'react'

interface Props {
  color: string
  size: string
  weight: 'thin' | 'light' | 'regular' | 'medium' | 'bold' | 'black'
}
export default function Header(props: Props) {
  const { color, size, weight } = props
  const [fontVariationSettings, setFontVariationSettings] = useState('')

  const updateFontVariationSettings = (e: MouseEvent) => {
    const multiplierWidth: number = e.offsetX / window.innerWidth
    const multiplierHeight: number = e.offsetY / window.innerHeight

    // Define the range of font weight and width for Gramercy Light
    const minWeight: number = 100
    const maxWeight: number = 900

    // Calculate random font weight and width based on mouse position
    const randomWeight: number = Math.round(
      multiplierWidth * (maxWeight - minWeight) + minWeight
    )

    // Construct the font variation settings string

    // const settings: string = `"wght" ${randomWeight}, "wdth" ${randomWidth} , "hght" ${randomHeight}`

    // setFontVariationSettings(settings)
  }

  useEffect(() => {
    window.addEventListener('mousemove', updateFontVariationSettings)
    console.log('mouse coordinates', fontVariationSettings)
    return () => {
      window.removeEventListener('mousemove', updateFontVariationSettings)
    }
  }, [fontVariationSettings])
  // const fontWeightClasses = {
  //   thin: 'font-thin',
  //   light: 'font-light',
  //   regular: 'font-normal',
  //   medium: 'font-medium',
  //   bold: 'font-bold',
  //   black: 'font-black',
  // }
  // const spanStyle = `absolute mx-auto py-4 flex border blur-lg ${color} bg-clip-text ${size} box-content text-transparent text-center select-none ${fontWeightClasses[weight]}`
  // const h1Style = `relative top-0 py-4 justify-center flex items-center ${color} bg-clip-text ${size} text-transparent text-center select-auto ${fontWeightClasses[weight]}`

  return (
    <h1
      className={`font-gramercy font-variation-settings: ${fontVariationSettings}`}
    >
      <div className="">
        <span
          className={`absolute mx-auto py-4 flex border blur-lg ${color} bg-clip-text ${size} box-content text-transparent text-center select-none`}
        >
          Gabriel
        </span>
        <h1
          className={`relative top-0 py-4 justify-center flex items-center ${color} bg-clip-text ${size} text-transparent text-center select-auto`}
        >
          Gabriel
        </h1>
      </div>
    </h1>
  )
}
