module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: () => ({
        'screen/3': 'calc(100vh / 3)'
      }),
      width: () => ({
        'screen/2': 'calc(100vw / 2)'
      }),
      borderWidth: {
        1: '1px'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('tailwind-scrollbar-hide')]
};
