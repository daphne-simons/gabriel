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
        return 100
      case 'Waxing':
        return 300
      case 'First quarter':
        return 400
      case 'Waxing':
        return 600
      case 'Full moon':
        return 700
      case 'Waning':
        return 600
      case 'Last quarter':
        return 400
      case 'Waning':
        return 300
      default:
        return 400 // Default to regular if phase is unknown
    }
  }
  const currentPhase: string | undefined =
    moonData?.phase[new Date().getDate()].phaseName

  let fontWeight = getFontWeightByMoonPhase(currentPhase)
  console.log(fontWeight)

  return (
    <h1 className={`font-gramercy animate-gramercy-animation`}>
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
    </h1>
  )
}
