import { isTauri } from "@tauri-apps/api/core"
import { getCurrentWindow } from "@tauri-apps/api/window"
import { useEffect } from "preact/hooks"

export function useTauriInit() {
    useEffect(() => {
        if (!isTauri()) return

        // Paired with `"visible": false` in `tauri.conf.json` to show window after initialization
        const thisWindow = getCurrentWindow()
        thisWindow.show()
        thisWindow.setFocus()
    }, [])
}
