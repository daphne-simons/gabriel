// TypeScript interfaces (keeping your existing structure)
interface BgTheme {
  bgColor: string;
  bgImg: string;
  textColor: string;
  outlineColor: string;
  btnSearchBg: string;
  hoverSearchBg: string;
  logoColor: string;
}

interface MoonPhase {
  id: number;
  name: string;
  img: string;
  lightingRange: [number, number];
  bgTheme: BgTheme;
}

// Your existing MOON_PHASES object (keeping all your styling)
const MOON_PHASES = {
  NEW_MOON: {
    id: 1,
    name: 'New Moon',
    img: '/moon-imgs/new.png',
    lightingRange: [0, 3] as [number, number],
    bgTheme: {
      bgColor: 'bg-skin-newMoon',
      bgImg: 'bg-new-moon',
      textColor: 'text-googleLightGray',
      outlineColor: 'hover:outline outline-skin-newMoon outline-[0.5px]',
      btnSearchBg: 'bg-btnSearchNewMoon',
      hoverSearchBg: 'hover:bg-hoverSearchNewMoon',
      logoColor: 'bg-phasePink',
    }
  },
  WAXING_CRESCENT: {
    id: 2,
    name: 'Waxing Crescent',
    img: '/moon-imgs/waxing.png',
    lightingRange: [4, 48] as [number, number],
    bgTheme: {
      bgColor: 'bg-skin-waxing',
      bgImg: 'bg-waxing',
      textColor: 'text-googleLightGray',
      outlineColor: 'hover:outline outline-skin-waxing outline-[0.5px]',
      btnSearchBg: 'bg-btnSearchWaxing',
      hoverSearchBg: 'hover:bg-hoverSearchWaxing',
      logoColor: 'bg-phaseGray',
    }
  },
  FIRST_QUARTER: {
    id: 3,
    name: 'First Quarter',
    img: '/moon-imgs/first-q.png',
    lightingRange: [49, 52] as [number, number],
    bgTheme: {
      bgColor: 'bg-skin-firstQuarter',
      bgImg: 'bg-first-quarter',
      textColor: 'text-googleLightGray',
      outlineColor: 'hover:outline outline-skin-firstQuarter outline-[0.5px]',
      btnSearchBg: 'bg-btnSearchFirstQuarter',
      hoverSearchBg: 'hover:bg-hoverSearchFirstQuarter',
      logoColor: 'bg-phaseYellow',
    }
  },
  WAXING_GIBBOUS: {
    id: 4,
    name: 'Waxing Gibbous',
    img: '/moon-imgs/waxing-g.png',
    lightingRange: [53, 97] as [number, number],
    bgTheme: {
      bgColor: 'bg-skin-waxingGibbous',
      bgImg: 'bg-waxing-gibbous',
      textColor: 'text-googleLightGray',
      outlineColor: 'hover:outline outline-skin-waxingGibbous outline-[0.5px]',
      btnSearchBg: 'bg-btnSearchWaxingGibbous',
      hoverSearchBg: 'hover:bg-hoverSearchWaxingGibbous',
      logoColor: 'bg-phaseOrange',
    }
  },
  FULL_MOON: {
    id: 5,
    name: 'Full Moon',
    img: '/moon-imgs/full.png',
    lightingRange: [98, 100] as [number, number],
    bgTheme: {
      bgColor: 'bg-skin-fullMoon',
      bgImg: 'bg-full-moon',
      textColor: 'text-googleLightGray',
      outlineColor: 'hover:outline outline-skin-fullMoon outline-[0.5px]',
      btnSearchBg: 'bg-btnSearchFullMoon',
      hoverSearchBg: 'hover:bg-hoverSearchFullMoon',
      logoColor: 'bg-phaseGray',
    }
  },
  WANING_GIBBOUS: {
    id: 6,
    name: 'Waning Gibbous',
    img: '/moon-imgs/waning-g.png',
    lightingRange: [53, 97] as [number, number],
    bgTheme: {
      bgColor: 'bg-skin-waningGibbous',
      bgImg: 'bg-waning-gibbous',
      textColor: 'text-googleDarkGrayText',
      outlineColor: 'hover:outline outline-skin-waningGibbous outline-[0.5px]',
      btnSearchBg: 'bg-btnSearchWaningGibbous',
      hoverSearchBg: 'hover:bg-hoverSearchWaningGibbous',
      logoColor: 'bg-phaseOrange',
    }
  },
  LAST_QUARTER: {
    id: 7,
    name: 'Last Quarter',
    img: '/moon-imgs/last-q.png',
    lightingRange: [49, 52] as [number, number],
    bgTheme: {
      bgColor: 'bg-skin-lastQuarter',
      bgImg: 'bg-last-quarter',
      textColor: 'text-googleLightGray',
      outlineColor: 'hover:outline outline-skin-lastQuarter outline-[0.5px]',
      btnSearchBg: 'bg-btnSearchLastQuarter',
      hoverSearchBg: 'hover:bg-hoverSearchLastQuarter',
      logoColor: 'bg-phasePink',
    }
  },
  WANING_CRESCENT: {
    id: 8,
    name: 'Waning Crescent',
    img: '/moon-imgs/waning.png',
    lightingRange: [4, 48] as [number, number],
    bgTheme: {
      bgColor: 'bg-skin-waning',
      bgImg: 'bg-waning',
      textColor: 'text-googleLightGray',
      outlineColor: 'hover:outline outline-skin-waning outline-[0.5px]',
      btnSearchBg: 'bg-btnSearchWaning',
      hoverSearchBg: 'hover:bg-hoverSearchWaning',
      logoColor: 'bg-phaseYellow',
    }
  }
};

// Load your simplified moon data
import moonData from './moonData.json';

// Debug: Log the imported data
// console.log('Loaded moon data:', moonData);

/**
 * Calculate moon phase for any given date using the algorithm from JSON
 */
function calculateMoonPhaseForDate(date: Date): { lighting_level: number; phase_name: string } {
  // Constants from your JSON
  const knownNewMoon = new Date('2000-01-06').getTime();
  const lunarCycle = 29.53058867 * 24 * 60 * 60 * 1000; // Convert days to milliseconds

  // Calculate days since known new moon
  const daysSince = ((date.getTime() - knownNewMoon) / (24 * 60 * 60 * 1000)) % 29.53058867;

  // Calculate phase fraction (0 to 1)
  const phaseFraction = daysSince / 29.53058867;

  // Calculate lighting level using cosine formula
  const lightingLevel = (1 - Math.cos(phaseFraction * 2 * Math.PI)) / 2;

  // Convert to percentage and round
  const lightingPercentage = Math.round(lightingLevel * 100);

  // Debug logging
  // console.log('Date:', date.toDateString());
  // console.log('Days since known new moon:', daysSince);
  // console.log('Phase fraction:', phaseFraction);
  // console.log('Lighting level:', lightingLevel);
  // console.log('Lighting percentage:', lightingPercentage);

  // Find matching phase from your JSON data
  const matchingPhase = moonData.phases.find(phase => {
    const [min, max] = phase.lighting_range;
    const minPercent = min * 100;
    const maxPercent = max * 100;
    // console.log(`Checking phase ${phase.name}: ${minPercent}-${maxPercent}% vs ${lightingPercentage}%`);
    return lightingPercentage >= minPercent && lightingPercentage <= maxPercent;
  });

  // console.log('Matching phase:', matchingPhase);

  return {
    lighting_level: lightingLevel,
    phase_name: matchingPhase?.name || 'New Moon'
  };
}

/**
 * Map JSON phase names to your local MOON_PHASES
 */
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

/**
 * Main function to calculate moon phase (replaces your complex calculateMoonPhase)
 */
export function calculateMoonPhase(date?: Date): MoonPhase {
  const targetDate = date || new Date();
  const calculatedPhase = calculateMoonPhaseForDate(targetDate);
  return mapPhaseNameToLocal(calculatedPhase.phase_name);
}

/**
 * Get background theme for any date (replaces calculateBgColor)
 */
export function calculateBgColor(date?: Date): BgTheme {
  const moonPhase = calculateMoonPhase(date);
  return moonPhase.bgTheme;
}

/**
 * Get moon phase for widget display (simplified)
 */
export function getMoonPhaseForWidget() {
  const moonPhase = calculateMoonPhase(new Date());
  return { name: moonPhase.name, img: moonPhase.img };
}

/**
 * Get moon phase for any specific day (simplified)
 */
export function getMoonPhaseForDay(day: number, month?: number, year?: number): MoonPhase {
  const currentDate = new Date();
  const targetDate = new Date(
    year || currentDate.getFullYear(),
    month !== undefined ? month - 1 : currentDate.getMonth(), // month is 0-indexed
    day
  );
  return calculateMoonPhase(targetDate);
}

/**
 * Get lighting level for any date
 */
export function getLightingLevel(date?: Date): number {
  const targetDate = date || new Date();
  const calculatedPhase = calculateMoonPhaseForDate(targetDate);
  return Math.round(calculatedPhase.lighting_level * 100);
}

/**
 * Debug function to show moon phase calculations
 */
export function debugMoonPhases(startDate?: Date, days: number = 30): void {
  const start = startDate || new Date();

  console.log('🌙 Moon Phase Analysis:');
  for (let i = 0; i < days; i++) {
    const date = new Date(start);
    date.setDate(date.getDate() + i);

    const phase = calculateMoonPhase(date);
    const lighting = getLightingLevel(date);

    console.log(`${date.toDateString()}: ${phase.name} (${lighting}% lit)`);
  }
}

/**
 * Check if a date is a specific phase
 */
export function isPhase(date: Date, phaseName: string): boolean {
  const phase = calculateMoonPhase(date);
  return phase.name.toLowerCase() === phaseName.toLowerCase();
}

/**
 * Get next occurrence of a specific phase
 */
export function getNextPhase(phaseName: string, startDate?: Date): Date {
  const start = startDate || new Date();

  // Check up to 32 days ahead (more than a full lunar cycle)
  for (let i = 1; i <= 32; i++) {
    const checkDate = new Date(start);
    checkDate.setDate(checkDate.getDate() + i);

    if (isPhase(checkDate, phaseName)) {
      return checkDate;
    }
  }

  // Fallback - return a date 30 days ahead
  const fallback = new Date(start);
  fallback.setDate(fallback.getDate() + 30);
  return fallback;
}

export { MOON_PHASES };