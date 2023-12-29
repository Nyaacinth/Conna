export interface HitokotoGetParams {
    c?: string[]
    minLength?: number
    maxLength?: number
}

export interface HitokotoResponse {
    id: number
    hitokoto: string
    type: string
    from: string
    fromWho: string | null
    creator: string
    creatorUid: number
    reviewer: number
    uuid: string
    commitFrom: string
    createdAt: string
    length: number
}

export function buildSearchParams(params: HitokotoGetParams): URLSearchParams {
    const searchParams = new URLSearchParams()
    if (params.c) {
        for (const type of params.c) {
            searchParams.append("c", type)
        }
    }
    if (params.minLength) searchParams.append("min_length", params.minLength.toString())
    if (params.maxLength) searchParams.append("max_length", params.maxLength.toString())

    return searchParams
}

export async function fetchHitokotoFrom(url: string): Promise<HitokotoResponse> {
    const response = await fetch(url)
    const hitokotoResponseRaw = (await response.json()) as Partial<{
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
    }>

    return {
        id: hitokotoResponseRaw.id ?? 0,
        hitokoto: hitokotoResponseRaw.hitokoto ?? "",
        type: hitokotoResponseRaw.type ?? "",
        from: hitokotoResponseRaw.from ?? "",
        fromWho: hitokotoResponseRaw.from_who ?? null,
        creator: hitokotoResponseRaw.creator ?? "",
        creatorUid: hitokotoResponseRaw.creator_uid ?? 0,
        reviewer: hitokotoResponseRaw.reviewer ?? 0,
        uuid: hitokotoResponseRaw.uuid ?? "",
        commitFrom: hitokotoResponseRaw.commit_from ?? "",
        createdAt: hitokotoResponseRaw.created_at ?? "",
        length: hitokotoResponseRaw.length ?? 0
    }
}
