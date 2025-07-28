import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // request that starts with "/api" to your backend server
      "/api": {
        target: "http://localhost:9001", // Your backend server address
        changeOrigin: true,
      },
    },
  },
});
