import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          black: "#2c2c2c",
          dark: "#3a3a3a",
          medium: "#5c5c5c",
          light: "#8a8a7a"
        },
        paper: {
          cream: "#f5f0e8",
          warm: "#ede4d3",
          light: "#faf7f0"
        },
        vermillion: {
          DEFAULT: "#c23a2b",
          light: "#d4594c"
        },
        gold: {
          ancient: "#b8860b",
          light: "#d4a843"
        },
        jade: {
          green: "#2e8b57"
        },
        plum: {
          purple: "#6b3a5d"
        }
      },
      fontFamily: {
        brand: ["var(--font-brand)"],
        nav: ["var(--font-nav)"],
        body: ["var(--font-body)"],
        sub: ["var(--font-sub)"]
      },
      keyframes: {
        inkFade: {
          "0%": { opacity: "0", transform: "translateY(-10px) scaleY(0.3)", filter: "blur(2px)" },
          "60%": { opacity: "1", transform: "translateY(2px) scaleY(1.05)", filter: "blur(0)" },
          "100%": { opacity: "1", transform: "translateY(0) scaleY(1)", filter: "blur(0)" }
        },
        inkFloat: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" }
        },
        sealStamp: {
          "0%": { opacity: "0", transform: "scale(2) rotate(-20deg)" },
          "60%": { transform: "scale(0.9) rotate(3deg)" },
          "100%": { opacity: "1", transform: "scale(1) rotate(-5deg)" }
        },
        fadeSlideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        "ink-fade": "inkFade 0.8s ease-out both",
        "ink-float": "inkFloat 1.5s ease-in-out infinite",
        "seal-stamp": "sealStamp 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) both",
        "fade-slide-up": "fadeSlideUp 0.8s ease-out both"
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
};

export default config;
