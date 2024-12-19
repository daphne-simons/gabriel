export interface MoonApiResponse {
  autor: string
  daysMonth: string
  firstDayMonth: string
  lang: string
  language: string
  month: number
  monthName: string
  nameDay: string[]
  nameMonth: string[]
  nextFullMoon: string
  phase: {
    [day: number]: {
      // Properties for each day's phase
      // You might need to adjust these based on the actual data structure
      // For example, you may need to change number types to string or vice versa
      dayWeek: number
      svg: string
      phaseName: string
      lighting: number
      timeEvent?: boolean | string
      dis?: number
      isPhaseLimit?: boolean | number
      svgMini?: boolean | string
      npWidget?: string
    }
  }
  receivedVariables: {
    lang: string
    month: string
    year: string
    size: string
    lightColor: string
    // Add other properties as needed
  }
  title: string[]
  version: string
  year: number
}
export interface MoonData {
  nameDay: string[]
  monthName: string
  year: number
  phase: {
    [key: number]: {
      dayWeek: number
      svg: string
      phaseName: string
      lighting: number
    }
  }
}

export type MoonConfig = {
  lang: string
  month: number
  year: number
  size: number
  lightColor: string
  shadeColor: string
  sizeQuarter: number
  texturize: boolean
  // LDZ: number // Add LDZ property
  [key: string]: string | number | boolean // Index signature
}

export interface EmailTemplateProps {
  name: string
  email: string
  chosenService: string
  gem: string
  level: string
  cost: string
}
