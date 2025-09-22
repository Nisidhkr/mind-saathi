/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        perylene: {
          50: '#f0f9f4',
          100: '#dcf2e4',
          200: '#bce5d0',
          300: '#8dd1b3',
          400: '#57b590',
          500: '#2d9a6f', // Main Perylene Green
          600: '#1f7a5a',
          700: '#1a6249',
          800: '#174e3c',
          900: '#154032',
          950: '#0a241a',
        },
        sage: {
          50: '#f6f7f6',
          100: '#e3e7e3',
          200: '#c7d0c7',
          300: '#a3b1a3',
          400: '#7d8f7d',
          500: '#5f735f',
          600: '#4a5a4a',
          700: '#3c483c',
          800: '#323b32',
          900: '#2b322b',
          950: '#161b16',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'perylene': '0 10px 25px -3px rgba(45, 154, 111, 0.1), 0 4px 6px -2px rgba(45, 154, 111, 0.05)',
        'perylene-lg': '0 20px 25px -5px rgba(45, 154, 111, 0.1), 0 10px 10px -5px rgba(45, 154, 111, 0.04)',
      }
    },
  },
  plugins: [],
};
