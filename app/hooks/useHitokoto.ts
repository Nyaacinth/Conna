import useSWR, { SWRConfiguration } from "swr"
import { HitokotoGetParams, buildSearchParams, fetchHitokotoFrom } from "../utils/hitokoto"

export function useHitokoto(
    apiUrl = "https://v1.hitokoto.cn/",
    params: HitokotoGetParams = {},
    swrOptions?: SWRConfiguration
) {
    return useSWR(`${apiUrl}?${buildSearchParams(params).toString()}`, fetchHitokotoFrom, swrOptions)
}
