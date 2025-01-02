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

// Fake MoonApiResponse:
// export const fakeMoonData = {
//   autor: 'wdisseny.com',
//   daysMonth: '30',
//   firstDayMonth: '6',
//   lang: 'en',
//   language: 'English',
//   month: 6,
//   monthName: 'June',
//   nameDay: [
//     'Monday',
//     'Tuesday',
//     'Wednesday',
//     'Thursday',
//     'Friday',
//     'Saturday',
//     'Sunday',
//   ],
//   nameMonth: [
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//     'July',
//     'August',
//     'September',
//     'October',
//     'November',
//     'December',
//   ],
//   nextFullMoon:
//     '<svg height="18" width="18" style="margin-top:-2px;display:inline-block; vertical-align:middle;stroke:#1d1d1d;stroke-width:px;fill:#f7f7c8">\r\n<title>Full moon</title>\r\n<circle cx="9" cy="9" r="8" />\r\n</svg> <b>22</b> June',
//   phase: {
//     1: {
//       phaseName: 'Waning',
//       isPhaseLimit: false,
//       lighting: 31.01049302854947,
//       svg: '<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><a xlink:href="http://www.icalendar37.net/lunar/2024/6/19/lunar_0.svg"><circle cx="50" cy="50" r="40" stroke-width="0" fill="transparent" /></a></g></svg>',
//       svgMini: false,
//     },
//     2: {
//       phaseName: 'Waning',
//       isPhaseLimit: false,
//       lighting: 20.84748008457995,
//       svg: '<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><a xlink:href="http://www.icalendar37.net/lunar/2024/6/19/lunar_1.svg"><circle cx="50" cy="50" r="40" stroke-width="0" fill="transparent" /></a></g></svg>',
//       svgMini: false,
//     },
//     // Additional phase data entries truncated for brevity
//   },
//   receivedVariables: {
//     lang: 'en',
//     lightColor: '#f7f7c8',
//     month: '6',
//     shadeColor: '#1d1d1d',
//     size: '100',
//     sizeQuarter: '40',
//     texturize: 'false',
//     year: '2024',
//   },
//   title: ["Moon's calendar", 'Moon phases'],
//   version: '2',
//   year: 2024,
// }
