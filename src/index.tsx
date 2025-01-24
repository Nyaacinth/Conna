import { fabricDarkTheme, fabricLightTheme, setTheme } from "@fabric-msft/theme"
import { FunctionComponent, render } from "preact"
import { useEffect } from "preact/hooks"
import { useMedia } from "react-use"
import { Route, Router } from "wouter-preact"
import { Splash } from "./pages/Splash"

import "@unocss/reset/tailwind-compat.css"
import "./index.css"

import "uno.css"

const App: FunctionComponent = () => {
    const isDarkMode = useMedia("(prefers-color-scheme: dark)", false)

    useEffect(() => {
        if (isDarkMode) {
            setTheme(fabricDarkTheme)
            document.body.style.backgroundColor = fabricDarkTheme.colorNeutralBackground1
        } else {
            setTheme(fabricLightTheme)
            document.body.style.backgroundColor = fabricLightTheme.colorNeutralBackground1
        }
    }, [isDarkMode])

    return (
        <Router>
            <Route path="/" component={Splash} />
        </Router>
    )
}

render(<App />, document.getElementById("root")!)
