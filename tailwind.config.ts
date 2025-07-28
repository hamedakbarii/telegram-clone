import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // This is crucial for enabling dark mode based on a class or data-attribute
  darkMode: 'class', // or 'media' if you want to use prefers-color-scheme, or '[data-mode="dark"]' if you use the data-mode attribute.
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        geistSans: ['var(--font-geist-sans)'],
        geistMono: ['var(--font-geist-mono)'],
      },
      colors: {
        // You can define your custom color palette here
        // For example:
        primary: '#8774E1', // The purple color you used
        // ... other custom colors
      },
    },
  },
  plugins: [],
};

export default config;