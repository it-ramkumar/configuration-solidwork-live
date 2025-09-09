// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     './index.html',
//     './src/**/*.{js,ts,jsx,tsx}',
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         neuton: ['Neuton', 'serif'],
//       },
//       snapType: {
//         always: 'always',
//       },
//     },
//   },
//   plugins: [],
// }


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        neuton: ['Neuton', 'serif'],
      },
      colors: {
        graphite: {
          DEFAULT: '#2F2F2F',   // Main GraphiteGrey
          light: '#15A15A15A',     // Panels / Cards
          medium: '#4A4A4A',    // Borders / Hover
          dark: '#1C1C1C',      // Deep Background
        },
      },
      snapType: {
        always: 'always',
      },
    },
  },
  plugins: [],
}
