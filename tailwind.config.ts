import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1a1d1b",
        paper: "#f5f0e8",
        sand: "#d9cfbd",
        line: "#b7ac96",
        navy: "#0f2438",
        bronze: "#8f6b3d"
      },
      boxShadow: {
        soft: "0 20px 60px rgba(15, 36, 56, 0.12)"
      },
      backgroundImage: {
        grain:
          "radial-gradient(circle at top, rgba(255,255,255,0.5), transparent 42%), linear-gradient(135deg, rgba(143,107,61,0.08), rgba(15,36,56,0.08))"
      }
    }
  },
  plugins: []
};

export default config;
