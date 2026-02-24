import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Firebase SDK — shared between auth pages and admin
          firebase: ["firebase/app", "firebase/auth", "firebase/firestore"],
          // Admin-only heavy deps (only loaded when visiting /admin)
          charts: ["recharts"],
          // Animation library — used on public pages AND admin
          motion: ["framer-motion"],
          // React + React DOM core
          vendor: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
    // Raise warning threshold; we accept the split chunks
    chunkSizeWarningLimit: 600,
  },
}));
