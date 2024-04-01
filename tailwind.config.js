import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";
import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Inter", ...defaultTheme.fontFamily.sans],
    },
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      colors: {
        transparent: "transparent",
        // primary: colors.indigo[500],
        // success: "#00a524",
        // warning: "#ff9017",
        // danger: "#d50002",
        black: colors.black,
        white: colors.white,
        gray: colors.slate,
        anchor: "#2110D6",
        muted: colors.slate["400"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    nextui({
      layout: {
        radius: {
          small: "2px", // rounded-small
          medium: "4px", // rounded-medium
          large: "6px", // rounded-large
        },
        // borderWidth: {
        //   small: "1px", // border-small
        //   medium: "1px", // border-medium
        //   large: "2px", // border-large
        // },
      },
      themes: {
        light: {
          colors: {
            primary: {
              ...colors.indigo,
              foreground: "#FFFFFF",
              DEFAULT: colors.indigo[600],
            },
            secondary: {
              foreground: "#222",
              DEFAULT: "#F9A826",
            },
            success: {
              foreground: "#FFFFFF",
              DEFAULT: "#00a524",
            },
            danger: {
              foreground: "#FFFFFF",
              DEFAULT: "#d50002",
            },
            warning: {
              foreground: "#FFFFFF",
              DEFAULT: "#ff9017",
            },
          },
        },
        dark: {
          colors: {
            primary: {
              ...colors.indigo,
              foreground: "#FFFFFF",
              DEFAULT: colors.indigo[600],
            },
            secondary: {
              foreground: "#222",
              DEFAULT: "#F9A826",
            },
            success: {
              foreground: "#FFFFFF",
              DEFAULT: "#00a524",
            },
            danger: {
              foreground: "#FFFFFF",
              DEFAULT: "#d50002",
            },
            warning: {
              foreground: "#FFFFFF",
              DEFAULT: "#ff9017",
            },
          },
        },
      },
    }),
  ],
};

export default config;
