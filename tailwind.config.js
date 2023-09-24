/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    fontFamily: {
      sans: [
        "Inter",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica",
        "Arial",
        "sans-serif",
      ],
      mono: ["Menlo", "Monaco", "Courier New", "monospace"],
    },
    extend: {
      colors: {
        black: "var(--black)",
        gray: "var(--gray)",
        white: "var(--white)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        "hover-color": "var(--hover-color)",
        "border-light": "var(--border-light)",
      },
      fontSize: {
        xs: ["12px", "18px"],
      },
      keyframes: {
        "slide-in": {
          from: { opacity: 0, transform: "translateY(20px)" },
          to: { opacity: 1, transform: "translateY(0px)" },
        },
        "slide-in-top": {
          from: { opacity: 0, transform: "translateY(-20px)" },
          to: { opacity: 0, transform: "translateY(0px)" },
        },
      },
      animation: {
        "slide-in": "slide-in ease 0.5sec",
        "slide-in-top": "slide-in-top ease 0.5sec",
      },
    },
  },
  plugins: [],
};
