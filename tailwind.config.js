/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark1: "#121221",
        dark2: "#444444",
        dark3: "#6C6C6C",
        dark4: "#949494",
        white1: "#FDFDFD",
        white2: "#F8F8F8",
      },
    },
  },
  plugins: [],
};
