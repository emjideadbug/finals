/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",   // For Next.js pages directory
      "./components/**/*.{js,ts,jsx,tsx}", // For your components
      "./app/**/*.{js,ts,jsx,tsx}",     // For Next.js app directory (if using)
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }