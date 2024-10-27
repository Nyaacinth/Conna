import svelte from "prettier-plugin-svelte"

/** @type {import("prettier").Config} */
export default {
    printWidth: 120,
    tabWidth: 4,
    useTabs: false,
    semi: false,
    singleQuote: false,
    quoteProps: "as-needed",
    trailingComma: "none",
    bracketSpacing: true,
    bracketSameLine: false,
    arrowParens: "always",
    htmlWhitespaceSensitivity: "ignore",
    endOfLine: "lf",
    embeddedLanguageFormatting: "auto",
    singleAttributePerLine: false,
    plugins: [svelte],
    overrides: [
        {
            files: "*.svelte",
            options: {
                parser: "svelte"
            }
        }
    ]
}
