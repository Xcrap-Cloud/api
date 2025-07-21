import { AxiosInstance } from "axios"

import { ExecuteOneScraperResponse } from "./interfaces/execute-one-response"
import { UpdateScraperOptions } from "./scrapers-service"
import { ParsingModel } from "./interfaces/find-many-response"

export type ScraperMetadata = {
    readonly createdAt: string
    readonly updatedAt: string
    readonly name: string
    readonly description: string | null
}

export class Scraper {
    constructor(
        private readonly api: AxiosInstance,
        readonly id: string,
        readonly clientId: string,
        public ownerId: string,
        public parsingModel: ParsingModel,
        public defaultUrl: string | null,
        public metadata: ScraperMetadata,
    ) {}

    async execute<T extends any>(): Promise<ExecuteOneScraperResponse<T>> {
        const response = await this.api.post(`/scrapers/${this.id}/execute`)
        return response.data
    }

    async update(data: UpdateScraperOptions) {
        const response = await this.api.patch(`/scrapers/${this.id}`, data)
        const responseData = response.data

        this.metadata = {
            name: responseData.name,
            description: responseData.description,
            createdAt: responseData.createdAt,
            updatedAt: responseData.updatedAt
        }

        this.defaultUrl = responseData.defaultUrl
        this.parsingModel = responseData.parsingModel
    }

    async delete() {
        const response = await this.api.delete(`/scrapers/${this.id}`)
        return response.data
    }
}