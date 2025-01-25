import typescriptPlugin from "@typescript-eslint/eslint-plugin"
import typescriptParser from "@typescript-eslint/parser"
import reactPlugin from "eslint-plugin-react"
import reactHooksPlugin from "eslint-plugin-react-hooks"

/** @type {import("eslint").Linter.Config[]} */
export default [
    {
        ignores: ["dist/**/*", "node_modules/**/*", "src-tauri/**/*"]
    },
    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                }
            }
        },
        plugins: {
            ["@typescript-eslint"]: typescriptPlugin,
            ["react"]: reactPlugin,
            ["react-hooks"]: reactHooksPlugin
        },
        settings: {
            react: {
                version: "16.0"
            }
        },
        rules: {
            "@typescript-eslint/adjacent-overload-signatures": "warn",
            "@typescript-eslint/consistent-type-imports": "warn",
            "@typescript-eslint/no-extra-non-null-assertion": "warn",
            "@typescript-eslint/no-inferrable-types": "warn",
            "@typescript-eslint/no-loss-of-precision": "warn",
            "@typescript-eslint/no-misused-new": "warn",
            "@typescript-eslint/no-this-alias": "warn",
            "@typescript-eslint/prefer-as-const": "warn",
            "@typescript-eslint/prefer-namespace-keyword": "warn",
            "react/display-name": "warn",
            "react/jsx-key": "warn",
            "react/jsx-no-comment-textnodes": "warn",
            "react/jsx-no-target-blank": "warn",
            "react/no-children-prop": "warn",
            "react/no-danger-with-children": "warn",
            "react/no-deprecated": "warn",
            "react/no-direct-mutation-state": "warn",
            "react/no-find-dom-node": "warn",
            "react/no-is-mounted": "warn",
            "react/no-render-return-value": "warn",
            "react/no-string-refs": "warn",
            "react/no-unescaped-entities": "warn",
            "react/no-unsafe": "warn",
            "react-hooks/rules-of-hooks": "warn",
            "react-hooks/exhaustive-deps": "warn"
        }
    }
]
