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

  if (moonData) {
    const rawLighting = moonData.phase[new Date().getDate()].lighting
    const lightValue = Math.round(rawLighting)
    // Logic to set a tailwind bg-color value in relation to moon phase
    let bgValue = ''
    if (lightValue < 10) {
      bgValue = 'bg-gray-950'
    }
    if (lightValue >= 10 && lightValue < 20) {
      bgValue = 'bg-gray-900'
    }
    if (lightValue >= 20 && lightValue < 30) {
      bgValue = 'bg-gray-800'
    }
    if (lightValue >= 30 && lightValue < 40) {
      bgValue = 'bg-gray-700'
    }
    if (lightValue >= 40 && lightValue < 50) {
      bgValue = 'bg-gray-600'
    }
    if (lightValue >= 50 && lightValue < 60) {
      bgValue = 'bg-gray-500'
    }
    if (lightValue >= 60 && lightValue < 70) {
      bgValue = 'bg-gray-400'
    }
    if (lightValue >= 70 && lightValue < 80) {
      bgValue = 'bg-gray-300'
    }
    if (lightValue >= 80 && lightValue < 90) {
      bgValue = 'bg-gray-200'
    }
    if (lightValue >= 90 && lightValue < 100) {
      bgValue = 'bg-gray-100'
    }
    console.log(bgValue)

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
          <div
            dangerouslySetInnerHTML={{
              __html: moonData.phase[new Date().getDate()].svg,
            }}
          />
          <div>
            {moonData.phase[new Date().getDate()].phaseName}{' '}
            {Math.round(moonData.phase[new Date().getDate()].lighting)}%
          </div>
        </div>
      </div>
    )
  }
}
