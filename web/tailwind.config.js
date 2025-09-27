const withOpacityValue = (variable) => ({ opacityValue }) => {
  if (opacityValue !== undefined) {
    return `rgb(var(${variable}) / ${opacityValue})`;
  }
  return `rgb(var(${variable}))`;
};

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: withOpacityValue('--color-primary-rgb'),
        surface: {
          0: 'var(--surface-0)',
          1: 'var(--surface-1)',
        },
        text: {
          strong: 'var(--text-strong)',
          muted: 'var(--text-muted)',
        },
        border: {
          subtle: 'var(--border-subtle)',
          muted: 'var(--border-muted)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        brand: '0 20px 45px rgb(5 125 240 / 0.16)',
      },
    },
  },
  plugins: [],
};

export default config;
