/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
import merzaTheme from '@merzaui/react/tailwind';

const externalPathPrefix =
  process.env.NODE_ENV === 'development' ? '../..' : '.';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    `${externalPathPrefix}/node_modules/@merzaui/react/dist/**/*.{js,ts,jsx,tsx}`,
  ],
  ...merzaTheme,
  plugins: [import('@tailwindcss/typography')],
};
