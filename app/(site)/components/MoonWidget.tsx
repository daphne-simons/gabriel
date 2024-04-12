'use client'

import getMoon from '@/query/utils/getMoonData'
import { useQuery } from '@tanstack/react-query'
export default function MoonWidget() {
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
    //  Gets the dynamic svg data from the moonData api query:
    const moonPhaseSVG = moonData.phase[new Date().getDate()].svg // Assuming moonData is available in scope

    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className="w-8 h-auto"
        >
          <g dangerouslySetInnerHTML={{ __html: moonPhaseSVG }} />{' '}
        </svg>
      </>
    )
  }
}
