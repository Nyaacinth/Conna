import { FluentProvider, webDarkTheme, webLightTheme } from "@fluentui/react-components"
import { FunctionComponent, render } from "preact"
import { useMemo } from "preact/hooks"
import { useMedia } from "react-use"
import { Route, Router } from "wouter-preact"
import { Splash } from "./pages/Splash"

import "@unocss/reset/tailwind-compat.css"
import "./index.css"

import "uno.css"

const App: FunctionComponent = () => {
    const isDarkMode = useMedia("(prefers-color-scheme: dark)", false)

    return (
        <FluentProvider theme={isDarkMode ? webDarkTheme : webLightTheme} className="w-full h-full">
            {useMemo(
                () => (
                    <Router>
                        <Route path="/" component={Splash} />
                    </Router>
                ),
                []
            )}
        </FluentProvider>
    )
}

render(<App />, document.getElementById("root")!)
