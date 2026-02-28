/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#1E3A8A',
          light: '#F0F9FF',
        },
        status: {
          eligible: '#10B981',
          provision: '#F59E0B',
          detained: '#EF4444',
        }
      }
    },
  },
  plugins: [],
}
