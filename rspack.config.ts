import { defineConfig } from "@rspack/cli"
import { rspack } from "@rspack/core"

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"]

export default defineConfig({
    entry: {
        main: "./src/index.tsx"
    },
    resolve: {
        extensions: ["...", ".ts", ".tsx", ".jsx"],
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
                type: "asset/resource"
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
                            env: { targets }
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
                            env: { targets }
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
                            parser: {
                                syntax: "ecmascript",
                                jsx: true
                            },
                            transform: {
                                react: {
                                    runtime: "automatic",
                                    importSource: "preact"
                                }
                            }
                        }
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
                            parser: {
                                syntax: "typescript",
                                tsx: true
                            },
                            transform: {
                                react: {
                                    runtime: "automatic",
                                    importSource: "preact"
                                }
                            }
                        }
                    }
                },
                type: "javascript/auto"
            },
            {
                test: /\.css$/i,
                use: [rspack.CssExtractRspackPlugin.loader, "css-loader"],
                type: "javascript/auto"
            }
        ]
    },
    plugins: [new rspack.HtmlRspackPlugin({ template: "./index.html" }), new rspack.CssExtractRspackPlugin({})],
    optimization: {
        minimizer: [
            new rspack.SwcJsMinimizerRspackPlugin(),
            new rspack.LightningCssMinimizerRspackPlugin({
                minimizerOptions: { targets }
            })
        ]
    }
})