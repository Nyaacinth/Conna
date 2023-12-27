import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createHashRouter, RouterProvider } from "react-router-dom"
import { Splash } from "./views/Splash"

import "@unocss/reset/tailwind-compat.css"
import "uno.css"

const router = createHashRouter([
    {
        path: "/",
        element: <Splash />
    }
])

createRoot(document.getElementById("app")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)
