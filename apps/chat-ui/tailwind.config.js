import uiPreset from '../../libs/ui/tailwind.preset.js';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [uiPreset],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', '../../libs/ui/src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
