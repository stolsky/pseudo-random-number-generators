import { defineConfig } from "vite"
import dts from "vite-plugin-dts"
import { resolve } from "path"

export default defineConfig({
    build: {
        copyPublicDir: false,
        lib: {
            entry: resolve(__dirname, "lib/index.ts"),
            name: "prng",
            fileName: "pnrg"
        },
        target: "esnext"
    },
    plugins: [
        dts({ include: ["lib"] })
    ],
    test: {
        coverage: {
            all: true,
            include: ["src/**/*.ts"],
            provider: "v8",
            reporter: ["text", "json", "html"]
        }
    }
})
