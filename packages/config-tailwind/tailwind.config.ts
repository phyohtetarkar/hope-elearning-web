import { nextui } from "@nextui-org/theme";
import aspectRatio from "@tailwindcss/aspect-ratio";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";
import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
  darkMode: ["class"],
  corePlugins: {
    aspectRatio: false,
  },
  theme: {
    fontFamily: {
      sans: ["Inter", ...defaultTheme.fontFamily.sans],
    },
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      borderColor: {
        DEFAULT: "hsl(var(--border))",
      },
      colors: {
        transparent: "transparent",
        success: {
          foreground: "#ffffff",
          DEFAULT: "#00a524",
        },
        warning: {
          foreground: "#ffffff",
          DEFAULT: "#ff9017",
        },
        danger: {
          foreground: "#ffffff",
          DEFAULT: "#d50002",
        },
        black: colors.black,
        white: colors.white,
        gray: colors.gray,
        anchor: "#2110D6",
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        default: {
          DEFAULT: "hsl(var(--default))",
          foreground: "hsl(var(--default-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    typography(),
    forms(),
    aspectRatio,
    tailwindAnimate,
    nextui({
      layout: {
        radius: {
          large: "var(--radius)",
          medium: "calc(var(--radius) - 2px)",
          small: "calc(var(--radius) - 4px)",
        },
      },
    }),
  ],
} satisfies Partial<Config>;

export default config;
