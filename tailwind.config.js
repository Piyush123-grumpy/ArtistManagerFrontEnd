const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        'spotify-black': '#191414',
        'spotify-gray': '#535353',
      },
      backgroundImage: {
        'spotify-gradient': 'linear-gradient(135deg, #191414 0%, #535353 100%)',
      },
    },
  },
  plugins: [require('flowbite/plugin'),flowbite.plugin()],
}

