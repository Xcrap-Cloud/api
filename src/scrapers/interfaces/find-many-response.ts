export interface FindManyScrapersResponse {
    data: FindManyScraperItem[]
    meta: Meta
}

export interface FindManyScraperItem {
    id: string
    createdAt: string
    updatedAt: string
    name: string
    defaultUrl: string
    description: string
    ownerId: string
    clientId: string
    parsingModel: ParsingModel
}

export interface ParsingModel {
    type: string
    model: Model
}

export interface Model {
    [key: string]: Field
}

export interface Field {
    query?: string
    extractor?: string
    default?: string
    nested?: Nested
}

export interface Nested {
    type: string
    model: Model
}

interface Meta {
    total: number
    lastPage: number
    currentPage: number
    perPage: number
    prev: number | null
    next: number | null
}