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
    // some kind of code probably an object stored as a state value, that runs on useEffect pageload, where it listens to the moonApi data, and returns a certain tailwind class based on the lighting value. I think it goes from 0 - 100. So if I write some kind of loop that will create a series a css values, depending on the number. Maybe it could actually be rounded a bit. Ie, if the number is from 0-5: have this class, and 5-10: another class, etc.
    const lightingClasses = {
      'bg-yellow-400': lightValue >= 0 && lightValue < 5,
      'bg-yellow-500': lightValue >= 5 && lightValue < 10,
      'bg-yellow-600': lightValue >= 10 && lightValue < 15,
      'bg-yellow-700': lightValue >= 15 && lightValue < 20,
      'bg-yellow-800': lightValue >= 20 && lightValue < 25,
      'bg-yellow-900': lightValue >= 25 && lightValue < 30,
      'bg-orange-400': lightValue >= 30 && lightValue < 35,
    }

    return (
      <div>
        <div
        // className={`h-16 w-16 rounded-full ${
        //   lightingClasses[
        //     Object.keys(lightingClasses).find((key) => lightingClasses[key])
        //   ]
        // }`}
        ></div>
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
