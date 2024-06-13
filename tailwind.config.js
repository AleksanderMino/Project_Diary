/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pacifico: ["Pacifico", "cursive"],
        lobster: ["Lobster", "cursive"],
      },
      keyframes: {
        pulse: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        pulse: "pulse 0.5s ease-in-out",
        spin: "spin 1s linear infinite",
      },
      inset: {
        "3/4": "75%",
      },
      translate: {
        "3/4": "75%",
      },
    },
  },
  plugins: [],
};
