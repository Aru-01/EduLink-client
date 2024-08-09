/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "gradient-x": {
          "0%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
          "100%": { "background-position": "0% 50%" },
        },
      },
      animation: {
        "gradient-x": "gradient-x 4s ease infinite",
      },
      fontFamily: {
        "inria-sans": ['"Inria Sans"', "sans-serif"],
        "inria-serif": ['"Inria Serif"', "serif"],
        lora: ["Lora", "serif"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["garden", "lofi", "cmyk"],
  },
};
