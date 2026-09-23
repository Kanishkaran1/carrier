import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Served from the domain root (Vercel + custom domain).
  // Was "/carrier/" for GitHub Pages project-site hosting — see DEPLOYMENT.md
  // before changing: the router basename in src/App.tsx is derived from this.
  base: "/",
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          motion: ["framer-motion"],
          forms: [
            "react-hook-form",
            "@hookform/resolvers",
            "zod",
            "@emailjs/browser",
          ],
        },
      },
    },
  },
}));
