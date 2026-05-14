/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'orange': '#F97316',
        'dark': '#0a0a0a',
      },
    },
  },
  plugins: [],
}
