const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'Deep-navy-blue': '#020866',
      'Vibrant-sky-blue': '#3999ce',
      'Dark-royal-blue': '#1e3583',
      'Bright-teal-blue': '#3083be',
      'Steel-blue': '#4570a7',
      'Pure-white': '#ffff',
      'Off-white': '#f5f5f5f5',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  plugins: [
    flowbite.plugin(),
  ],
}