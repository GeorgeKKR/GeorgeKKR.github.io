import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Projection black: the screen before the film starts
        ink: '#000000',
        // Raised surfaces on black (modal, inputs)
        booth: '#151515',
        // Hairlines and dividers on black
        line: '#2B2B2B',
        // Secondary text on black (7.4:1 on ink)
        mute: '#9A9A9A',
        // Screen white: text on black, and the light "poster" section
        screen: '#EDEDE9',
        // Secondary text on screen white (5.6:1 on screen)
        smoke: '#5E5E5A',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif'],
      },
      maxWidth: {
        measure: '38rem',
      },
      transitionTimingFunction: {
        cut: 'cubic-bezier(0.2, 0.7, 0.1, 1)',
      },
    },
  },
  plugins: [],
}

export default config
