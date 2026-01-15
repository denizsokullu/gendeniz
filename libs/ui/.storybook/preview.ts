import type { Preview } from '@storybook/react';
import '../src/styles.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0A0A0B' },
        { name: 'surface', value: '#141415' },
        { name: 'elevated', value: '#1C1C1E' },
      ],
    },
  },
};

export default preview;
