/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode:"class",
  theme: {
    extend: {
      colors:{
      },
      container:{
        center:true,
        padding:{
          DEFAULT: "1rem",
          sm: "3rem"
        }
      },
      screens: {
        'screen1200': '1200px',
        'screen1390': '1390px',
      },
      maxWidth: {
        'screen-sm': '640px',
        'screen-md': '768px',
        'screen-lg': '1024px',
        'screen-xl': '1280px',
        'screen-2xl': '1536px',
      },
      zIndex: {
        '100': '100',
      },
      spacing: {
        '-left-0': '-0%',
      },
      height: {
        '500px': '500px',
      },
    },
  },
  plugins: [

  ],
}