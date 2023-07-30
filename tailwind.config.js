/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      'mono': ['ui-monospace', 'Source Code Pro', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
    },
  },
  plugins: [],
}
