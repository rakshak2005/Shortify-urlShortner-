/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        "bg":"url('/src/assets/Images/blue-bg.jpg')"
      },
      colors: {
        softBlue: "#f2f6ff", 
        mirinda: "#6C3181",
        bluet:"#00043A" // your custom color
      },
       fontFamily: {
        logocursive: ['Great Vibes', 'cursive'], // new font
      },
    },
  },
  plugins: [],
}

