/** @type {import('tailwindcss').Config} */
// Key wallet palette: soft plum accent on a calm lilac-grey base
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: { 50: '#ECE6EE', 100: '#E2D8E5', 200: '#CFC3D3', 300: '#A895AE', 500: '#7A6580', 600: '#5E4B63', 700: '#4A3A4F', 800: '#3A2D3E' },
        ink: { DEFAULT: '#241E26', muted: '#625866', line: '#E4DEE6', field: '#A59BA8', soft: '#F0ECF1' },
        canvas: '#F5F3F5',
        ok: { bg: '#E1EDE4', fg: '#2F5D3E', bar: '#9DBFA9' },
        warn: { bg: '#F3EAD2', fg: '#6B5317' },
        bad: { bg: '#F3DEDA', fg: '#8A3B30' },
      },
      fontFamily: {
        sans: ['"Noto Sans"', '"Noto Sans Arabic"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
