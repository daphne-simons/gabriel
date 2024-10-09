'use client'

import getMoon from '@/query/utils/getMoonData'
import { useQuery } from '@tanstack/react-query'
import MoonLoader from './MoonLoader'

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
        bgImg: 'bg-moon-bg',
        textColor: 'text-skin-newMoon',
        outlineColor: 'outline-skin-newMoon',
      }
    } else if (lighting >= 6 && lighting <= 42) {
      return {
        id: 2,
        bgColor: 'bg-skin-waxing',
        bgImg: 'bg-moon-bg-80',
        textColor: 'text-skin-waxing',
        outlineColor: 'outline-skin-waxing',
      }
    } else if (lighting >= 43 && lighting <= 60) {
      return {
        id: 3,
        bgColor: 'bg-skin-firstQuarter',
        bgImg: 'bg-moon-bg-60',
        textColor: 'text-skin-firstQuarter',
        outlineColor: 'outline-skin-firstQuarter',
      }
    } else if (lighting >= 61 && lighting <= 95) {
      return {
        id: 4,
        bgColor: 'bg-skin-waxingGibbous',
        bgImg: 'bg-moon-bg-60',
        textColor: 'text-skin-waxingGibbous',
        outlineColor: 'outline-skin-waxingGibbous',
      }
    } else if (lighting >= 96 && lighting <= 105) {
      return {
        id: 5,
        bgColor: 'bg-skin-fullMoon',
        bgImg: 'bg-moon-bg-60',
        textColor: 'text-skin-fullMoon',
        outlineColor: 'outline-skin-fullMoon',
      }
    } else if (lighting <= 97 && lighting >= 66) {
      return {
        id: 6,
        bgColor: 'bg-skin-waningGibbous',
        bgImg: 'bg-moon-bg-60',
        textColor: 'text-skin-waningGibbous',
        outlineColor: 'outline-skin-waningGibbous',
      }
    } else if (lighting <= 65 && lighting >= 44) {
      return {
        id: 7,
        bgColor: 'bg-skin-lastQuarter',
        bgImg: 'bg-moon-bg-60',
        textColor: 'text-skin-lastQuarter',
        outlineColor: 'outline-skin-lastQuarter',
      }
    } else if (lighting <= 43 && lighting >= 5) {
      return {
        id: 8,
        bgColor: 'bg-skin-waning',
        bgImg: 'bg-moon-bg-80',
        textColor: 'text-skin-waning',
        outlineColor: 'outline-skin-waning',
      }
    }
  }

  if (moonData) {
    const lightValue = Number(
      moonData.phase[new Date().getDate()].lighting.toFixed(0)
    )
    // const theme = calculateBgColor(lightValue)
    const theme = calculateBgColor(100)

    if (theme)
      return (
        <>
          <div
            className={`${theme.bgColor} fill-current ${theme.textColor} outline outline-1 ${theme.outlineColor}`}
          >
            <div className={`bg-cover ${theme.bgImg}`}>{children}</div>
          </div>
        </>
      )
  }
}
