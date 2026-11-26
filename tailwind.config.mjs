/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,json}'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0B0B0B',
          bg: '#F6F5F1',
          terracotta: '#D96B43',
        }
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'Montserrat', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
