'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import Image from 'next/image'
import getMoon from '@/query/utils/getMoonData'
import MoonLoader from './MoonLoader'

// Moon phases with min/max lighting ranges
const MOON_PHASES = [
  { name: 'New Moon', img: 'new', min: 0, max: 5 },
  { name: 'Waxing Crescent', img: 'waxing', min: 6, max: 42 },
  { name: 'First Quarter', img: 'first-q', min: 43, max: 60 },
  { name: 'Waxing Gibbous', img: 'waxing-g', min: 61, max: 95 },
  { name: 'Full Moon', img: 'full', min: 96, max: 105 },
  { name: 'Waning Gibbous', img: 'waning-g', min: 66, max: 95 },
  { name: 'Last Quarter', img: 'last-q', min: 44, max: 65 },
  { name: 'Waning Crescent', img: 'waning', min: 5, max: 43 },
]

export default function MoonWidget({ size }: { size: string }) {
  const {
    data: moonData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['moon'],
    queryFn: getMoon,
  })

  // Loading state
  if (isLoading) {
    return <MoonLoader size={size} />
  }

  // Error state
  if (isError || !moonData) {
    return (
      <div className="text-center p-2 text-red-400">
        Unable to fetch moon data
      </div>
    )
  }

  // Get current date's moon lighting percentage
  const today = new Date().getDate()

  // Safety check if the data doesn't contain today's date
  if (!moonData.phase || !moonData.phase[today]) {
    return (
      <div className="text-center p-2">
        No moon data available for today
      </div>
    )
  }

  const moonLighting = Number(moonData.phase[today].lighting.toFixed(0))

  // Find the current moon phase based on lighting percentage
  const currentPhase = MOON_PHASES.find(
    phase => moonLighting >= phase.min && moonLighting <= phase.max
  ) || MOON_PHASES[0] // Default to new moon if no match found

  // Size calculations - Fixed the size logic!
  const imgSize = (size === 'small' || size === 'smallMoon') ? 30 :
    size === 'medMoon' ? 50 :
      80 // default/large size

  // Path to the moon phase image
  const pngMoonPath = `/moon-imgs/${currentPhase.img}.png`

  return (
    <div>
      <Link
        href="/"
        className="sm:pt-2 md:pt-0 lg:pt-0 xl:pt-0 max-lg:gap-3 gap-6 flex flex-row items-center justify-center"
        aria-label={`Current moon phase: ${currentPhase.name}`}
      >
        <h2 className="text-center">{currentPhase.name}</h2>
        {/*moon container */}
        <div
          className="small-moon-widget relative"
          style={{
            width: `${imgSize}px`,
            height: `${imgSize}px`,
          }}
        >
          <Image
            src={pngMoonPath}
            alt={currentPhase.name}
            fill
            priority
          />
        </div>
      </Link>
    </div>
  )
}