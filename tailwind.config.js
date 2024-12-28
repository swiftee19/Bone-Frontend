/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite/plugin";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          800: '#1a1f37',
          900: '#0f1535',
          950: '#0a0f2c',
        }
      },
      lineHeight: {
        'extra-loose': '2.5',
      },
      aspectRatio: {
        'article': '16 / 9',
      },
      transitionDuration: {
        '400': '400ms',
      }
    }
  },
  plugins: [
    flowbite,
    
  ],
};