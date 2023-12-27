import { createHashRouter } from "react-router-dom"
import { Splash } from "./views/Splash"

export default createHashRouter([
    {
        path: "/",
        element: <Splash />
    }
])
