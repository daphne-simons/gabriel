export function calculateBgColor(lighting: number) {
  if (lighting >= 0 && lighting <= 5) {
    return {
      id: 1,
      bgColor: 'bg-skin-newMoon',
      bgImg: 'bg-moon-bg',
      textColor: 'text-skin-newMoon',
      outlineColor: 'outline-skin-newMoon',
      btnSearchBg: 'bg-skin-btnSearchNewMoon',
    }
  } else if (lighting >= 6 && lighting <= 42) {
    return {
      id: 2,
      bgColor: 'bg-skin-waxing',
      bgImg: 'bg-moon-bg-80',
      textColor: 'text-skin-waxing',
      outlineColor: 'outline-skin-waxing',
      btnSearchBg: 'bg-skin-btnSearchWaxing',
    }
  } else if (lighting >= 43 && lighting <= 60) {
    return {
      id: 3,
      bgColor: 'bg-skin-firstQuarter',
      bgImg: 'bg-moon-bg-60',
      textColor: 'text-skin-firstQuarter',
      outlineColor: 'outline-skin-firstQuarter',
      btnSearchBg: 'bg-skin-btnSearchFirstQuarter',
    }
  } else if (lighting >= 61 && lighting <= 75) {
    // Adjusted range
    return {
      id: 4,
      bgColor: 'bg-skin-waxingGibbous',
      bgImg: 'bg-moon-bg-60',
      textColor: 'text-skin-waxingGibbous',
      outlineColor: 'outline-skin-waxingGibbous',
      btnSearchBg: 'bg-skin-btnSearchWaxingGibbous',
    }
  } else if (lighting >= 76 && lighting <= 95) {
    // Adjusted range
    return {
      id: 5,
      bgColor: 'bg-skin-fullMoon',
      bgImg: 'bg-moon-bg-60',
      textColor: 'text-skin-fullMoon',
      outlineColor: 'outline-skin-fullMoon',
      btnSearchBg: 'bg-skin-btnSearchFullMoon',
    }
  } else if (lighting >= 96 && lighting <= 105) {
    return {
      id: 6,
      bgColor: 'bg-skin-waningGibbous',
      bgImg: 'bg-moon-bg-60',
      textColor: 'text-skin-waningGibbous',
      outlineColor: 'outline-skin-waningGibbous',
      btnSearchBg: 'bg-skin-btnSearchWaningGibbous',
    }
  } else if (lighting >= 66 && lighting <= 75) {
    // Adjusted range
    return {
      id: 7,
      bgColor: 'bg-skin-lastQuarter',
      bgImg: 'bg-moon-bg-60',
      textColor: 'text-skin-lastQuarter',
      outlineColor: 'outline-skin-lastQuarter',
      btnSearchBg: 'bg-skin-btnSearchLastQuarter',
    }
  } else if (lighting >= 44 && lighting < 66) {
    // Adjusted range
    return {
      id: 8,
      bgColor: 'bg-skin-waning',
      bgImg: 'bg-moon-bg-80',
      textColor: 'text-skin-waning',
      outlineColor: 'outline-skin-waning',
      btnSearchBg: 'bg-skin-btnSearchWaning',
    }
  }
}
