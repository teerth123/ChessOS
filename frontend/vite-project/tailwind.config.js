/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-green-1': '#006720',
        'custom-green-2': '#119933',
        'custom-green-3': '#29c344',
        'custom-green-4': '#7ee18a',
        'no-color' : '#64748b'
    },
    },
  },
  plugins: [],
}
