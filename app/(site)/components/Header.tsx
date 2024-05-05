'use client'

import getMoon from '@/query/utils/getMoonData'
import { useQuery } from '@tanstack/react-query'

interface Props {
  color: string
  size: string
}

export default function Header(props: Props) {
  const { color, size } = props

  const {
    data: moonData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['moon'],
    queryFn: () => getMoon(),
  })
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Sorry There was an Error</div>
  }

  function getFontWeightByMoonPhase(phase: string | undefined) {
    switch (phase) {
      case 'New Moon':
        return 'font-thin'
      case 'Waxing':
        return 'font-light'
      case 'First quarter':
        return 'font-regular'
      case 'Waxing':
        return 'font-medium'
      case 'Full moon':
        return 'font-bold'
      case 'Waning':
        return 'font-medium'
      case 'Last quarter':
        return 'font-regular'
      case 'Waning':
        return 'font-light'
      default:
        return 'font-regular' // Default to regular if phase is unknown
    }
  }
  const currentPhase: string | undefined =
    moonData?.phase[new Date().getDate()].phaseName

  const fontWeight = getFontWeightByMoonPhase(currentPhase)

  return (
    <h1 className={`font-gramercy ${fontWeight}`}>
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
