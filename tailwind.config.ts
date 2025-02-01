import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './stories/**/*.{js,ts,jsx,tsx,mdx}', // Include Storybook stories
    './.storybook/**/*.{js,ts,jsx,tsx,mdx}', // Include Storybook config files
  ],
  theme: {
    extend: {
      boxShadow: {
        customSearchLight: '0px 4px 20px -10px rgba(0, 0, 0, 0.5)',
        customSearchDark: '0px 4px 20px -10px rgba(0, 0, 0, 1)',
      },

      padding: {
        custom: '2px',
      },
      textColor: {
        skin: {
          newMoon: 'var(--moon-text-new-moon)',
          waxing: 'var(--moon-text-waxing)',
          firstQuarter: 'var(--moon-text-first-quarter)',
          waxingGibbous: 'var(--moon-text-waxing-gibbous)',
          fullMoon: 'var(--moon-text-full-moon)',
          waningGibbous: 'var(--moon-text-waning-gibbous)',
          lastQuarter: 'var(--moon-text-last-quarter)',
          waning: 'var(--moon-text-waning)',
        },
      },
      outlineColor: {
        skin: {
          newMoon: 'var(--moon-outline-new-moon)',
          waxing: 'var(--moon-outline-waxing)',
          firstQuarter: 'var(--moon-outline-first-quarter)',
          waxingGibbous: 'var(--moon-outline-waxing-gibbous)',
          fullMoon: 'var(--moon-outline-full-moon)',
          waningGibbous: 'var(--moon-outline-waning-gibbous)',
          lastQuarter: 'var(--moon-outline-last-quarter)',
          waning: 'var(--moon-outline-waning)',
        },
      },
      outlineWidth: {
        0.5: '0.5px',
      },
      backgroundColor: {
        skin: {
          newMoon: 'var(--moon-bg-color-new-moon)',
          waxing: 'var(--moon-bg-color-waxing)',
          firstQuarter: 'var(--moon-bg-color-first-quarter)',
          waxingGibbous: 'var(--moon-bg-color-waxing-gibbous)',
          fullMoon: 'var(--moon-bg-color-full-moon)',
          waningGibbous: 'var(--moon-bg-color-waning-gibbous)',
          lastQuarter: 'var(--moon-bg-color-last-quarter)',
          waning: 'var(--moon-bg-color-waning)',
        },
        btnSearchNewMoon: 'var(--moon-bg-color-btn-search-new-moon)',
        btnSearchWaxing: 'var(--moon-bg-color-btn-search-waxing)',
        btnSearchFirstQuarter: 'var(--moon-bg-color-btn-search-first-quarter)',
        btnSearchWaxingGibbous:
          'var(--moon-bg-color-btn-search-waxing-gibbous)',
        btnSearchFullMoon: 'var(--moon-bg-color-btn-search-full-moon)',
        btnSearchWaningGibbous:
          'var(--moon-bg-color-btn-search-waning-gibbous)',
        btnSearchLastQuarter: 'var(--moon-btn-search-bg-last-quarter)',
        btnSearchWaning: 'var(--moon-bg-color-btn-search-last-quarter)',
        hoverSearchNewMoon: 'var(--moon-hover-search-bg-new-moon)',
        hoverSearchWaxing: 'var(--moon-hover-search-bg-waxing)',
        hoverSearchFirstQuarter: 'var(--moon-hover-search-bg-first-quarter)',
        hoverSearchWaxingGibbous: 'var(--moon-hover-search-bg-waxing-gibbous)',
        hoverSearchFullMoon: 'var(--moon-hover-search-bg-full-moon)',
        hoverSearchWaningGibbous: 'var(--moon-hover-search-bg-waning-gibbous)',
        hoverSearchLastQuarter: 'var(--moon-hover-search-bg-last-quarter)',
        hoverSearchWaning: 'var(--moon-hover-search-bg-waning)',
      },
      backgroundImage: {
        'rock-2': "url('/rock-2.jpg')",
        'moon-bg': "url('/moon-bg.png')",
        'moon-bg-80': "url('/moon-bg-80.png')",
        'moon-bg-60': "url('/moon-bg-60.png')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        gramercy: ['Gramercy Variable'],
        roboto: ['Roboto', 'sans-serif'],
      },
      keyframes: {
        gramercy: {
          from: {
            '--tw-gramercy-weight': '100',
          },
          to: {
            '--tw-gramercy-weight': '900',
          },
        },
        flip: {
          '50%': { transform: 'scale(-1)' },
        },
        roty: {
          '0%': { transform: 'rotateY(calc(var(--i) * 0.5turn))' },
        },
        focus: {
          '0%': { filter: 'blur(0px)' },
          '15%': { filter: 'blur(5px)' },
          '30%': { filter: 'blur(2px)' },
          '40%': { filter: 'blur(0px)' },
          '45%': { filter: 'blur(4px)' },
          '60%': { filter: 'blur(1px)' },
          '75%': { filter: 'blur(3px)' },
          '100%': { filter: 'blur(0px)' },
        },
      },
      animation: {
        focus: 'focus 8s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'font-weight': 'font-weight-animation 5s infinite',
      },
      colors: {
        c0: '#e2e2bf',
        c1: '#1d1d1d',
        googleRed: '#EA4335',
        // RGB hover -  opacity:
        googleRedHover: 'rgb(234, 67, 53, 65%)',
        googleOrange: '#E37400',
        googleLightRed: '#F86F78',
        googleGreen: '#34A853',
        // RGB hover -  opacity:
        googleGreenHover: 'rgb(52, 168, 83, 65%)',
        googleNeonGreen: '#24FF00',
        googleBlue: '#1C73E8',
        // RGB hover -  opacity:
        googleBlueHover: 'rgb(28, 115, 232, 65%)',
        googleHoverBlue: '#0052C1',
        googleDarkBlue: '#0048A8',
        googleMidGray: '#5F6368',
        googleLightGray: '#E5E7EB',
        googlelightGrayFooter: '#F8F9FA',
        googleLightGrayStroke: '#E5E7EB',
        googleDarkGrayText: '#202124',
      },
      spacing: {
        d: '8em',
      },
      durations: {
        t: '1s',
      },
      blur: {
        'blur-sm': '0.2px',
      },
    },
  },
  plugins: [],
  // safelist ensures that my dynamic and conditional class names won't be purged when tw builds the css (TW tends to cull anything it can't recognise as a static class.)
  safelist: [
    // REGEX PATTERNS:
    // Button Search Backgrounds
    { pattern: /^bg-btnSearch/ },

    // Skin Text Colors
    { pattern: /^text-skin-/ },

    // Skin Outline Colors
    { pattern: /^outline-skin-/ },

    // Skin Background Colors
    { pattern: /^bg-skin-/ },
    // Additional Variants if needed
    { pattern: /^bg-btnSearch/, variants: ['hover', 'focus'] },
    { pattern: /^outline-skin-/, variants: ['hover', 'focus'] },
  ],
}
export default config
