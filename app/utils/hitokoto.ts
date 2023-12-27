export interface HitokotoGetParams {
    c?: string[]
    min_length?: number
    max_length?: number
}

export interface HitokotoResponse {
    id: number
    hitokoto: string
    type: string
    from: string
    from_who: string | null
    creator: string
    creator_uid: number
    reviewer: number
    uuid: string
    commit_from: string
    created_at: string
    length: number
}

export function buildSearchParams(params: HitokotoGetParams): URLSearchParams {
    const searchParams = new URLSearchParams()
    if (params.c) {
        for (const type of params.c) {
            searchParams.append("c", type)
        }
    }
    if (params.min_length) searchParams.append("min_length", params.min_length.toString())
    if (params.max_length) searchParams.append("max_length", params.max_length.toString())

    return searchParams
}

export async function fetchHitokotoFrom(url: string): Promise<HitokotoResponse> {
    const response = await fetch(url)
    const hitokotoResponseRaw = (await response.json()) as Partial<HitokotoResponse>

    return {
        id: hitokotoResponseRaw.id ?? 0,
        hitokoto: hitokotoResponseRaw.hitokoto ?? "",
        type: hitokotoResponseRaw.type ?? "",
        from: hitokotoResponseRaw.from ?? "",
        from_who: hitokotoResponseRaw.from_who ?? null,
        creator: hitokotoResponseRaw.creator ?? "",
        creator_uid: hitokotoResponseRaw.creator_uid ?? 0,
        reviewer: hitokotoResponseRaw.reviewer ?? 0,
        uuid: hitokotoResponseRaw.uuid ?? "",
        commit_from: hitokotoResponseRaw.commit_from ?? "",
        created_at: hitokotoResponseRaw.created_at ?? "",
        length: hitokotoResponseRaw.length ?? 0
    }
}
