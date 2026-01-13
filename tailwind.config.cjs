module.exports = {
  content: [
    './index.html',
    './**/*.html',
    './script.js'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#13ec92',
        'primary-dark': '#0bb870',
        'background-light': '#f8fcfa',
        'background-dark': '#10221a',
        'card-light': '#ffffff',
        'card-dark': '#1c3026',
        'text-main': '#0d1b16',
        'text-secondary': '#4c9a79'
      },
      fontFamily: {
        display: ['Public Sans', 'sans-serif']
      }
    }
  },
  plugins: []
};
