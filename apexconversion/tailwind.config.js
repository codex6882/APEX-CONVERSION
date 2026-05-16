/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { 900: '#0A1628', 800: '#0F2040', 700: '#1a2f55', 600: '#1e3a5f' },
        blue: { 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8' }
      },
      fontFamily: {
        heading: ['Sora', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
