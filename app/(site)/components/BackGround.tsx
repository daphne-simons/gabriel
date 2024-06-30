'use client'

import getMoon from '@/query/utils/getMoonData'
import { useQuery } from '@tanstack/react-query'
import MoonLoader from './MoonLoader'
// import GodRays from './GodRays'

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
        <div className="bg-gray-800 h-screen flex items-center justify-center z-0">
          <MoonLoader size="medMoon" />
        </div>
      </>
    )
  }

  if (isError) {
    return <div>Sorry There was an Error</div>
  }
  function calculateBgColor(lighting: number) {
    if (lighting >= 0 && lighting <= 5) {
      return {
        id: 1,
        bgColor: 'bg-skin-newMoon',
        textColor: 'text-skin-newMoon',
        bgImg: 'bg-moon-bg',
      }
    } else if (lighting >= 6 && lighting <= 42) {
      return {
        id: 2,
        bgColor: 'bg-skin-waxing',
        textColor: 'text-skin-waxing',
        bgImg: 'bg-moon-bg-80',
      }
    } else if (lighting >= 43 && lighting <= 60) {
      return {
        id: 3,
        bgColor: 'bg-skin-firstQuarter',
        textColor: 'text-skin-firstQuarter',
        bgImg: 'bg-moon-bg-80',
      }
    } else if (lighting >= 61 && lighting <= 95) {
      return {
        id: 4,
        bgColor: 'bg-skin-waxingGibbous',
        textColor: 'text-skin-waxingGibbous',
        bgImg: 'bg-moon-bg-60',
      }
    } else if (lighting >= 96 && lighting <= 105) {
      return {
        id: 5,
        bgColor: 'bg-skin-fullMoon',
        textColor: 'text-skin-fullMoon',
        bgImg: 'bg-moon-bg-60',
      }
    } else if (lighting <= 97 && lighting >= 66) {
      return {
        id: 6,
        bgColor: 'bg-skin-waningGibbous',
        textColor: 'text-skin-waningGibbous',
        bgImg: 'bg-moon-bg-60',
      }
    } else if (lighting <= 65 && lighting >= 44) {
      return {
        id: 7,
        bgColor: 'bg-skin-lastQuarter',
        textColor: 'text-skin-lastQuarter',
        bgImg: 'bg-moon-bg-80',
      }
    } else if (lighting <= 43 && lighting >= 5) {
      return {
        id: 8,
        bgColor: 'bg-skin-waning',
        textColor: 'text-skin-waning',
        bgImg: 'bg-moon-bg-60',
      }
    }
  }

  if (moonData) {
    const lightValue = Number(
      moonData.phase[new Date().getDate()].lighting.toFixed(0)
    )
    const theme = calculateBgColor(lightValue)

    console.log('tailwind stuff: ', theme, 'light value: ', lightValue)
    if (theme)
      return (
        <>
          <div className={`${theme.bgColor} ${theme.textColor} `}>
            <div className={`bg-cover ${theme.bgImg}`}>{children}</div>
          </div>
        </>
      )
  }
}
