/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",

  ],
  theme: {
    extend: {
      maxWidth: {
       'custom' : '50rem',
      },
    },
  },
  plugins: [],
}

