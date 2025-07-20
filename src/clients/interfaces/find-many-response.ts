export interface FindManyClientsResponse {
    data: FindManyClientItem[]
    meta: Meta
}

export interface FindManyClientItem {
    id: string
    createdAt: string
    updatedAt: string
    name: string
    type: string
    description: string | null
    ownerId: string
    owner: Owner
}

export interface Owner {
    id: string
    name: string
}

interface Meta {
    total: number
    lastPage: number
    currentPage: number
    perPage: number
    prev: number | null
    next: number | null
}
