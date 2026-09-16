/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F7F2E2",
        ink: "#111111",
        lime: "#B6FF3C",
        coral: "#FF5A36",
        violet: "#6A2BFF",
        cyan: "#3FE0D0",
      },
      fontFamily: {
        display: ["'Archivo Black'", "Poppins", "system-ui", "sans-serif"],
        body: ["Poppins", "system-ui", "sans-serif"],
      },
      boxShadow: {
        hard: "5px 5px 0 #111111",
        "hard-sm": "3px 3px 0 #111111",
        "hard-lg": "8px 8px 0 #111111",
        "hard-lime": "5px 5px 0 #111111",
      },
      borderRadius: {
        toeddro: "28px",
        pill: "999px",
      },
      borderWidth: {
        3: "3px",
      },
    },
  },
  plugins: [],
};
