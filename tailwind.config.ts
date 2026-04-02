import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        verde: {
          DEFAULT: '#33763D',
          medio:   '#4B8B55',
          claro:   '#67986B',
          oscuro:  '#1C3A1E',
        },
        dorado: {
          DEFAULT: '#C9A84C',
          claro:   '#E8D9A4',
        },
        crema: {
          DEFAULT: '#F7F3EA',
          oscuro:  '#EDE5D4',
        },
        blanco: '#FDFAF6',
        texto: {
          DEFAULT: '#1C2B1D',
          muted:   '#5A7060',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans:  ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config