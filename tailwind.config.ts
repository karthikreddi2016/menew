import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2952E1",
          light: "#EAEFFF",
        },
        accent: {
          pink: "#F793C8",
          orange: "#FFAE45",
          "orange-light": "#FFEFDB",
        },
        gray: {
          bg: "#F8F8F8",
          border: "#E4DADA",
          "border-light": "#E3E3E3",
          "border-dark": "#D9D9D9",
        },
        text: {
          primary: "#000000",
          secondary: "#2C2C2C",
          dark: "#191919",
        },
      },
      fontFamily: {
        serif: ["var(--font-source-serif)", "serif"],
        sans: ["var(--font-roboto)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        "ibm-plex": ["var(--font-ibm-plex)", "sans-serif"],
      },
      maxWidth: {
        container: "1300px",
      },
      borderRadius: {
        button: "31px",
        card: "12px",
        input: "8px",
        tag: "4px",
      },
      spacing: {
        "page-x": "70px",
      },
    },
  },
  plugins: [],
};

export default config;
