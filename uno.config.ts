import presetWind3 from "@unocss/preset-wind3"
import transformerVariantGroup from "@unocss/transformer-variant-group"

import { defineConfig } from "unocss"

export default defineConfig({
    presets: [presetWind3()],
    transformers: [transformerVariantGroup()]
})
