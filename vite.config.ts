import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  base: "/Portfolio/",
  build: {
    rollupOptions: {
      input: {
        portfolio: "index.html",
        engineering: "engineering.html",
      },
    },
  },
});
