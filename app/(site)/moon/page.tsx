'use client'

import getMoon from '@/query/utils/getMoonData'
import { useQuery } from '@tanstack/react-query'

export default function Moon() {
  // useQuery to getMoon() data from query utils
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
  function calculateBgColor(lightVal: number) {
    const bgColors = [
      'bg-gray-950',
      'bg-gray-900',
      'bg-gray-800',
      'bg-gray-700',
      'bg-gray-600',
      'bg-gray-500',
      'bg-gray-400',
      'bg-gray-300',
      'bg-gray-200',
      'bg-gray-100',
    ]

    // Calculate index based on lightValue
    const index = Math.floor(lightVal / 10)
    // Ensure the index stays within bounds
    const safeIndex = Math.min(Math.max(index, 0), bgColors.length - 1)
    return bgColors[safeIndex]
  }

  if (moonData) {
    const rawLighting = moonData.phase[new Date().getDate()].lighting
    const lightValue = Math.round(rawLighting)
    const bgValue = calculateBgColor(lightValue)

    return (
      <div
        className={`flex flex-col items-center justify-center text-center ${bgValue}`}
      >
        <h1>Moon Widget</h1>
        <div className="moon">
          <div>{moonData.nameDay[new Date().getDay()]}</div>
          <div>
            {new Date().getDate()} {moonData.monthName} {moonData.year}
          </div>

          <div>
            {moonData.phase[new Date().getDate()].phaseName}{' '}
            {Math.round(moonData.phase[new Date().getDate()].lighting)}%
          </div>
        </div>
      </div>
    )
  }
}
