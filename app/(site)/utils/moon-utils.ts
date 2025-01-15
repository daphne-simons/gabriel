export function calculateBgColor(lighting: number) {
  if (lighting >= 0 && lighting <= 5) {
    // NEW MOON
    return {
      id: 1,
      bgColor: 'bg-skin-newMoon',
      bgImg: 'bg-moon-bg',
      textColor: 'text-skin-newMoon',
      outlineColor: 'hover:outline outline-skin-newMoon outline-[0.5px]',
      btnSearchBg: 'bg-btnSearchNewMoon',
    }
  } else if (lighting >= 6 && lighting <= 42) {
    // WAXING
    return {
      id: 2,
      bgColor: 'bg-skin-waxing',
      bgImg: 'bg-moon-bg-80',
      textColor: 'text-skin-waxing',
      outlineColor: 'hover:outline outline-skin-waxing outline-[0.5px]',
      btnSearchBg: 'bg-btnSearchWaxing',
    }
  } else if (lighting >= 43 && lighting <= 60) {
    // FIRST QUARTER
    return {
      id: 3,
      bgColor: 'bg-skin-firstQuarter',
      bgImg: 'bg-moon-bg-60',
      textColor: 'text-skin-firstQuarter',
      outlineColor: 'hover:outline outline-skin-firstQuarter outline-[0.5px]',
      btnSearchBg: 'bg-btnSearchFirstQuarter',
    }
  } else if (lighting >= 61 && lighting <= 75) {
    // WAXING GIBBOUS
    return {
      id: 4,
      bgColor: 'bg-skin-waxingGibbous',
      bgImg: 'bg-moon-bg-60',
      textColor: 'text-skin-waxingGibbous',
      outlineColor: 'hover:outline outline-skin-waxingGibbous outline-[0.5px]',
      btnSearchBg: 'bg-btnSearchWaxingGibbous',
    }
  } else if (lighting >= 76 && lighting <= 95) {
    // FULL MOON
    return {
      id: 5,
      bgColor: 'bg-skin-fullMoon',
      bgImg: 'bg-moon-bg-60',
      textColor: 'text-skin-fullMoon',
      outlineColor: 'hover:outline outline-skin-fullMoon outline-[0.5px]',
      btnSearchBg: 'bg-btnSearchFullMoon',
    }
  } else if (lighting >= 96 && lighting <= 105) {
    // WANING GIBBOUS
    return {
      id: 6,
      bgColor: 'bg-skin-waningGibbous',
      bgImg: 'bg-moon-bg-60',
      textColor: 'text-skin-waningGibbous',
      outlineColor: 'hover:outline outline-skin-waningGibbous outline-[0.5px]',
      btnSearchBg: 'bg-btnSearchWaningGibbous',
    }
  } else if (lighting >= 66 && lighting <= 75) {
    // LAST QUARTER
    return {
      id: 7,
      bgColor: 'bg-skin-lastQuarter',
      bgImg: 'bg-moon-bg-60',
      textColor: 'text-skin-lastQuarter',
      outlineColor: 'hover:outline outline-skin-lastQuarter outline-[0.5px]',
      btnSearchBg: 'bg-btnSearchLastQuarter',
    }
  } else if (lighting >= 44 && lighting < 66) {
    // WANING
    return {
      id: 8,
      bgColor: 'bg-skin-waning',
      bgImg: 'bg-moon-bg-80',
      textColor: 'text-skin-waning',
      outlineColor: 'hover:outline outline-skin-waning outline-[0.5px]',
      btnSearchBg: 'bg-btnSearchWaning',
    }
  }
}
