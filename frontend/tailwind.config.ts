import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#070b14",
          surface: "#0e1526",
          card: "#131b2e",
          border: "#1e293b",
          highlight: "#1e2c4f",
          cyan: "#00f2fe",
          blue: "#4facfe",
          purple: "#7c3aed",
          emerald: "#10b981",
          amber: "#f59e0b",
          rose: "#ef4444",
          text: "#f8fafc",
          muted: "#94a3b8",
        },
      },
      backgroundImage: {
        "cyber-grid": "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      boxShadow: {
        "cyan-glow": "0 0 20px rgba(0, 242, 254, 0.25)",
        "purple-glow": "0 0 25px rgba(124, 58, 237, 0.25)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
    },
  },
  plugins: [],
};
export default config;
