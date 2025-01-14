import os from "node:os"
import { unlink } from "node:fs/promises"
import { basename } from "node:path"
import fkill from "fkill"

// get operating system
const platform = os.platform()

// commands for all platforms
export const commands = {
    inspector: {
        win32: "./bin/windows/x64/inspector.exe",
        linux: "./bin/linux/x64/inspector",
        darwin: "./bin/macosx/inspector.app/Contents/MacOS/inspector"
    },

    inspector32: {
        win32: "./bin/windows/x32/inspector.exe"
    },

    scapp: {
        win32: "./bin/windows/x64/scapp.exe",
        linux: "./bin/linux/x64/scapp",
        darwin: "./bin/macosx/scapp"
    },

    scapp32: {
        win32: "./bin/windows/x32/scapp.exe"
    },

    usciter: {
        win32: "./bin/windows/x64/usciter.exe",
        linux: "./bin/linux/x64/usciter",
        darwin: "./bin/macosx/usciter.app/Contents/MacOS/usciter"
    },

    usciter32: {
        win32: "./bin/windows/x32/usciter.exe"
    }
}

const options = {
    force: true,
    forceAfterTimeout: 3000
}

async function kill(name, options) {
    try {
        return await fkill(name, options)
    } catch {}
}

export async function killInspector() {
    await kill(basename(commands.inspector[platform]), options)
    try {
        await unlink("/tmp/inspector-js")
    } catch {}
}

export async function killScapp() {
    await kill(basename(commands.scapp[platform]), options)
}

export async function killUsciter() {
    await kill(basename(commands.usciter[platform]), options)
}
