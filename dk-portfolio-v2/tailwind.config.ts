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
        background: "#030712", // Deep midnight instead of flat black
        surface: "#0A0F1A", // Subtle elevation
        "surface-2": "#111827",
        foreground: "#F8FAFC",
        muted: "#94A3B8",
        primary: "#00E5FF", // Electric Cyan
        "primary-glow": "rgba(0, 229, 255, 0.15)",
        secondary: "#8B5CF6", // Amethyst
        accent: "#10B981", // Matrix Green (refined)
        border: "rgba(255, 255, 255, 0.08)",
        "border-light": "rgba(255, 255, 255, 0.15)",
        "border-glow": "rgba(0, 229, 255, 0.3)",
      },
      fontFamily: {
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "float-medium": "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "border-beam": "borderBeam 4s linear infinite",
        "text-shimmer": "textShimmer 2.5s linear infinite",
        "blob-spin": "blobSpin 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.5", filter: "blur(20px)" },
          "50%": { opacity: "0.8", filter: "blur(30px)" },
        },
        borderBeam: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        textShimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        blobSpin: {
          "0%": { transform: "rotate(0deg) scale(1)" },
          "33%": { transform: "rotate(120deg) scale(1.1)" },
          "66%": { transform: "rotate(240deg) scale(0.9)" },
          "100%": { transform: "rotate(360deg) scale(1)" },
        },
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
        "grid-pattern-primary": "linear-gradient(to right, rgba(0,229,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,229,255,0.03) 1px, transparent 1px)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
