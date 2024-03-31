'use client'
import { useEffect, useState } from 'react'
import { MoonApiResponse, MoonConfig } from '../models/models'
export default function Moon() {
  // Add other properties as needed
  const [moonData, setMoonData] = useState<MoonApiResponse | null>(null)

  //  Fetch Moon data from API:
  useEffect(() => {
    const loadMoonPhases = async (obj: MoonConfig) => {
      const gets = []
      for (let i in obj) {
        gets.push(i + '=' + encodeURIComponent(obj[i]))
      }
      const url = 'http://www.icalendar37.net/lunar/api/?' + gets.join('&')

      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Network response was not ok.')
        }
        const data = await response.json()
        console.log(data)
        setMoonData(data)
        // todaysMoon(data)
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error)
      }
    }

    const configMoon = {
      lang: 'en', // 'ca' 'de' 'en' 'es' 'fr' 'it' 'pl' 'pt' 'ru' 'zh' (*)
      month: new Date().getMonth() + 1, // 1 - 12
      year: new Date().getFullYear(),
      size: 100, // pixels - size of moon svg
      lightColor: '#FFFF88', // CSS color
      shadeColor: '#111111', // CSS color
      sizeQuarter: 40, // pixels - size of moon svg
      texturize: false, // true - false
      // LDZ: Math.floor(new Date().getTime() / 1000), // rounds the percentage number of moon phase.
    }

    loadMoonPhases(configMoon)
  }, []) // Empty dependency array to run once on component mount

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
