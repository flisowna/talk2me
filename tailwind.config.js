/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['var(--font-source_code_pro)'],
        serif: ['var(--font-stag)'],
      },
    },
    colors: {
      primary: '#1C9B9A',
      secondary: '#F1F1FF',
      white: '#FFFFFF',
      black: '#333333',
    },
  },
  plugins: [],
}
