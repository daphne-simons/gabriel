'use client'

import getMoon from '@/query/utils/getMoonData'
import { useQuery } from '@tanstack/react-query'
import MoonLoader from './MoonLoader'
import GodRays from './GodRays'

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
    return (
      <>
        <div className="bg-gray-700 h-screen flex items-center justify-center z-0">
          <MoonLoader size="bigMoon" />
        </div>
      </>
    )
  }

  if (isError) {
    return <div>Sorry There was an Error</div>
  }
  function calculateBgColor(lightVal: number) {
    const moonThemes = [
      {
        bgValue: 'bg-gray-950',
        textValue: 'text-white',
        bgImg: `bg-[url('/moon-bg.png')]`,
      },
      {
        bgValue: 'bg-gray-900',
        textValue: 'text-white',
        bgImg: `bg-[url('/moon-bg-80.png')]`,
      },
      {
        bgValue: 'bg-gray-800',
        textValue: 'text-white',
        bgImg: `bg-[url('/moon-bg-80.png')]`,
      },
      {
        bgValue: 'bg-gray-700',
        textValue: 'text-white',
        bgImg: `bg-[url('/moon-bg-80.png')]`,
      },
      {
        bgValue: 'bg-gray-600',
        textValue: 'text-white',
        bgImg: `bg-[url('/moon-bg-80.png')]`,
      },
      {
        bgValue: 'bg-gray-500',
        textValue: 'text-gray-950',
        bgImg: `bg-[url('/moon-bg-80.png')]`,
      },
      {
        bgValue: 'bg-gray-400',
        textValue: 'text-gray-950',
        bgImg: `bg-[url('/moon-bg-80.png')]`,
      },
      {
        bgValue: 'bg-gray-300',
        textValue: 'text-black',
        bgImg: `bg-[url('/moon-bg-60.png')]`,
      },
      {
        bgValue: 'bg-gray-200',
        textValue: 'text-black',
        bgImg: `bg-[url('/moon-bg-60.png')]`,
      },
      {
        bgValue: 'bg-gray-100',
        textValue: 'text-black',
        bgImg: `bg-[url('/moon-bg-60.png')]`,
      },
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
      <>
        <div className={`${theme.bgValue} ${theme.textValue} `}>
          <div className={`bg-cover ${theme.bgImg}`}>{children}</div>
        </div>
      </>
    )
  }
}
