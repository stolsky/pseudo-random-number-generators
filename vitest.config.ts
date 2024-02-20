import { defineConfig } from "vitest/config"

export default defineConfig({
    test: {
        coverage: {
            all: true,
            include: ["src/**/*.ts"],
            provider: "v8",
            reporter: ["text", "json", "html"]
        }
    }
})
