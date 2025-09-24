// Moon Phase Logic and Helpers

export interface BgTheme {
  particlesStars: string;
  bgColor: string;
  bgImg: string;
  textColor: string;
  outlineColor: string;
  btnSearchBg: string;
  hoverSearchBg: string;
  logoColor: string;
  xColor: string;
}

export interface MoonPhase {
  id: number;
  name: string;
  img: string;
  lightingRange: [number, number];
  bgTheme: BgTheme;
}

interface ConstellationPhaseData {
  name: string;
  lightingRange: [number, number];
  starDensity: number;
  position: [number, number, number];
  color: string;
  driftSpeed: { x: number; y: number };
  lineThickness: number;
}

// Debug info interface
interface DebugInfo {
  inputDate: string;
  utcDate: string;
  diffDays: number;
  daysSince: number;
  phaseFraction: number;
  lightingLevel: number;
  lightingPercentage: number;
  isWaxing: boolean;
  determinedPhase: string;
}

// MOON_PHASES for conditional styling in app
export const MOON_PHASES = {
  NEW_MOON: { id: 1, name: 'New Moon', img: '/moon-imgs/new.webp', lightingRange: [0, 3] as [number, number], bgTheme: { particlesStars: 'bg-pStarsNewMoon', bgColor: 'bg-skin-newMoon', bgImg: 'bg-new-moon', textColor: 'text-googleLightGray', outlineColor: 'hover:outline outline-skin-newMoon outline-[0.5px]', btnSearchBg: 'bg-btnSearchNewMoon', hoverSearchBg: 'hover:bg-hoverSearchNewMoon', logoColor: 'bg-phasePink', xColor: 'text-phasePink' } },
  WAXING_CRESCENT: { id: 2, name: 'Waxing Crescent', img: '/moon-imgs/waxing.webp', lightingRange: [4, 48] as [number, number], bgTheme: { particlesStars: 'bg-pStarsWaxing', bgColor: 'bg-skin-waxing', bgImg: 'bg-waxing', textColor: 'text-googleLightGray', outlineColor: 'hover:outline outline-skin-waxing outline-[0.5px]', btnSearchBg: 'bg-btnSearchWaxing', hoverSearchBg: 'hover:bg-hoverSearchWaxing', logoColor: 'bg-phaseGray', xColor: 'text-phaseGray' } },
  FIRST_QUARTER: { id: 3, name: 'First Quarter', img: '/moon-imgs/first-q.webp', lightingRange: [49, 52] as [number, number], bgTheme: { particlesStars: 'bg-pStarsFirstQuarter', bgColor: 'bg-skin-firstQuarter', bgImg: 'bg-first-quarter', textColor: 'text-googleLightGray', outlineColor: 'hover:outline outline-skin-firstQuarter outline-[0.5px]', btnSearchBg: 'bg-btnSearchFirstQuarter', hoverSearchBg: 'hover:bg-hoverSearchFirstQuarter', logoColor: 'bg-phaseYellow', xColor: 'text-phaseYellow' } },
  WAXING_GIBBOUS: { id: 4, name: 'Waxing Gibbous', img: '/moon-imgs/waxing-g.webp', lightingRange: [53, 97] as [number, number], bgTheme: { particlesStars: 'bg-pStarsWaxingGibbous', bgColor: 'bg-skin-waxingGibbous', bgImg: 'bg-waxing-gibbous', textColor: 'text-googleLightGray', outlineColor: 'hover:outline outline-skin-waxingGibbous outline-[0.5px]', btnSearchBg: 'bg-btnSearchWaxingGibbous', hoverSearchBg: 'hover:bg-hoverSearchWaxingGibbous', logoColor: 'bg-phaseOrange', xColor: 'text-phaseOrange' } },
  FULL_MOON: { id: 5, name: 'Full Moon', img: '/moon-imgs/full.webp', lightingRange: [98, 100] as [number, number], bgTheme: { particlesStars: 'bg-pStarsFullMoon', bgColor: 'bg-skin-fullMoon', bgImg: 'bg-full-moon', textColor: 'text-googleLightGray', outlineColor: 'hover:outline outline-skin-fullMoon outline-[0.5px]', btnSearchBg: 'bg-btnSearchFullMoon', hoverSearchBg: 'hover:bg-hoverSearchFullMoon', logoColor: 'bg-phaseGray', xColor: 'text-phaseGray' } },
  WANING_GIBBOUS: { id: 6, name: 'Waning Gibbous', img: '/moon-imgs/waning-g.webp', lightingRange: [53, 97] as [number, number], bgTheme: { particlesStars: 'bg-pStarsWaningGibbous', bgColor: 'bg-skin-waningGibbous', bgImg: 'bg-waning-gibbous', textColor: 'text-googleDarkGrayText', outlineColor: 'hover:outline outline-skin-waningGibbous outline-[0.5px]', btnSearchBg: 'bg-btnSearchWaningGibbous', hoverSearchBg: 'hover:bg-hoverSearchWaningGibbous', logoColor: 'bg-phaseOrange', xColor: 'text-phaseOrange' } },
  LAST_QUARTER: { id: 7, name: 'Last Quarter', img: '/moon-imgs/last-q.webp', lightingRange: [49, 52] as [number, number], bgTheme: { particlesStars: 'bg-pStarsLastQuarter', bgColor: 'bg-skin-lastQuarter', bgImg: 'bg-last-quarter', textColor: 'text-googleLightGray', outlineColor: 'hover:outline outline-skin-lastQuarter outline-[0.5px]', btnSearchBg: 'bg-btnSearchLastQuarter', hoverSearchBg: 'hover:bg-hoverSearchLastQuarter', logoColor: 'bg-phasePink', xColor: 'text-phasePink' } },
  WANING_CRESCENT: { id: 8, name: 'Waning Crescent', img: '/moon-imgs/waning.webp', lightingRange: [4, 48] as [number, number], bgTheme: { particlesStars: 'bg-pStarsWaning', bgColor: 'bg-skin-waning', bgImg: 'bg-waning', textColor: 'text-googleLightGray', outlineColor: 'hover:outline outline-skin-waning outline-[0.5px]', btnSearchBg: 'bg-btnSearchWaning', hoverSearchBg: 'hover:bg-hoverSearchWaning', logoColor: 'bg-phaseYellow', xColor: 'text-phaseYellow' } }
};

// Calculate moon phase considering both lighting AND cycle position
function calculateMoonPhaseForDateFixed(date: Date): { lighting_level: number; phase_name: string; debug_info: any } {
  // Use UTC to avoid timezone issues
  const utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());

  // Constants from your JSON
  const knownNewMoon = new Date('2000-01-06T00:00:00.000Z').getTime();
  const lunarCycleDays = 29.53058867;
  const lunarCycleMs = lunarCycleDays * 24 * 60 * 60 * 1000;

  // Calculate days since known new moon
  const diffMs = utcDate.getTime() - knownNewMoon;
  const diffDays = diffMs / (24 * 60 * 60 * 1000);

  // Handle negative modulo properly
  let daysSince = diffDays % lunarCycleDays;
  if (daysSince < 0) {
    daysSince += lunarCycleDays;
  }

  // Calculate phase fraction (0 to 1, where 0 = new moon, 0.5 = full moon)
  const phaseFraction = daysSince / lunarCycleDays;

  // Calculate lighting level using cosine formula
  const lightingLevel = (1 - Math.cos(phaseFraction * 2 * Math.PI)) / 2;

  // Debug info
  const debugInfo: DebugInfo = {
    inputDate: date.toISOString(),
    utcDate: utcDate.toISOString(),
    diffDays: diffDays,
    daysSince: daysSince,
    phaseFraction: phaseFraction,
    lightingLevel: lightingLevel,
    lightingPercentage: Math.round(lightingLevel * 100),
    isWaxing: false, // default value
    determinedPhase: '' // default value
  };

  // Determine phase based on BOTH lighting level AND cycle position
  let phaseName = 'New Moon';

  // Special cases first
  if (lightingLevel <= 0.05) {
    phaseName = 'New Moon';
  } else if (lightingLevel >= 0.95) {
    phaseName = 'Full Moon';
  } else {
    // Determine if we're in waxing (first half) or waning (second half) of cycle
    const isWaxing = phaseFraction < 0.5;

    if (lightingLevel >= 0.05 && lightingLevel < 0.45) {
      phaseName = isWaxing ? 'Waxing Crescent' : 'Waning Crescent';
    } else if (lightingLevel >= 0.45 && lightingLevel < 0.55) {
      phaseName = isWaxing ? 'First Quarter' : 'Last Quarter';
    } else if (lightingLevel >= 0.55 && lightingLevel < 0.95) {
      phaseName = isWaxing ? 'Waxing Gibbous' : 'Waning Gibbous';
    }
  }

  debugInfo.isWaxing = phaseFraction < 0.5;
  debugInfo.determinedPhase = phaseName;

  return {
    lighting_level: lightingLevel,
    phase_name: phaseName,
    debug_info: debugInfo
  };
}

// Map phase names to your local MOON_PHASES

function mapPhaseNameToLocal(phaseName: string): MoonPhase {
  const phaseMap: Record<string, MoonPhase> = {
    'New Moon': MOON_PHASES.NEW_MOON,
    'Waxing Crescent': MOON_PHASES.WAXING_CRESCENT,
    'First Quarter': MOON_PHASES.FIRST_QUARTER,
    'Waxing Gibbous': MOON_PHASES.WAXING_GIBBOUS,
    'Full Moon': MOON_PHASES.FULL_MOON,
    'Waning Gibbous': MOON_PHASES.WANING_GIBBOUS,
    'Last Quarter': MOON_PHASES.LAST_QUARTER,
    'Waning Crescent': MOON_PHASES.WANING_CRESCENT
  };

  return phaseMap[phaseName] || MOON_PHASES.NEW_MOON;
}

// Main function to calculate moon phase
export function calculateMoonPhase(date?: Date): MoonPhase {
  const targetDate = date || new Date();
  const calculatedPhase = calculateMoonPhaseForDateFixed(targetDate);
  return mapPhaseNameToLocal(calculatedPhase.phase_name);
}


// Get background theme for any date
export function calculateBgColor(date?: Date): BgTheme {
  // console.log('current moon data', calculateMoonPhase(new Date()));
  const moonPhase = calculateMoonPhase(date);
  return moonPhase.bgTheme;
}

// Get lighting level for any date
export function getLightingLevel(date?: Date): number {
  const targetDate = date || new Date();
  const calculatedPhase = calculateMoonPhaseForDateFixed(targetDate);
  return Math.round(calculatedPhase.lighting_level * 100);
}

export function getMoonPhaseForWidget() {
  const moonPhase = calculateMoonPhase(new Date());
  const moonNameAndImg = { name: moonPhase.name, img: moonPhase.img };
  return moonNameAndImg;
}

// Calculate constellationPhaseData: 
export function determineConstellationPhase(name: string, lightingRange: [number, number]): ConstellationPhaseData {
  if (name === 'New Moon') {
    return {
      name: name,
      lightingRange: lightingRange,
      starDensity: 2000,
      position: [0, 0, 370],
      color: '#d0d6ff',
      driftSpeed: { x: 0.00005, y: 0.0001 },
      lineThickness: 0.2,
    }
  } else if (name === 'Waxing Crescent') {
    return {
      name: name,
      lightingRange: lightingRange,
      starDensity: 2500,
      position: [80, 0, 340],
      color: '#c2d0ed',
      driftSpeed: { x: 0.0001, y: 0.0002 },
      lineThickness: 0.25,
    }
  } else if (name === 'First Quarter') {
    return {
      name: name,
      lightingRange: lightingRange,
      starDensity: 3000,
      position: [40, -20, 330],
      color: '#d4d0e8',
      driftSpeed: { x: 0.00012, y: 0.00025 },
      lineThickness: 0.3,
    }
  } else if (name === 'Waxing Gibbous') {
    return {
      name: name,
      lightingRange: lightingRange,
      starDensity: 4000,
      position: [0, -50, 320],
      color: '#ffefef',
      driftSpeed: { x: 0.00016, y: 0.00035 },
      lineThickness: 0.35,
    }
  } else if (name === 'Full Moon') {
    return {
      name: name,
      lightingRange: lightingRange,
      starDensity: 5000,
      position: [0, 0, 300],
      color: '#fffbf8',
      driftSpeed: { x: 0.0002, y: 0.0004 },
      lineThickness: 0.4,
    }
  } else if (name === 'Waning Gibbous') {
    return {
      name: name,
      lightingRange: lightingRange,
      starDensity: 4000,
      position: [0, 50, 320],
      color: '#ffefef',
      driftSpeed: { x: 0.00016, y: 0.00035 },
      lineThickness: 0.35,
    }
  } else if (name === 'Last Quarter') {
    return {
      name: name,
      lightingRange: lightingRange,
      starDensity: 3000,
      position: [-40, 20, 330],
      color: '#d4d0e8',
      driftSpeed: { x: 0.00012, y: 0.00025 },
      lineThickness: 0.3,
    }
  } else if (name === 'Waning Crescent') {
    return {
      name: name,
      lightingRange: lightingRange,
      starDensity: 2500,
      position: [-80, 0, 340],
      color: '#c2d0ed',
      driftSpeed: { x: 0.0001, y: 0.0002 },
      lineThickness: 0.25
    }
  }
  return {
    name: name,
    lightingRange: lightingRange,
    starDensity: 2000,
    position: [0, 0, 300],
    color: '#fffbf8',
    lineThickness: 0.3,
    driftSpeed: { x: 0.0002, y: 0.0004 },
  }
}