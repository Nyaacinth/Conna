import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Route, Router } from "wouter"
import { Splash } from "./views/Splash"

import "@unocss/reset/tailwind-compat.css"
import "uno.css"

// biome-ignore lint/style/noNonNullAssertion: App entry must exists, otherwise ../index.html should be wrong file
createRoot(document.getElementById("app")!).render(
    <StrictMode>
        <Router>
            <Route path="/" component={Splash} />
        </Router>
    </StrictMode>
)
