import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#123034',
        secondary: '#0C3767',
        highlight: '#44BCAE',
        success: '#0EAD69',
        danger: '#D72638',
        warning: '#FCFC62',
      },
      fontSize: {
        h1: '64px',
        h2: '36px',
        h3: '24px',
        h4: '20px',
      }
    },
  },
  plugins: [],
}
export default config
