import react from "@vitejs/plugin-react"
import { ViteImageOptimizer } from "vite-plugin-image-optimizer"
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [react(), ViteImageOptimizer()],
  test: {
    environment: "jsdom",
    globals: true,
    include: ["./src/**/*.test.tsx"],
    reporters: [["verbose", { summary: true }]],
    setupFiles: "./src/setup.ts",
    silent: true
  }
})
