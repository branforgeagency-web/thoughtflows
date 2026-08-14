/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#eef3f8",
          100: "#d5e2ee",
          200: "#a9c4dd",
          300: "#7ba5cb",
          400: "#4d7fac",
          500: "#2c5c88",
          600: "#1e4569",
          700: "#153F6C",
          800: "#102c4d",
          900: "#0a1c31",
          950: "#050e19"
        },
        teal: {
          50: "#e6fbfc",
          100: "#c1f4f7",
          200: "#8ee8ee",
          300: "#54d6df",
          400: "#22bfca",
          500: "#16ADBA",
          600: "#0f8f9a",
          700: "#0B8995",
          800: "#0a5f68",
          900: "#083f46",
          950: "#04262b"
        },
        ink: {
          950: "#040e13",
          900: "#071820",
          800: "#0a222c"
        }
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        sans: ["'Inter'", "sans-serif"]
      },
      backgroundImage: {
        "grid-glow": "radial-gradient(circle at 50% 0%, rgba(22,173,186,0.12), transparent 60%)",
        "hero-gradient": "linear-gradient(180deg, #ffffff 0%, #f6fbfb 45%, #eef8f7 100%)",
        "card-sheen": "linear-gradient(135deg, rgba(22,173,186,0.12) 0%, rgba(21,63,108,0.06) 100%)"
      },
      boxShadow: {
        glow: "0 0 40px rgba(22,173,186,0.35)",
        "glow-lg": "0 0 80px rgba(22,173,186,0.25)",
        premium: "0 20px 60px -15px rgba(21,63,108,0.18)"
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        reveal: "reveal 0.9s cubic-bezier(0.16,1,0.3,1) forwards",
        "pulse-line": "dashMove 3.5s linear infinite",
        "kenburns": "kenburns 20s ease-in-out infinite alternate"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" }
        },
        pulseGlow: {
          "0%, 100%": { opacity: 0.5, transform: "scale(1)" },
          "50%": { opacity: 1, transform: "scale(1.05)" }
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        reveal: {
          "0%": { opacity: 0, transform: "translateY(40px)" },
          "100%": { opacity: 1, transform: "translateY(0)" }
        },
        dashMove: {
          "0%": { strokeDashoffset: "240" },
          "100%": { strokeDashoffset: "0" }
        },
        kenburns: {
          "0%": { transform: "scale(1) translate(0, 0)" },
          "100%": { transform: "scale(1.08) translate(-1%, -1%)" }
        }
      },
      backdropBlur: {
        xs: "2px"
      }
    }
  },
  plugins: []
};
