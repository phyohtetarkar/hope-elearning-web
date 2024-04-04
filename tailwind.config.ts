import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";
import { nextui } from "@nextui-org/theme";

const config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    // "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(card|navbar|pagination|link|modal|dropdown|listbox).js",
  ],
  prefix: "",
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
        sliver: colors.gray[400],
        
        // muted: colors.slate["400"],
        // border: "hsl(var(--border))",
        // input: "hsl(var(--input))",
        // ring: "hsl(var(--ring))",
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
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
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
} satisfies Config;

export default config;
