import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import router from "./router"

import "@unocss/reset/tailwind-compat.css"
import "uno.css"

// biome-ignore lint/style/noNonNullAssertion: App entry must exists, otherwise ../index.html should be wrong file
createRoot(document.getElementById("app")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)
