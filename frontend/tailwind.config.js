/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'beauty-rose': '#D4A5A5',
        'beauty-gold': '#C9A961',
        'beauty-cream': '#F5F0E8',
      },
    },
  },
  plugins: [],
}
