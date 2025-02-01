'use client'

import getMoon from '@/query/utils/getMoonData'
import { useQuery } from '@tanstack/react-query'
import MoonLoader from './MoonLoader'
import Link from 'next/link'
import Image from 'next/image'

const phases = [
  {
    name: 'New Moon',
    img: 'new',
  },
  {
    name: 'Waxing',
    img: 'waxing',
  },
  {
    name: 'First Quarter',
    img: 'first-q',
  },
  {
    name: 'Waxing Gibbous',
    img: 'waxing-g',
  },
  {
    name: 'Full Moon',
    img: 'full',
  },
  {
    name: 'Waning Gibbous',
    img: 'waning-g',
  },
  {
    name: 'Last Quarter',
    img: 'last-q',
  },
  {
    name: 'Wanning',
    img: 'waning',
  },
]

export default function MoonWidget({ size }: { size: string }) {
  const {
    data: moonData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['moon'],
    queryFn: () => getMoon(),
  })
  if (isLoading) {
    return <MoonLoader size={size} />
  }

  if (isError) {
    return <div>Sorry There was an Error</div>
  }
  if (moonData) {
    const moonPhases = moonData.phase
    // removes duplicate names
    const phaseNamesSet = new Set()
    for (let key in moonPhases) {
      if (moonPhases.hasOwnProperty(key)) {
        phaseNamesSet.add(moonPhases[key].phaseName)
      }
    }

    const getMoonImgByLighting = (lighting: number) => {
      if (lighting >= 0 && lighting <= 5) {
        return {
          img: phases[0].img,
          phase: phases[0].name,
        }
      } else if (lighting >= 6 && lighting <= 42) {
        return {
          img: phases[1].img,
          phase: phases[1].name,
        }
      } else if (lighting >= 43 && lighting <= 60) {
        return {
          img: phases[2].img,
          phase: phases[2].name,
        }
      } else if (lighting >= 61 && lighting <= 95) {
        return {
          img: phases[3].img,
          phase: phases[3].name,
        }
      } else if (lighting >= 96 && lighting <= 105) {
        return {
          img: phases[4].img,
          phase: phases[4].name,
        }
      } else if (lighting <= 97 && lighting >= 66) {
        return {
          img: phases[5].img,
          phase: phases[5].name,
        }
      } else if (lighting <= 65 && lighting >= 44) {
        return {
          img: phases[6].img,
          phase: phases[6].name,
        }
      } else if (lighting <= 43 && lighting >= 5) {
        return {
          img: phases[7].img,
          phase: phases[7].name,
        }
      }
    }

    const moonLighting = Number(
      moonData.phase[new Date().getDate()].lighting.toFixed(0)
    )

    const phase = getMoonImgByLighting(moonLighting)
    const phaseImagePath = `/moon-imgs/${phase?.img}.png`

    if (phase) {
      return (
        <>
          <div className="">
            <Link
              href="/"
              className="max-lg:gap-3 gap-6 flex flex-row items-center justify-center"
            >
              <h2 className="w-[90px] text-center">{phase.phase}</h2>
              <Image
                src={phaseImagePath}
                alt={phase.phase}
                width={30}
                height={30}
                className="rounded-full filter drop-shadow-[0_0_5px_#fefee0]"
              />
            </Link>
          </div>
        </>
      )
    }
  }
}
