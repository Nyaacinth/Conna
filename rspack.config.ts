import { defineConfig } from "@rspack/cli"
import { rspack } from "@rspack/core"
import PreactRefreshPlugin from "@rspack/plugin-preact-refresh"
import { createRequire } from "node:module"
import path from "node:path"
import MacrosPlugin from "unplugin-macros/rspack"

// See: https://github.com/browserslist/browserslist
const targets = ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"]

const isDev = process.env.NODE_ENV === "development"

export default defineConfig({
    entry: {
        main: "./src/index.tsx"
    },
    output: {
        clean: true
    },
    experiments: {
        css: true
    },
    resolve: {
        extensions: [".js", ".ts", ".tsx", ".jsx"],
        alias: {
            ["react"]: "preact/compat",
            ["react-dom/test-utils"]: "preact/test-utils",
            ["react-dom"]: "preact/compat", // Must be below test-utils
            ["react/jsx-runtime"]: "preact/jsx-runtime"
        }
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif|svg|bmp|webp|ico|apng|avif|tif|tiff|jfif|pjpeg|pjp|cur)$/,
                type: "asset"
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac|opus|mov|m4a|vtt)$/,
                type: "asset"
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: "asset"
            },
            {
                test: /\.(pdf|txt)$/,
                type: "asset"
            },
            {
                resourceQuery: /raw/,
                type: "asset/source"
            },
            {
                test: /\.js$/,
                use: {
                    loader: "builtin:swc-loader",
                    options: {
                        jsc: {
                            parser: {
                                syntax: "ecmascript"
                            }
                        },
                        env: { targets, mode: "usage" },
                        isModule: "unknown"
                    }
                },
                type: "javascript/auto"
            },
            {
                test: /\.ts$/,
                use: {
                    loader: "builtin:swc-loader",
                    options: {
                        jsc: {
                            parser: {
                                syntax: "typescript"
                            }
                        },
                        env: { targets, mode: "usage" },
                        isModule: "unknown"
                    }
                },
                type: "javascript/auto"
            },
            {
                test: /\.jsx$/,
                use: {
                    loader: "builtin:swc-loader",
                    options: {
                        jsc: {
                            experimental: {
                                cacheRoot: path.join(import.meta.dirname, "node_modules", ".rspackcache", "swc"),
                                plugins: [["@swc/plugin-prefresh", {}]]
                            },
                            parser: {
                                syntax: "ecmascript",
                                jsx: true
                            },
                            transform: {
                                react: {
                                    runtime: "automatic",
                                    importSource: isDev ? "preact/compat" : "preact",
                                    development: isDev,
                                    refresh: isDev
                                }
                            }
                        },
                        env: { targets, mode: "usage" },
                        isModule: "unknown"
                    }
                },
                type: "javascript/auto"
            },
            {
                test: /\.tsx$/,
                use: {
                    loader: "builtin:swc-loader",
                    options: {
                        jsc: {
                            experimental: {
                                cacheRoot: path.join(import.meta.dirname, "node_modules", ".rspackcache", "swc"),
                                plugins: [["@swc/plugin-prefresh", {}]]
                            },
                            parser: {
                                syntax: "typescript",
                                tsx: true
                            },
                            transform: {
                                react: {
                                    runtime: "automatic",
                                    importSource: isDev ? "preact/compat" : "preact",
                                    development: isDev,
                                    refresh: isDev
                                }
                            }
                        },
                        env: { targets, mode: "usage" },
                        isModule: "unknown"
                    }
                },
                type: "javascript/auto"
            },
            {
                test: /\.css$/i,
                use: {
                    loader: "builtin:lightningcss-loader",
                    options: { targets }
                },
                type: "css/auto"
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: "builtin:lightningcss-loader",
                        options: { targets }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            api: "modern-compiler",
                            implementation: createRequire(import.meta.url).resolve("sass-embedded")
                        }
                    }
                ],
                type: "css/auto"
            }
        ],
        parser: {
            "css/auto": {
                namedExports: false
            }
        }
    },
    plugins: [
        MacrosPlugin(),
        new rspack.HtmlRspackPlugin({ template: "./index.html" }),
        new rspack.CssExtractRspackPlugin({}),
        isDev && new PreactRefreshPlugin({}),
        isDev && new rspack.HotModuleReplacementPlugin(),
        new rspack.CopyRspackPlugin({ patterns: [{ from: "public", noErrorOnMissing: true }] })
    ].filter(Boolean),
    optimization: {
        minimizer: [
            new rspack.SwcJsMinimizerRspackPlugin() && undefined,
            new rspack.LightningCssMinimizerRspackPlugin({
                minimizerOptions: { targets }
            })
        ]
    }
})
