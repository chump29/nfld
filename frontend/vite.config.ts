import react from "@vitejs/plugin-react"
import version from "vite-plugin-package-version"
import simpleHtml from "vite-plugin-simple-html"
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [
    react(),
    simpleHtml({
      inject: {
        data: {
          title: "NFLd"
        }
      },
      minify: true
    }),
    version()
  ],
  test: {
    environment: "jsdom",
    globals: true,
    include: ["./src/**/*.test.tsx"],
    reporters: [["verbose", { summary: true }]],
    setupFiles: "./src/setup.ts",
    silent: true
  }
})
