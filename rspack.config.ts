import { defineConfig } from "@rspack/cli"
import { rspack } from "@rspack/core"
import PreactRefreshPlugin from "@rspack/plugin-preact-refresh"
import { UnoCSSRspackPlugin } from "@unocss/webpack/rspack"
import path from "node:path"

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
                test: /\.(png|svg|jpg)$/,
                type: "asset"
            },
            {
                resourceQuery: /raw/,
                type: "asset/source"
            },
            {
                test: /\.js$/,
                use: [
                    {
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
                    }
                ],
                type: "javascript/auto"
            },
            {
                test: /\.ts$/,
                use: [
                    {
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
                    }
                ],
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
            }
        ]
    },
    plugins: [
        UnoCSSRspackPlugin(),
        new rspack.HtmlRspackPlugin({ template: "./index.html" }),
        new rspack.CssExtractRspackPlugin({}),
        isDev && new PreactRefreshPlugin({}),
        isDev && new rspack.HotModuleReplacementPlugin()
    ].filter(Boolean),
    optimization: {
        minimizer: [
            new rspack.SwcJsMinimizerRspackPlugin(),
            new rspack.LightningCssMinimizerRspackPlugin({
                minimizerOptions: { targets }
            })
        ]
    }
})
