export const $EDITABLE_SELECTORS = [
    'input[type="text"]',
    'input[type="password"]',
    'input[type="email"]',
    'input[type="tel"]',
    'input[type="url"]',
    'input[type="search"]',
    'input[type="number"]',
    "input:not([type])",
    "textarea",
    '[contenteditable="true"]'
]

export const $WEBVIEW_NATIVEIFY_CSS = `
    html {
        overscroll-behavior: none;
        overflow: hidden;
        width: 100vw;
        height: 100vh;
    }
    @supports (height: 100dvh) and (width: 100dvw) {
        html {
            width: 100dvw;
            height: 100dvh;
        }
    }
    body {
        overflow: auto;
        width: 100%;
        height: 100%;
    }
    html {
        -webkit-user-select: none;
        user-select: none;
        cursor: default;
    }
    ${$EDITABLE_SELECTORS.join(", ")} {
        -webkit-user-select: text;
        user-select: text;
        cursor: text;
    }
`
    .replace(/\/\*.*?\*\//g, "")
    .replace(/\s+/g, " ")
    .trim()
