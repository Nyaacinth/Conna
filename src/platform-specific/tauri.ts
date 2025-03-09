import { isTauri } from "@tauri-apps/api/core"
import { getCurrentWindow } from "@tauri-apps/api/window"
import { useEffect } from "preact/hooks"
import { EDITABLE_SELECTORS, WEBVIEW_NATIVEIFY_CSS } from "./tauri-statics.macro" with { type: "macro" }

function isEditableElement(elm: HTMLElement) {
    for (const selector of EDITABLE_SELECTORS) {
        if (elm.matches(selector)) {
            return true
        }
    }
    return false
}

function doTauriInit() {
    // Inject webview-nativeify CSS
    const styleElement = document.createElement("style")
    styleElement.innerHTML = WEBVIEW_NATIVEIFY_CSS
    document.head.appendChild(styleElement)

    // Disable F5, Ctrl+R, and Cmd+R from reloading the page
    document.addEventListener("keydown", (event) => {
        if (event.key === "F5" || (event.ctrlKey && event.key === "r") || (event.metaKey && event.key === "r")) {
            event.preventDefault()
        }
    })

    // Only allow context menu on editable elements
    document.addEventListener("contextmenu", (event) => {
        if (isEditableElement(event.target as HTMLElement)) return
        event.preventDefault()
    })

    // Paired with `"visible": false` in `tauri.conf.json` to show window after initialization
    const thisWindow = getCurrentWindow()
    thisWindow.show()
    thisWindow.setFocus()
}

export function useTauriInit() {
    useEffect(() => {
        isTauri() && doTauriInit()
    }, [])
}
