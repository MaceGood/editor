module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: "640px",
      sm2: "410px",
      sm3: "530px",
      sm4: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "1xl": "1330px",
      "2xl": "1536px",
    },
    fontFamily: {
      sans: ["Poppins", "Roboto", "ui-sans-serif", "system-ui"],
    },
    boxShadow: {
      DEFAULT: "0px 4px 20px 4px rgba(0, 0, 0, 0.25)",
      mt: "0px 4px 20px 4px rgba(66, 133, 244, 0.3)",
    },
    extend: {
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "translateY(-10%)" },
        },
      },
      animation: {
        bounce: "bounce 5s infinite",
      },
      width: {
        "5/12": "44.8571429%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
