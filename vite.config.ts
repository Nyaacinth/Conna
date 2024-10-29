import { sveltekit } from "@sveltejs/kit/vite"
import unocss from "@unocss/svelte-scoped/vite"
import transformerDirectives from "@unocss/transformer-directives"
import { browserslistToTargets } from "lightningcss"
import { defineConfig } from "vite"

export default defineConfig({
    css: {
        transformer: "lightningcss",
        lightningcss: {
            targets: browserslistToTargets(["edge 88", "firefox 78", "chrome 87", "safari 14"])
        }
    },
    build: {
        target: ["es2020", "edge88", "firefox78", "chrome87", "safari14"],
        cssMinify: "lightningcss"
    },
    plugins: [
        unocss({
            injectReset: "@unocss/reset/tailwind-compat.css",
            cssFileTransformers: [transformerDirectives()]
        }),
        sveltekit()
    ]
})
