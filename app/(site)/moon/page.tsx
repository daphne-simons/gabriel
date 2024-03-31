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
  return (
    <div>
      <h1>Moon Widget</h1>
      {moonData && (
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
      )}
    </div>
  )
}
