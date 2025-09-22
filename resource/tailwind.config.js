module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand: perylene (accent). Primary emphasis at 600.
        perylene: {
          50: "#eff6f4",
          100: "#d9ebe7",
          200: "#b6d6cf",
          300: "#8cbab1",
          400: "#5e9b8e",
          500: "#2f7d6c",
          600: "#1E5C50", // primary brand
          700: "#184a40",
          800: "#123a33",
          900: "#0d2b26",
          950: "#091f1b",
        },
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 10px 25px -10px rgba(0,0,0,0.08), 0 6px 10px -6px rgba(0,0,0,0.05)',
        'elevated': '0 20px 40px -15px rgba(0,0,0,0.12), 0 10px 15px -8px rgba(0,0,0,0.08)'
      },
      spacing: {
        'section': '8rem',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
