'use client'

import getMoon from '@/query/utils/getMoonData'
import { useQuery } from '@tanstack/react-query'
import MoonLoader from './MoonLoader'
import Link from 'next/link'

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
    const moonPhaseSVG = moonData.phase[new Date().getDate()].svg // Assuming moonData is available in scope
    console.log(moonData)
    console.log(moonPhaseSVG)
    // TODO: Make this moon svg NOT have an a tag in there.
    // const newMoon = (
    //   <svg width="100" height="100" viewBox="0 0 100 100">
    //     <g>
    //       <circle cx="50" cy="50" r="49" stroke="none" fill="#1d1d1d" />
    //       <path
    //         d="M 50 1 A 49,49 0 0,1 49,99 A -25.48,49 0 0,1 50,1"
    //         stroke-width="0"
    //         stroke="none"
    //         fill="#f7f7c8"
    //       />
    //       <circle
    //         cx="50"
    //         cy="50"
    //         r="49"
    //         style="pointer-events:all;cursor:pointer"
    //         stroke-width="0"
    //         fill="transparent"
    //       />
    //     </g>
    //   </svg>
    // )
    return (
      <Link href="/moon" className="flex gap-8 hover:underline">
        {moonData.phase[new Date().getDate()].phaseName}
        <div className="-mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className="w-8 h-auto"
          >
            <g dangerouslySetInnerHTML={{ __html: moonPhaseSVG }} />{' '}
          </svg>
        </div>
      </Link>
    )
  }
}
