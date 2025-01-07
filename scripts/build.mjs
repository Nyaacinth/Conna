import os from "node:os"
import { spawn } from "node:child_process"
import process from "node:process"
import { dirname, sep as separator } from "node:path"
import { fileURLToPath } from "node:url"

const scapp = {
    win32: "./bin/windows/x64/scapp.exe",
    linux: "./bin/linux/x64/scapp",
    darwin: "./bin/macosx/scapp"
}

try {
    const dir = dirname(fileURLToPath(import.meta.url)) + separator
    const arguments_ = [dir + "build.htm", "--debug"]

    const platform = os.platform()

    spawn(scapp[platform], arguments_, {
        detached: true
    })
} catch (error) {
    console.error(`\u001B[31m${error}\u001B[0m`)
}

// do not wait for child processes
process.exit(0)
