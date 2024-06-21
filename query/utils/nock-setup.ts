// nock-setup.js

import nock from 'nock'

export const fakeMoonRes = {
  autor: 'wdisseny.com',
  daysMonth: '30',
  firstDayMonth: '6',
  lang: 'en',
  language: 'English',
  month: 6,
  monthName: 'June',
  nameDay: [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ],
  nameMonth: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  nextFullMoon:
    '<svg height="18" width="18" style="margin-top:-2px;display:inline-block; vertical-align:middle;stroke:#1d1d1d;stroke-width:px;fill:#f7f7c8">\r\n<title>Full moon</title>\r\n<circle cx="9" cy="9" r="8" />\r\n</svg> <b>22</b> June',
  phase: {
    1: {
      phaseName: 'Waning',
      isPhaseLimit: false,
      lighting: 31.01049302854947,
      svg: '<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><a xlink:href="http://www.icalendar37.net/lunar/2024/6/19/lunar_0.svg"><circle cx="50" cy="50" r="40" stroke-width="0" fill="transparent" /></a></g></svg>',
      svgMini: false,
    },
    2: {
      phaseName: 'Waning',
      isPhaseLimit: false,
      lighting: 20.84748008457995,
      svg: '<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><a xlink:href="http://www.icalendar37.net/lunar/2024/6/19/lunar_1.svg"><circle cx="50" cy="50" r="40" stroke-width="0" fill="transparent" /></a></g></svg>',
      svgMini: false,
    },
    // Additional phase data entries truncated for brevity
  },
  receivedVariables: {
    lang: 'en',
    lightColor: '#f7f7c8',
    month: '6',
    shadeColor: '#1d1d1d',
    size: '100',
    sizeQuarter: '40',
    texturize: 'false',
    year: '2024',
  },
  title: ["Moon's calendar", 'Moon phases'],
  version: '2',
  year: 2024,
}

nock('https://www.icalendar37.net').get('/lunar/api/').reply(200, fakeMoonRes)
