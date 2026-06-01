/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blaze: {
          fire: '#FF3D00',
          ember: '#FF6D00',
          gold: '#FFAB00',
          dark: '#0A0A0A',
          card: '#111111',
          card2: '#1A1A1A',
          border: '#2A2A2A',
          muted: '#666666',
        }
      },
      fontFamily: {
        'black-ops': ['"Black Ops One"', 'cursive'],
        'barlow': ['Barlow', 'sans-serif'],
        'barlow-condensed': ['"Barlow Condensed"', 'sans-serif'],
      },
      animation: {
        'glitch': 'glitch 0.3s ease-in-out',
        'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
        'pulse-fire': 'pulse-fire 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
        },
        'pulse-fire': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
