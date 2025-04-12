import { FluentProvider, webDarkTheme, webLightTheme } from "@fluentui/react-components"
import type { FunctionComponent } from "preact"
import { render } from "preact"
import { useMemo } from "preact/hooks"
import { useMedia } from "react-use"
import { Route, Router } from "wouter-preact"
import indexCSS from "./index.module.scss"
import { Splash } from "./pages/Splash"
import { useTauriInit } from "./platform-specific/tauri"

import "normalize.css"

const App: FunctionComponent = () => {
    const isDarkMode = useMedia("(prefers-color-scheme: dark)", false)

    useTauriInit()

    return (
        <FluentProvider theme={isDarkMode ? webDarkTheme : webLightTheme} className={indexCSS.wh_full}>
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
