import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1152px", // MDS Standard container max-width
        xl: "1440px", // MDS Wide container max-width
      },
    },
    extend: {
      colors: {
        brand: {
          primary: "var(--brand-canvas-primary)",
          secondary: "var(--brand-canvas-secondary)",
          elevated: "var(--brand-canvas-elevated)",
          gold: "var(--brand-accent-gold)",
          "gold-hover": "var(--brand-accent-gold-hover)",
          "gold-muted": "var(--brand-accent-gold-muted)",
          "gold-glow": "var(--brand-accent-gold-glow)",
          glass: "var(--brand-surface-glass)",
          "glass-border": "var(--brand-surface-glass-border)",
          "glass-hover": "var(--brand-surface-glass-hover)",
          text: {
            primary: "var(--brand-text-primary)",
            secondary: "var(--brand-text-secondary)",
            muted: "var(--brand-text-muted)",
          },
          success: "var(--brand-success)",
          warning: "var(--brand-warning)",
          error: "var(--brand-error)",
        },
      },
      fontFamily: {
        tajawal: ["var(--font-tajawal)", "sans-serif"],
        outfit: ["var(--font-outfit)", "sans-serif"],
        jakarta: ["var(--font-jakarta)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        "gold-subtle": "0 0 20px -5px rgba(197, 160, 89, 0.25)",
        "gold-glow": "0 0 35px -5px rgba(197, 160, 89, 0.40)",
        "glass-elevated": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
