module.exports = {
  mode: 'jit',
  content: ["./index.html", "./src/**/*.{html,vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        '5xl': '3.052rem',
      },
    },
  },
  plugins: [],
};
