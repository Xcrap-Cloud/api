import { ParsingModel } from "./find-many-response"

export interface CreateScraperResponse {
    id: string
    createdAt: string
    updatedAt: string
    name: string
    defaultUrl: string | null
    description: string | null
    ownerId: string
    clientId: string
    parsingModel: ParsingModel
}