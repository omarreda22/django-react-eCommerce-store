/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: '1rem',
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

