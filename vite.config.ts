import { sveltekit } from "@sveltejs/kit/vite"
import unocss from "@unocss/svelte-scoped/vite"
import transformerDirectives from "@unocss/transformer-directives"
import { defineConfig } from "vite"

export default defineConfig({
    plugins: [
        unocss({
            injectReset: "@unocss/reset/tailwind-compat.css",
            cssFileTransformers: [transformerDirectives()]
        }),
        sveltekit()
    ]
})
