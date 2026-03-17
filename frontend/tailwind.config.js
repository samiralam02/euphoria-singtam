/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        night: {
          950: "#080808",
          900: "#0f0f0f",
          800: "#171717",
          700: "#1f1f1f",
          600: "#2a2a2a",
          500: "#333333",
        },
        amber: {
          50:  "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
        },
        fire: {
          400: "#ff9f1c",
          500: "#ff7d06",
          600: "#e06c00",
        },
        lemon: {
          300: "#faf98b",
          400: "#f5f067",
        },
      },
      fontFamily: {
        display: ["'Playfair Display'", "Georgia", "serif"],
        sans:    ["'DM Sans'", "system-ui", "sans-serif"],
        mono:    ["'JetBrains Mono'", "monospace"],
      },
      animation: {
        "fade-up":   "fadeUp 0.7s ease-out forwards",
        "fade-in":   "fadeIn 0.5s ease-out forwards",
        "float":     "float 6s ease-in-out infinite",
        "glow-pulse":"glowPulse 3s ease-in-out infinite",
        "shimmer":   "shimmer 3s linear infinite",
      },
      keyframes: {
        fadeUp:    { "0%": { opacity:"0", transform:"translateY(20px)" }, "100%": { opacity:"1", transform:"translateY(0)" } },
        fadeIn:    { "0%": { opacity:"0" }, "100%": { opacity:"1" } },
        float:     { "0%,100%": { transform:"translateY(0)" }, "50%": { transform:"translateY(-10px)" } },
        glowPulse: { "0%,100%": { boxShadow:"0 0 20px rgba(255,125,6,0.3)" }, "50%": { boxShadow:"0 0 50px rgba(255,125,6,0.6), 0 0 100px rgba(250,249,139,0.15)" } },
        shimmer:   { "0%":{ backgroundPosition:"-200% center" }, "100%":{ backgroundPosition:"200% center" } },
      },
    },
  },
  plugins: [],
};
