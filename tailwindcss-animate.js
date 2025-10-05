const plugin = require('tailwindcss/plugin');

module.exports = plugin(function({ addUtilities }) {
  addUtilities({
    '.animate-accordion-down': {
      animation: 'accordion-down 0.2s ease-out',
    },
    '.animate-accordion-up': {
      animation: 'accordion-up 0.2s ease-out',
    },
  });
}, {
  theme: {
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
    },
  },
});
