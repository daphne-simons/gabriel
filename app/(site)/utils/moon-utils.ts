// Moon Phase Logic and Helpers

export interface BgTheme {
  bgColor: string;
  bgImg: string;
  textColor: string;
  outlineColor: string;
  btnSearchBg: string;
  hoverSearchBg: string;
  logoColor: string;
}

export interface MoonPhase {
  id: number;
  name: string;
  img: string;
  lightingRange: [number, number];
  bgTheme: BgTheme;
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
  NEW_MOON: { id: 1, name: 'New Moon', img: '/moon-imgs/new.webp', lightingRange: [0, 3] as [number, number], bgTheme: { bgColor: 'bg-skin-newMoon', bgImg: 'bg-new-moon', textColor: 'text-googleLightGray', outlineColor: 'hover:outline outline-skin-newMoon outline-[0.5px]', btnSearchBg: 'bg-btnSearchNewMoon', hoverSearchBg: 'hover:bg-hoverSearchNewMoon', logoColor: 'bg-phasePink' } },
  WAXING_CRESCENT: { id: 2, name: 'Waxing Crescent', img: '/moon-imgs/waxing.webp', lightingRange: [4, 48] as [number, number], bgTheme: { bgColor: 'bg-skin-waxing', bgImg: 'bg-waxing', textColor: 'text-googleLightGray', outlineColor: 'hover:outline outline-skin-waxing outline-[0.5px]', btnSearchBg: 'bg-btnSearchWaxing', hoverSearchBg: 'hover:bg-hoverSearchWaxing', logoColor: 'bg-phaseGray' } },
  FIRST_QUARTER: { id: 3, name: 'First Quarter', img: '/moon-imgs/first-q.webp', lightingRange: [49, 52] as [number, number], bgTheme: { bgColor: 'bg-skin-firstQuarter', bgImg: 'bg-first-quarter', textColor: 'text-googleLightGray', outlineColor: 'hover:outline outline-skin-firstQuarter outline-[0.5px]', btnSearchBg: 'bg-btnSearchFirstQuarter', hoverSearchBg: 'hover:bg-hoverSearchFirstQuarter', logoColor: 'bg-phaseYellow' } },
  WAXING_GIBBOUS: { id: 4, name: 'Waxing Gibbous', img: '/moon-imgs/waxing-g.webp', lightingRange: [53, 97] as [number, number], bgTheme: { bgColor: 'bg-skin-waxingGibbous', bgImg: 'bg-waxing-gibbous', textColor: 'text-googleLightGray', outlineColor: 'hover:outline outline-skin-waxingGibbous outline-[0.5px]', btnSearchBg: 'bg-btnSearchWaxingGibbous', hoverSearchBg: 'hover:bg-hoverSearchWaxingGibbous', logoColor: 'bg-phaseOrange' } },
  FULL_MOON: { id: 5, name: 'Full Moon', img: '/moon-imgs/full.webp', lightingRange: [98, 100] as [number, number], bgTheme: { bgColor: 'bg-skin-fullMoon', bgImg: 'bg-full-moon', textColor: 'text-googleLightGray', outlineColor: 'hover:outline outline-skin-fullMoon outline-[0.5px]', btnSearchBg: 'bg-btnSearchFullMoon', hoverSearchBg: 'hover:bg-hoverSearchFullMoon', logoColor: 'bg-phaseGray' } },
  WANING_GIBBOUS: { id: 6, name: 'Waning Gibbous', img: '/moon-imgs/waning-g.webp', lightingRange: [53, 97] as [number, number], bgTheme: { bgColor: 'bg-skin-waningGibbous', bgImg: 'bg-waning-gibbous', textColor: 'text-googleDarkGrayText', outlineColor: 'hover:outline outline-skin-waningGibbous outline-[0.5px]', btnSearchBg: 'bg-btnSearchWaningGibbous', hoverSearchBg: 'hover:bg-hoverSearchWaningGibbous', logoColor: 'bg-phaseOrange' } },
  LAST_QUARTER: { id: 7, name: 'Last Quarter', img: '/moon-imgs/last-q.webp', lightingRange: [49, 52] as [number, number], bgTheme: { bgColor: 'bg-skin-lastQuarter', bgImg: 'bg-last-quarter', textColor: 'text-googleLightGray', outlineColor: 'hover:outline outline-skin-lastQuarter outline-[0.5px]', btnSearchBg: 'bg-btnSearchLastQuarter', hoverSearchBg: 'hover:bg-hoverSearchLastQuarter', logoColor: 'bg-phasePink' } },
  WANING_CRESCENT: { id: 8, name: 'Waning Crescent', img: '/moon-imgs/waning.webp', lightingRange: [4, 48] as [number, number], bgTheme: { bgColor: 'bg-skin-waning', bgImg: 'bg-waning', textColor: 'text-googleLightGray', outlineColor: 'hover:outline outline-skin-waning outline-[0.5px]', btnSearchBg: 'bg-btnSearchWaning', hoverSearchBg: 'hover:bg-hoverSearchWaning', logoColor: 'bg-phaseYellow' } }
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
// Debug function to test the fix
// export function debugCurrentIssue(): void {
//   console.log('🌙 DEBUGGING CURRENT MOON PHASE ISSUE');
//   console.log('=====================================');

//   const testDate = new Date('2025-06-24');
//   console.log('Testing date:', testDate.toDateString());

// Test with old logic (simulated)
// const oldResult = calculateMoonPhaseForDateFixed(testDate);
// console.log('\n🔍 Detailed calculation:');
// console.log(oldResult.debug_info);

// // Test with fixed logic
// const newPhase = calculateMoonPhase(testDate);
// console.log('\n✅ Final result:');
// console.log(`Phase: ${newPhase.name}`);
// console.log(`Lighting: ${getLightingLevel(testDate)}%`);

// // Test consistency across multiple calls
// console.log('\n🔄 Consistency test (5 calls):');
// for (let i = 0; i < 5; i++) {
//   const phase = calculateMoonPhase(testDate);
//   console.log(`Call ${i + 1}: ${phase.name}`);
// }

// Test today's date
// console.log('\n📅 Today\'s phase:');
// const todayPhase = calculateMoonPhase();
// console.log(`Today: ${todayPhase.name} (${getLightingLevel()}% lit)`);
// }

// Test function to verify the fix across a lunar cycle

// export function testLunarCycle(): void {
//   console.log('🌙 TESTING COMPLETE LUNAR CYCLE');
//   console.log('===============================');

//   const startDate = new Date('2024-03-10'); // Known new moon
//   const phases: Array<{ date: string, phase: string, lighting: number, phaseFraction: number }> = [];

//   for (let i = 0; i < 30; i++) {
//     const testDate = new Date(startDate);
//     testDate.setDate(testDate.getDate() + i);

//     const result = calculateMoonPhaseForDateFixed(testDate);
//     const phase = mapPhaseNameToLocal(result.phase_name);

//     phases.push({
//       date: testDate.toDateString(),
//       phase: phase.name,
//       lighting: Math.round(result.lighting_level * 100),
//       phaseFraction: result.debug_info.phaseFraction
//     });
//   }

//   // Print results
//   phases.forEach((p, i) => {
//     const arrow = i === 0 ? '👉' : '  ';
//     console.log(`${arrow} Day ${i + 1}: ${p.date} - ${p.phase} (${p.lighting}% lit, fraction: ${p.phaseFraction.toFixed(3)})`);
//   });

//   // Verify we see all phases
//   const uniquePhases = [...new Set(phases.map(p => p.phase))];
//   console.log('\n📊 Phases found:', uniquePhases);
//   console.log('✅ Expected 8 phases, found:', uniquePhases.length);
// }

// // Test the fix immediately
// debugCurrentIssue();
// testLunarCycle();