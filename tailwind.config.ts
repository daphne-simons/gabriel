import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        gramercy: ['Gramercy Fine'],
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
      },
      animation: {
        'font-weight': 'font-weight-animation 5s infinite',
      },
    },
  },
  plugins: [],
}
export default config
