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
      }
    },
  },
  plugins: [

  ],
}