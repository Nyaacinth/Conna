import presetWind from "@unocss/preset-wind"
import transformerVariantGroup from "@unocss/transformer-variant-group"

import { defineConfig } from "unocss"

export default defineConfig({
    presets: [presetWind()],
    transformers: [transformerVariantGroup()]
})
