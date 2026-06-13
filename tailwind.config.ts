import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        md: "2rem",
        lg: "3rem"
      },
      screens: {
        "2xl": "1180px"
      }
    },
    extend: {
      colors: {
        bg: "#FFFFFF",
        "bg-warm": "#FBF6F0",
        peach: "#FAE9D6",
        blush: "#FDE2D9",
        cream: "#F7F2EA",
        hairline: "#EAE6E0",
        "hairline-strong": "#DBD5CB",
        ink: {
          DEFAULT: "#15131A",
          soft: "#2A2630"
        },
        muted: "#6B6770",
        faint: "#9A9499",
        ember: {
          1: "#F77E5C",
          2: "#E5413B",
          deep: "#C72A3A"
        },
        rose: {
          DEFAULT: "#F08FB1",
          deep: "#D45A82"
        },
        dark: {
          DEFAULT: "#000000",
          soft: "#000000",
          edge: "#1F1B24",
          text: "#F4F1EC",
          muted: "#9A9499"
        },
        tone: {
          care: "#7BCB87",
          flow: "#F08FB1",
          reach: "#F4A85E"
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
        gilroy: ["var(--font-gilroy)", "var(--font-sans)", "system-ui", "sans-serif"],
        anton: ["var(--font-anton)", "Impact", "sans-serif"],
        pixel: ["var(--font-pixel)", "Courier New", "monospace"]
      },
      letterSpacing: {
        snug: "-0.02em",
        tight2: "-0.03em"
      },
      borderRadius: {
        sm2: "0.625rem",
        xl2: "1.25rem",
        "3xl": "1.5rem",
        "4xl": "1.75rem",
        "5xl": "2rem"
      },
      boxShadow: {
        soft: "0 1px 0 rgba(15,17,21,0.04)",
        nav: "0 1px 0 rgba(15,17,21,0.04), 0 4px 24px rgba(15,17,21,0.06)",
        lift: "0 12px 36px rgba(15,17,21,0.10)"
      },
      backgroundImage: {
        "grad-ember":
          "linear-gradient(135deg, #F77E5C 0%, #E5413B 60%, #C72A3A 100%)",
        "grad-blush":
          "linear-gradient(135deg, #FDE2D9 0%, #F8C7BC 50%, #F4A8AD 100%)",
        "grad-peach":
          "radial-gradient(120% 80% at 50% 0%, #FAE9D6 0%, #F4D2B3 60%, #E9B391 100%)",
        "grad-cream": "linear-gradient(180deg, #FBF6F0 0%, #F4ECDF 100%)",
        "grad-dark":
          "linear-gradient(135deg, #1A1720 0%, #0F0D12 70%, #07060A 100%)",
        "grad-aurora":
          "radial-gradient(60% 60% at 18% 78%, #FF5A23 0%, transparent 60%), radial-gradient(55% 60% at 78% 70%, #F0392F 0%, transparent 65%), radial-gradient(50% 50% at 70% 22%, #C84BAC 0%, transparent 65%), radial-gradient(35% 35% at 22% 18%, #FF8B4A 0%, transparent 60%), radial-gradient(40% 40% at 60% 45%, #8B6FE0 0%, transparent 55%), linear-gradient(135deg, #FF5A23 0%, #E73779 55%, #B23BD0 100%)"
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)"
      },
      keyframes: {
        "dot-pulse": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "1" }
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        }
      },
      animation: {
        "dot-pulse": "dot-pulse 3s cubic-bezier(0.22,1,0.36,1) infinite",
        marquee: "marquee 28s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
