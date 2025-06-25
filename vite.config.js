import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from '@tailwindcss/vite'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: "0.0.0.0", // Permite acesso externo (caso rode em Docker ou outro IP)
    port: 5173,
    strictPort: true, // Garante que use a porta 5173
    proxy: {
      "/api": {
        target: "http://192.168.16.82:3000",
        //target: "http://192.168.16.13:3000",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace("/api", ""),
      },
      "/ft/": {
        target: "http://192.168.16.82:3007",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
