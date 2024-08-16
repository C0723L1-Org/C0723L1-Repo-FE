/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
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
      }
    },
  },
  plugins: [

  ],
}