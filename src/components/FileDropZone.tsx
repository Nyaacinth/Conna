import { FunctionComponent, JSX } from "preact"
import { useCallback, useEffect, useState } from "preact/hooks"

const Div: FunctionComponent<any> = (props: any) => {
    return <div {...props} />
}

function debounce<T extends (...args: any[]) => any>(fn: T, delay: number) {
    var timeoutId: any
    return function debounced(...vargs: any[]) {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(fn.bind(null, ...vargs), delay, arguments)
    } as T
}

export const FileDropZone: FunctionComponent<
    JSX.HTMLAttributes<HTMLDivElement> & {
        children?: JSX.Element[]
        onFileDrop?: (file: string) => void
    }
> = (props: any) => {
    const [file, setFile] = useState("")
    const updateFile = useCallback(
        debounce((file: string) => setFile(file), 300),
        []
    )
    useEffect(() => {
        if (file && typeof file == "string") props.onFileDrop?.(file)
    }, [file])

    return (
        <Div
            onDrag={(e: any) => e.stopPropagation()}
            onDrop={(e: any) => e.stopPropagation()}
            onDragAccept={(e: any) => {
                const detail = e.detail
                updateFile(detail.data)
                if (detail.dataType == "file") e.stopPropagation()
            }}
            {...props}
        />
    )
}
