import { window as tauriWindow } from "@tauri-apps/api"
import { FunctionComponent } from "react"
import { CrossSign } from "../components/svg/CrossSign"
import { ErrorIcon } from "../components/svg/ErrorIcon"
import { LeftQuotationMark } from "../components/svg/LeftQuotationMark"
import { useHitokoto } from "../hooks/useHitokoto"

export const Splash: FunctionComponent = () => {
    const { data, isLoading, error, mutate } = useHitokoto()

    return (
        <div className="h-full flex items-center justify-center bg-transparent">
            {!error ? (
                <div className="relative rounded-lg w-90% h-90% border border-gray bg-light text-dark shadow-md p-6 font-light rotate--1">
                    <div className="p-6 text-xl relative mb-2">
                        <LeftQuotationMark
                            role="button"
                            onClick={() => mutate()}
                            onKeyDown={() => mutate()}
                            className="absolute top-0 left-0 text-gray"
                            width="24"
                            height="24"
                        />
                        {isLoading ? "Loading..." : data?.hitokoto}
                        <CrossSign
                            role="button"
                            onClick={() => tauriWindow.appWindow.hide()}
                            onKeyDown={() => tauriWindow.appWindow.hide()}
                            className="absolute right-0 top-0 text-gray-5"
                            width="24"
                            height="24"
                        />
                    </div>
                    {!isLoading && (
                        <div className="absolute right-0 bottom-0 flex flex-col space-y-1.5 p-6 pt-0 text-right">
                            <h3 className="font-semibold tracking-tight text-base">{data?.creator}</h3>
                            <p className="text-sm text-gray-6">UID: {data?.creatorUid}</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex flex-col items-center">
                    <ErrorIcon className="text-red-7" width="64" height="64" />
                    <p>{error.message}</p>
                </div>
            )}
        </div>
    )
}
