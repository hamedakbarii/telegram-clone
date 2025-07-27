// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        telegram: {
          light: {
            bg: '#FEFEFF',
            text: '#000000',
            sidebar: '#FFFFFF',
          },
          dark: {
            bg: '#0E0E10',
            text: '#FFFFFF',
            sidebar: '#1A1A1D',
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;