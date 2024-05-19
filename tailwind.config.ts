import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";
import containerQueries from "@tailwindcss/container-queries";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        xsPlus: "13px",
        smPlus: "14px",
      },
      textColor: {
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        tertiary: "var(--text-tertiary)",
        weak: "var(--text-weak)",
        muted: "var(--text-muted)",
        inverted: {
          primary: "var(--text-inverted-primary)",
          muted: "var(--text-inverted-muted)",
        },
        accent: {
          primary: "var(--text-accent-primary)",
        },
        danger: {
          primary: "var(--text-danger-primary)",
        },
        warning: {
          primary: "var(--text-warning-primary)",
        },
        interactive: {
          hover: "var(--text-interactive-hover)",
        },
        special: {
          primary: "var(--text-special-primary)",
        },
        button: {
          primary: "var(--text-button-primary)",
          secondary: "var(--text-button-secondary)",
          accent: "var(--text-button-accent)",
          ghost: "var(--text-button-ghost)",
        },
      },
      borderColor: {
        primary: "var(--stroke-primary)",
        secondary: "var(--stroke-secondary)",
        accent: "var(--stroke-accent)",
        extras: {
          code: "var(--stroke-extras-code)",
        },
      },
      backgroundImage: {
        "button-primary": "var(--bg-button-primary)",
        "button-accent": "var(--bg-button-accent)",
      },
      backgroundColor: {
        surface: {
          primary: "var(--bg-surface-primary)",
          secondary: "var(--bg-surface-secondary)",
          tertiary: "var(--bg-surface-tertiary)",
        },
        overlay: "var(--bg-overlay)",
        special: {
          secondary: "var(--bg-special-secondary)",
        },
        accent: {
          primary: "var(--bg-accent-primary)",
          secondary: "var(--bg-accent-secondary)",
        },
        popover: "var(--bg-popover)",
        button: {
          secondary: "var(--bg-button-secondary)",
          "secondary-hover": "var(--bg-button-secondary-hover)",
        },
        interactive: {
          checked: "var(--bg-interactive-checked)",
          hover: "var(--bg-interactive-hover)",
          "hover-secondary": "var(--bg-interactive-hover-secondary)",
        },
        extras: {
          code: "var(--bg-extras-code)",
        },
      },
      ringColor: {
        focus: "rgb(37 99 235 / 12%)",
      },
      colors: {
        olive: {
          50: "rgb(var(--color-olive-50) / <alpha-value>)",
          100: "rgb(var(--color-olive-100) / <alpha-value>)",
          200: "rgb(var(--color-olive-200) / <alpha-value>)",
          300: "rgb(var(--color-olive-300) / <alpha-value>)",
          400: "rgb(var(--color-olive-400) / <alpha-value>)",
          450: "rgb(var(--color-olive-450) / <alpha-value>)",
          500: "rgb(var(--color-olive-500) / <alpha-value>)",
          600: "rgb(var(--color-olive-600) / <alpha-value>)",
          700: "rgb(var(--color-olive-700) / <alpha-value>)",
          800: "rgb(var(--color-olive-800) / <alpha-value>)",
          900: "rgb(var(--color-olive-900) / <alpha-value>)",
          950: "rgb(var(--color-olive-950) / <alpha-value>)",
        },
      },
      keyframes: {
        "collapsible-down": {
          from: { height: "0" },
          to: { height: "var(--radix-collapsible-content-height)" },
        },
        "collapsible-up": {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "collapsible-down": "collapsible-down 0.2s ease-out",
        "collapsible-up": "collapsible-up 0.2s ease-out",
      },
      boxShadow: {
        "button-primary": "var(--effect-button-primary)",
        "button-accent": "var(--effect-button-accent)",
        "button-secondary": "var(--effect-button-secondary)",
        popover: "var(--effect-popover)",
        "chat-input": "var(--effect-chat-input)",
      },
    },
  },
  plugins: [tailwindAnimate, containerQueries],
};
export default config;
