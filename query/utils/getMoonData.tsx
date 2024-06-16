import { MoonApiResponse, MoonConfig } from '@/app/(site)/models/models'

async function loadMoonPhases(obj: MoonConfig) {
  const gets = []
  for (let i in obj) {
    gets.push(i + '=' + encodeURIComponent(obj[i]))
  }
  const url = 'https://www.icalendar37.net/lunar/api/?' + gets.join('&')

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Network response was not ok.')
    }
    const data = await response.json()
    console.log(data)

    return data
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error)
  }
}

const configMoon = {
  lang: 'en', // 'ca' 'de' 'en' 'es' 'fr' 'it' 'pl' 'pt' 'ru' 'zh' (*)
  month: new Date().getMonth() + 1, // 1 - 12
  year: new Date().getFullYear(),
  size: 100, // pixels - size of moon svg
  lightColor: '#f7f7c8', // CSS color
  shadeColor: '#1d1d1d', // CSS color
  sizeQuarter: 40, // pixels - size of moon svg
  texturize: false, // true - false // Creates a more realistic moon texture
  // LDZ: Math.floor(new Date().getTime() / 1000), // rounds the percentage number of moon phase.
}

export default async function getMoon() {
  const data = await loadMoonPhases(configMoon)
  return data as MoonApiResponse
}
