/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        track: {
          dark: '#121212',
          surface: '#181818',
          road: '#1e1e1e',
          lane: '#2e2e2e',
        },
        accent: {
          lime: '#def54f',
          cyan: '#6ac9ff',
          orange: '#fa7328',
          green: '#45db7d',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'glow-green': '0 0 25px rgba(69, 219, 125, 0.45)',
        'glow-lime': '0 0 25px rgba(222, 245, 79, 0.45)',
        'glow-cyan': '0 0 25px rgba(106, 201, 255, 0.45)',
        'glow-orange': '0 0 25px rgba(250, 115, 40, 0.45)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }
    },
  },
  plugins: [],
}
