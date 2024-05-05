import type { Config } from 'tailwindcss'
function generateFontVariations() {
  const variations = []
  const minWeight = 300
  const maxWeight = 500
  const minWidth = -100
  const maxWidth = 100
  const minHeight = 0.7
  const maxHeight = 1.7

  for (let weight = minWeight; weight <= maxWeight; weight++) {
    for (let width = minWidth; width <= maxWidth; width++) {
      for (let height = minHeight; height <= maxHeight; height += 0.05) {
        const settings = `"wght" ${weight}, "wdth" ${width}, "hght" ${height.toFixed(
          2
        )}`
        const className = `.font-wght-${weight}-wdth-${width}-hght-${height
          .toFixed(2)
          .replace('.', '-')}`
        variations.push({ className, settings })
      }
    }
  }

  return variations
}

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
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const fontVariations = generateFontVariations()
      const customFontVariations = {}

      fontVariations.forEach(({ className, settings }) => {
        customFontVariations[className] = {
          'font-variation-settings': settings,
        }
      })

      addUtilities(customFontVariations, ['responsive', 'hover'])
    },
  ],
}
export default config
