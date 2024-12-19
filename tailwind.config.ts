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
      },
      backgroundImage: {
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
      },
      animation: {
        'font-weight': 'font-weight-animation 5s infinite',
      },
      colors: {
        c0: '#e2e2bf',
        c1: '#1d1d1d',
        googleRed: '#EA4335',
        googleLightRed: '#F86F78',
        googleNeonGreen: '#24FF00',
        googleGreen: '#34A853',
        googleBlue: '#1C73E8',
        googleOrange: '#E37400',
        googleGray: '#5F6368',
        googleLightGray: '#E5E7EB',
        googleButton: '#1c73EB',
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
}
export default config
