'use client'

import getMoon from '@/query/utils/getMoonData'
import { useQuery } from '@tanstack/react-query'
import MoonLoader from './MoonLoader'
import Link from 'next/link'
import Image from 'next/image'

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
    //  Gets the dynamic svg data from the moonData api query:
    const moonPhaseSVG = moonData.phase[new Date().getDate()].svg
    // console.log(moonData.phase[new Date().getDate()])

    // List out all moonPhases from api:
    for (let key in moonData.phase) {
      if (moonData.phase.hasOwnProperty(key)) {
        // console.log(moonData.phase[key].phaseName)
      }
    }
    const moonPhases = moonData.phase
    // remove duplicate names
    const phaseNamesSet = new Set()
    for (let key in moonPhases) {
      if (moonPhases.hasOwnProperty(key)) {
        phaseNamesSet.add(moonPhases[key].phaseName)
      }
    }
    // log them out
    const uniquePhaseNames = Array.from(phaseNamesSet)
    // console.log(uniquePhaseNames)

    const imgArr = [
      '/moon-imgs/new.png',
      '/moon-imgs/waxing.png',
      '/moon-imgs/first-q.png',
      '/moon-imgs/waxing-g.png',
      '/moon-imgs/full.png',
      '/moon-imgs/waning-g.png',
      '/moon-imgs/last-q.png',
      '/moon-imgs/waning.png',
    ]

    const getMoonImgByLighting = (lighting: number) => {
      if (lighting >= 0 && lighting <= 5) {
        return {
          img: imgArr[0],
          phase: 'New Moon',
        }
      } else if (lighting >= 6 && lighting <= 42) {
        return {
          img: imgArr[1],
          phase: 'Waxing',
        }
      } else if (lighting >= 43 && lighting <= 60) {
        return {
          img: imgArr[2],
          phase: 'First Quarter',
        }
      } else if (lighting >= 61 && lighting <= 95) {
        return {
          img: imgArr[3],
          phase: 'Waxing Gibbous',
        }
      } else if (lighting >= 96 && lighting <= 105) {
        return {
          img: imgArr[4],
          phase: 'Full Moon',
        }
      } else if (lighting <= 97 && lighting >= 66) {
        return {
          img: imgArr[5],
          phase: 'Waning Gibbous',
        }
      } else if (lighting <= 65 && lighting >= 44) {
        return {
          img: imgArr[6],
          phase: 'Last Quarter',
        }
      } else if (lighting <= 43 && lighting >= 5) {
        return {
          img: imgArr[7],
          phase: 'Waning',
        }
      }
    }

    const moonLighting = Number(
      moonData.phase[new Date().getDate()].lighting.toFixed(0)
    )
    // console.log(moonLighting)

    const moonImgData = getMoonImgByLighting(moonLighting)

    if (moonImgData) {
      return (
        <div className="">
          <Link
            href="/moon"
            className="gap-6 hover:underline flex items-center"
          >
            <h2>{moonImgData.phase}</h2>
            <Image
              src={moonImgData.img}
              alt={moonImgData.phase}
              width={30}
              height={30}
              className=""
            />
          </Link>
        </div>
      )
    }
  }
}
