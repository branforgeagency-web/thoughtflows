/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brandBg: "#F8FCFD",
        navy: {
          DEFAULT: "#063B7A",
          50: "#F0F6FC",
          100: "#E1EDF9",
          200: "#C2DCF3",
          300: "#92C1EB",
          400: "#529DE0",
          500: "#0B4F9C", // Brand Blue
          600: "#063B7A", // Primary Navy
          700: "#053064",
          800: "#04244B",
          900: "#031731",
          950: "#020C1B"
        },
        brandBlue: "#0B4F9C",
        brandCyan: "#12BFD1",
        softCyan: "#E7F9FB",
        teal: {
          50: "#E7F9FB",
          100: "#D0F3F7",
          200: "#A1E7F0",
          300: "#72DAE8",
          400: "#43CEE0",
          500: "#12BFD1", // Brand Cyan
          600: "#0EA2B2",
          700: "#0B808D",
          800: "#085C66",
          900: "#053C43",
          950: "#032428"
        },
        cyan: {
          DEFAULT: "#12BFD1",
          50: "#E7F9FB",
          100: "#D0F3F7",
          200: "#A1E7F0",
          300: "#43CEE0",
          500: "#12BFD1",
          600: "#0EA2B2",
          700: "#0B808D",
          800: "#085C66",
          900: "#053C43"
        },
        slateText: {
          main: "#243447",
          secondary: "#6B7C8F"
        }
      },
      fontFamily: {
        display: ["'Plus Jakarta Sans'", "'Space Grotesk'", "sans-serif"],
        sans: ["'Plus Jakarta Sans'", "'Inter'", "sans-serif"],
        nav: ["'Outfit'", "'Plus Jakarta Sans'", "sans-serif"],
        handwriting: ["'Caveat'", "cursive"]
      },
      backgroundImage: {
        "grid-glow": "radial-gradient(circle at 50% 0%, rgba(18,191,209,0.14), transparent 70%)",
        "grid-glow-light": "radial-gradient(circle at 50% 0%, rgba(18,191,209,0.14), transparent 70%)",
        "hero-gradient": "linear-gradient(180deg, #F8FCFD 0%, #FFFFFF 50%, #E7F9FB 100%)",
        "hero-light": "linear-gradient(180deg, #F8FCFD 0%, #FFFFFF 50%, #E7F9FB 100%)",
        "card-light": "linear-gradient(135deg, #FFFFFF 0%, #F8FCFD 100%)",
        "cta-gradient": "linear-gradient(135deg, #063B7A 0%, #0B4F9C 50%, #063B7A 100%)"
      },
      boxShadow: {
        "cyan-glow": "0 0 35px rgba(18,191,209,0.25)",
        "cyan-glow-lg": "0 0 70px rgba(18,191,209,0.35)",
        "card-light": "0 10px 30px -10px rgba(6,59,122,0.06)",
        "card-hover": "0 20px 45px -10px rgba(6,59,122,0.12)",
        "nav-light": "0 4px 20px -2px rgba(6,59,122,0.05)"
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        reveal: "reveal 0.9s cubic-bezier(0.16,1,0.3,1) forwards",
        "spin-slow": "spin 25s linear infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" }
        },
        pulseGlow: {
          "0%, 100%": { opacity: 0.5, transform: "scale(1)" },
          "50%": { opacity: 1, transform: "scale(1.04)" }
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        reveal: {
          "0%": { opacity: 0, transform: "translateY(30px)" },
          "100%": { opacity: 1, transform: "translateY(0)" }
        }
      }
    }
  },
  plugins: []
};

