/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        /* ─────────────────────────────
         * CORES PRINCIPAIS
         * ───────────────────────────── */
        primary: {
          DEFAULT: "#80bdff",
          hover: "#6fb3f0",
          foreground: "#ffffff",
          muted: "#e6f4ff",
        },

        secondary: {
          DEFAULT: "#d6eadf",
          hover: "#c2d9cc",
          foreground: "#3f5f5f",
          muted: "#eef6f1",
        },

        /* ─────────────────────────────
         * CONTEXTO / BACKGROUND
         * ───────────────────────────── */
        background: {
          DEFAULT: "#fcfcfa",
          muted: { DEFAULT: "#efefec", hover: "#dfdfdc" },
          card: "#ffffff",
        },

        surface: {
          DEFAULT: "#ffffff",
          muted: "#f5f5f5",
        },

        /* ─────────────────────────────
         * TEXTO
         * ───────────────────────────── */
        text: {
          DEFAULT: "#4a4a4a",
          muted: "#7a7a7a",
          subtle: "#9a9a9a",
          inverse: "#ffffff",
        },

        /* ─────────────────────────────
         * FEEDBACK / STATUS
         * ───────────────────────────── */
        success: {
          DEFAULT: "oklch(52.7% 0.154 150.069)",
          hover: "#bfd8b8",
          foreground: "#ffffff",
          soft: "#dcfce7",
        },

        danger: {
          DEFAULT: "oklch(63.7% 0.237 25.331)",
          hover: "oklch(70.4% 0.191 22.216)",
          foreground: "#ffffff",
          soft: "#fee2e2",
        },

        warning: {
          DEFAULT: "oklch(68.1% 0.162 75.834)",
          hover: "oklch(79.5% 0.184 86.047)",
          soft: "#fef3c7",
        },

        info: {
          DEFAULT: "oklch(62.3% 0.214 259.815)",
          hover: "oklch(54.6% 0.245 262.881)",
          soft: "#dbeafe",
        },

        /* ─────────────────────────────
         * STATUS DE NEGÓCIO (AGENDAMENTO)
         * ───────────────────────────── */
        status: {
          solicitado: "#dbeafe",
          confirmado: "#dcfce7",
          cancelado: "#fee2e2",
          concluido: "#e0e7ff",
        },

        /* ─────────────────────────────
         * BORDAS
         * ───────────────────────────── */
        border: {
          DEFAULT: "#e5e7eb",
          muted: "#f0f0f0",
        },
      },

      /* ─────────────────────────────
       * TIPOGRAFIA
       * ───────────────────────────── */
      fontSize: {
        xs: ["0.75rem", "1rem"],
        sm: ["0.875rem", "1.25rem"],
        base: ["1rem", "1.5rem"],
        lg: ["1.125rem", "1.75rem"],
        xl: ["1.25rem", "1.75rem"],
        "2xl": ["1.5rem", "2rem"],
      },

      /* ─────────────────────────────
       * SOMBRAS (discretas)
       * ───────────────────────────── */
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.08)",
        soft: "0 1px 2px rgba(0,0,0,0.04)",
      },

      /* ─────────────────────────────
       * BORDAS ARREDONDADAS
       * ───────────────────────────── */
      borderRadius: {
        sm: "0.375rem",
        DEFAULT: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
      },

      /* ─────────────────────────────
       * ANIMAÇÕES (opcional)
       * ───────────────────────────── */
      keyframes: {
        jump: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
      },

      animation: {
        jump: "jump 0.5s ease-in-out",
      },
    },
  },

  plugins: [],
};
