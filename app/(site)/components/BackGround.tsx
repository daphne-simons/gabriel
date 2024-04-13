'use client'

import getMoon from '@/query/utils/getMoonData'
import { useQuery } from '@tanstack/react-query'

export default function BackGround({
  children,
}: {
  children: React.ReactNode
}) {
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
    const moonThemes = [
      { bgValue: 'bg-gray-950', textValue: 'text-white' },
      { bgValue: 'bg-gray-900', textValue: 'text-white' },
      { bgValue: 'bg-gray-800', textValue: 'text-white' },
      { bgValue: 'bg-gray-700', textValue: 'text-white' },
      { bgValue: 'bg-gray-600', textValue: 'text-white' },
      { bgValue: 'bg-gray-500', textValue: 'text-gray-950' },
      { bgValue: 'bg-gray-400', textValue: 'text-gray-950' },
      { bgValue: 'bg-gray-300', textValue: 'text-gray-800' },
      { bgValue: 'bg-gray-200', textValue: 'text-gray-800' },
      { bgValue: 'bg-gray-100', textValue: 'text-gray-700' },
    ]

    // Calculate index based on lightValue
    const index = Math.floor(lightVal / 10)
    // Ensure the index stays within bounds
    const safeIndex = Math.min(Math.max(index, 0), moonThemes.length - 1)
    return moonThemes[safeIndex]
  }

  if (moonData) {
    const rawLighting = moonData.phase[new Date().getDate()].lighting
    const lightValue = Math.round(rawLighting)
    const theme = calculateBgColor(lightValue)

    return (
      <div className={`${theme.bgValue} ${theme.textValue}`}>
        <h1>test</h1>
        {children}
      </div>
    )
  }
}
