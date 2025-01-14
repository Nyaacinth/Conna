import fs from "node:fs"
import { exec } from "node:child_process"
import os from "node:os"
import { sep as separator } from "node:path"
import process from "node:process"
import util from "node:util"
import download from "download"
import { killInspector, killScapp, killUsciter } from "./commands.mjs"
import Sdk from "./sdk.mjs"

let cleanup = false
let sdkVersion
const sdkDefaultVersion = "5.0.1.8"

// get command line arguments
const args = process.argv.slice(2, process.argv.length)

for (const argument of args) {
    if (argument === "cleanup") cleanup = true
    else sdkVersion = argument
}

if (sdkVersion === undefined) {
    // check for sdk version in package.json
    try {
        // read package json
        const packageText = await util.promisify(fs.readFile)("package.json")

        // convert to json
        const packageJson = JSON.parse(packageText)

        sdkVersion = packageJson.sciterVersion ?? sdkDefaultVersion
    } catch {
        console.error("\u001B[31mInvalid main file in package.json.\u001B[0m")
    }
}

// get sdk commit id
const sdkCommitId = Sdk.getCommit(sdkVersion)

if (sdkCommitId === undefined) {
    console.error(`\u001B[31mUnknown sciter.js SDK version ${sdkVersion}.\u001B[0m`)
    process.exit(1)
}

// close all open apps so they don't block installation
await killInspector()
await killScapp()
await killUsciter()

// get tmp dir and zip file
const tmpDir = os.tmpdir() + separator
const zipFile = tmpDir + `${sdkCommitId}.zip`

const commands = {
    linux: [
        // unzip archive
        `unzip -o ${zipFile} "*/bin/*" -d ${tmpDir}`,

        // move binaries
        `cp -r ${tmpDir}sciter-js-sdk-${sdkCommitId}/bin .`,

        // delete temp dir
        `rm -rf ${tmpDir}sciter-js-sdk-${sdkCommitId}`,

        // delete zip
        //`rm ${zipFile}`,

        "cd bin/macosx; chmod +x scapp inspector.app/Contents/MacOS/inspector usciterjs.app/Contents/MacOS/usciterjs libsciter.dylib",
        "cd bin/linux/arm32; chmod +x scapp inspector usciter libsciter-gtk.so",
        "cd bin/linux/x64; chmod +x scapp inspector usciter libsciter.so",
        "cd bin/linux/x32; chmod +x scapp"
    ],
    win32: [
        // unzip archive
        `C:\\Windows\\System32\\tar.exe -xf ${zipFile} -C ${tmpDir}`,

        // move binaries
        `xcopy ${tmpDir}sciter-js-sdk-${sdkCommitId}\\bin bin\\ /S /Y /Q`,

        // delete old dir
        `rmdir /s /q ${tmpDir}sciter-js-sdk-${sdkCommitId}`

        // delete zip
        //`del ${zipFile}`,
    ]
}

try {
    // check if sdk was already downloaded
    await fs.promises.stat(zipFile)

    console.log(`\u001B[32mUse sciter.js SDK from cache ${sdkVersion}...\u001B[0m\n`)
} catch {
    console.log(`\u001B[32mDownload sciter.js SDK ${sdkVersion}...\u001B[0m\n`)

    let downloaded = 0

    fs.writeFileSync(
        zipFile,
        await download(Sdk.getUrl(sdkVersion))
            .on("response", (_res) => {
                //console.log(res.headers);
                // clear screen
                //console.log("\x1b[2J");
            })
            .on("response", (res) => {
                res.on("data", (data) => {
                    downloaded += data.length

                    // show download progress
                    console.log(
                        `\u001B[ADownloaded ${(downloaded / (1024 * 1024)).toFixed(1)} Mb...                                              \u001B[0m`
                    )
                })
            })
    )
}

console.log(`\u001B[32mInstall sciter.js SDK ${sdkVersion}...\u001B[0m`)

const platform = os.platform() === "win32" ? "win32" : "linux"

// promisify exec
const execPromise = util.promisify(exec)

// execute commands synchronously
for (const command of commands[platform]) {
    console.log(command)

    try {
        const { stdout, stderr } = await execPromise(command)

        if (stdout) console.log(stdout)

        if (stderr) console.error(`\u001B[31m${stderr}\u001B[0m`)
    } catch (error) {
        console.error(`\u001B[31m${error}\u001B[0m`)
        process.exit(1)
    }
}

// cleanup not needed platforms?
if (cleanup) {
    console.log("\u001B[32mCleanup platforms...\u001B[0m")

    const platforms = {
        win32: "windows",
        linux: "linux",
        darwin: "macosx",
        android: "android"
    }

    // list directories in bin
    const directories = await fs.promises.readdir("bin")

    //console.log(dirs);

    // delete all not required directories
    for (const dir of directories) {
        if (dir !== platforms[os.platform()]) {
            fs.promises.rm(`bin/${dir}`, {
                recursive: true
            })
        }
    }
}

console.log("\u001B[32mInstall complete.\u001B[0m")

// write sdk version to file
const version = {
    version: sdkVersion
}

util.promisify(fs.writeFile)("bin/version.json", JSON.stringify(version))
