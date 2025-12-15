import yearPlugin from "@8hobbies/vite-plugin-year"
import react from "@vitejs/plugin-react"
import { ViteImageOptimizer } from "vite-plugin-image-optimizer"
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [react(), ViteImageOptimizer(), yearPlugin()],
  test: {
    environment: "jsdom",
    globals: true,
    include: ["./src/**/*.test.tsx"],
    reporters: [["verbose", { summary: true }]],
    setupFiles: "./src/setup.ts",
    silent: true
  }
})
