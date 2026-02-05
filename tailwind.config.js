/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Lato', 'sans-serif'],
      },
      colors: {
        /* Main: green, blue, pink – match index.css :root */
        primary: {
          green: '#2D5A4A',
          blue: '#3B82A8',
          pink: '#D3968C',
        },
        /* Text and UI */
        ink: {
          dark: '#0A3323',
          mid: '#105666',
          light: '#4A6B62',
        },
        pond: {
          bg: '#F7F4D5',
          midnight: '#105666',
          dark: '#0A3323',
          moss: '#839958',
          rosy: '#D3968C',
        },
        /* Main page background (green) + text on it */
        page: {
          bg: '#1e332b',
          'on-green': '#F7F4D5',
          muted: '#b8c4b0',
        },
        /* Option B: The Fig & Clay */
        fig: {
          primary: '#AEA181',
          wilted: '#A84F3D',
          basil: '#5A4651',
          violet: '#5A3848',
          palm: '#374628',
        },
        /* Option C: The Wildflower Meadow */
        meadow: {
          olive: '#4A5D23',
          periwinkle: '#7B8FA1',
          espresso: '#3D2914',
          berry: '#8B4354',
          chartreuse: '#B5C95A',
        },
        /* Option D: The Golden Hour */
        gold: {
          chestnut: '#480903',
          desert: '#E5D1A4',
          olive: '#937A24',
          caramel: '#CE793A',
          copper: '#B64B12',
        },
      },
    },
  },
  plugins: [],
}
