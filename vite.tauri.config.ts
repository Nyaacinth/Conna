import tauri from "vite-plugin-tauri"
import baseViteConfig from "./vite.config"

import { defineConfig, mergeConfig } from "vite"

export default mergeConfig(
    baseViteConfig,
    defineConfig({
        plugins: [tauri()]
    })
)
