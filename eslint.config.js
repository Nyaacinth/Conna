import typescriptPlugin from "@typescript-eslint/eslint-plugin"
import typescriptParser from "@typescript-eslint/parser"
import sveltePlugin from "eslint-plugin-svelte"
import svelteParser from "svelte-eslint-parser"

/** @type {import("eslint").Linter.Config[]} */
export default [
    {
        ignores: ["build/**/*", "node_modules/**/*", ".svelte-kit/**/*"]
    },
    {
        files: ["**/*.ts", "**/*.svelte"],
        languageOptions: {
            parser: svelteParser,
            parserOptions: {
                parser: typescriptParser
            }
        },
        processor: "svelte/svelte",
        plugins: {
            ["@typescript-eslint"]: typescriptPlugin,
            ["svelte"]: sveltePlugin
        },
        rules: {
            "no-self-assign": "off",
            "no-inner-declarations": "off",
            "@typescript-eslint/adjacent-overload-signatures": "warn",
            "@typescript-eslint/consistent-type-imports": "error",
            "@typescript-eslint/no-extra-non-null-assertion": "warn",
            "@typescript-eslint/no-inferrable-types": "warn",
            "@typescript-eslint/no-loss-of-precision": "warn",
            "@typescript-eslint/no-misused-new": "warn",
            "@typescript-eslint/no-this-alias": "warn",
            "@typescript-eslint/prefer-as-const": "warn",
            "@typescript-eslint/prefer-namespace-keyword": "warn",
            "svelte/comment-directive": "error",
            "svelte/system": "error",
            "svelte/no-at-debug-tags": "warn",
            "svelte/no-at-html-tags": "error",
            "svelte/no-dupe-else-if-blocks": "error",
            "svelte/no-dupe-style-properties": "error",
            "svelte/no-dynamic-slot-name": "error",
            "svelte/no-inner-declarations": "error",
            "svelte/no-not-function-handler": "error",
            "svelte/no-object-in-text-mustaches": "error",
            "svelte/no-shorthand-style-property-overrides": "error",
            "svelte/no-unknown-style-directive-property": "error",
            "svelte/no-unused-svelte-ignore": "error",
            "svelte/valid-compile": "error"
        }
    }
]
