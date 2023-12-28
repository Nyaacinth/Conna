import { window as tauriWindow } from "@tauri-apps/api"
import { FunctionComponent } from "react"
import { useHitokoto } from "../hooks/useHitokoto"

export const Splash: FunctionComponent = () => {
    const { data, isLoading, error, mutate } = useHitokoto()

    return (
        <div className="h-full flex items-center justify-center bg-transparent">
            {!error ? (
                <div className="relative rounded-lg w-90% h-90% border border-gray bg-light text-dark shadow-md p-6 font-light rotate--1">
                    <div className="p-6 text-xl relative mb-2">
                        <svg
                            role="button"
                            onClick={() => mutate()}
                            onKeyDown={() => mutate()}
                            className="absolute top-0 left-0 text-gray"
                            fill="none"
                            height="24"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>Left Quotation Mark</title>
                            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                        </svg>
                        {isLoading ? "Loading..." : data?.hitokoto}
                        <svg
                            role="button"
                            onClick={() => tauriWindow.appWindow.hide()}
                            onKeyDown={() => tauriWindow.appWindow.hide()}
                            className="absolute right-0 top-0 text-gray-5"
                            width="24"
                            height="24"
                            viewBox="0 0 16 16"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>Close Button</title>
                            <path
                                fill="currentColor"
                                fill-rule="evenodd"
                                d="M3.47 3.47a.75.75 0 0 1 1.06 0L8 6.94l3.47-3.47a.75.75 0 1 1 1.06 1.06L9.06 8l3.47 3.47a.75.75 0 1 1-1.06 1.06L8 9.06l-3.47 3.47a.75.75 0 0 1-1.06-1.06L6.94 8L3.47 4.53a.75.75 0 0 1 0-1.06"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </div>
                    <div className="absolute right-0 bottom-0 flex flex-col space-y-1.5 p-6 pt-0 text-right">
                        <h3 className="font-semibold tracking-tight text-base">{!isLoading && data?.creator}</h3>
                        <p className="text-sm text-gray-6">{!isLoading && `UID: ${data?.creator_uid}`}</p>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center">
                    <svg
                        className="text-red-7"
                        height="64"
                        viewBox="0 0 16 16"
                        width="64"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>Error Icon</title>
                        <path
                            fill="currentColor"
                            fill-rule="evenodd"
                            d="M13.5 8a5.5 5.5 0 1 1-11 0a5.5 5.5 0 0 1 11 0M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0M6.53 5.47a.75.75 0 0 0-1.06 1.06L6.94 8L5.47 9.47a.75.75 0 1 0 1.06 1.06L8 9.06l1.47 1.47a.75.75 0 1 0 1.06-1.06L9.06 8l1.47-1.47a.75.75 0 1 0-1.06-1.06L8 6.94z"
                        />
                    </svg>
                    <p>{error.message}</p>
                </div>
            )}
        </div>
    )
}
