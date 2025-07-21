import { AxiosInstance } from "axios"

import { ExecuteOneDynamicScraperResponse } from "./interfaces/execute-one-dynamic-response"
import { ExecuteOneScraperResponse } from "./interfaces/execute-one-response"
import { FindManyScrapersResponse } from "./interfaces/find-many-response"
import { PaginateOptions } from "../common/interfaces/paginate-options"
import { FindOneScraperResponse } from "./interfaces/find-one-response"
import { CreateScraperResponse } from "./interfaces/create-response"
import { UpdateScraperResponse } from "./interfaces/update-scraper"
import { Scraper } from "./scraper-entity"

type ParsingModelField = {
    query?: string
    extractor?: string
    default?: string
    nested?: CreateParsingModelOptions
    [key: string]: any | undefined
}

export type CreateParsingModelOptions = {
    type: string
    model: {
        [key: string]: ParsingModelField
    }
}

export type CreateScraperOptions = {
    name: string
    description?: string
    defaultUrl?: string
    clientId: string
    parsingModel: CreateParsingModelOptions
}

export type ExecuteOneDynamicScraperOptions = {
    url: string
    clientId?: string
    client?: {
        type: string
    }
    parsingModel: CreateParsingModelOptions
}


export type UpdateScraperOptions = Partial<CreateScraperOptions>

export class ScrapersService {
    constructor(private readonly api: AxiosInstance) {}

    async create(data: CreateScraperOptions) {
        const response = await this.api.post<CreateScraperResponse>("/scrapers", data)
        const responseData = response.data

        return new Scraper(
            this.api,
            responseData.id,
            responseData.clientId,
            responseData.ownerId,
            responseData.parsingModel,
            responseData.defaultUrl,
            {
                name: responseData.name,
                description: responseData.description,
                createdAt: responseData.createdAt,
                updatedAt: responseData.updatedAt
            }
        )
    }

    async findOne(id: string) {
        const response = await this.api.get<FindOneScraperResponse>(`/scrapers/${id}`)
        const data = response.data

        return new Scraper(
            this.api,
            data.id,
            data.clientId,
            data.ownerId,
            data.parsingModel,
            data.defaultUrl,
            {
                name: response.data.name,
                description: response.data.description,
                createdAt: response.data.createdAt,
                updatedAt: response.data.updatedAt
            }
        )
    }

    async executeOne<T extends any>(id: string) {
        const response = await this.api.post<ExecuteOneScraperResponse<T>>(`/scrapers/${id}/execute`)
        return response.data
    }

    async executeOneDynamic<T extends any>(data: ExecuteOneDynamicScraperOptions) {
        const response = await this.api.post<ExecuteOneDynamicScraperResponse<T>>("/scrapers/dynamic/execute", data)
        return response.data
    }

    async findMany({ page, perPage }: PaginateOptions = {}) {
        const params: any = {}

        if (page) params.page = page
        if (perPage) params.perPage = perPage

        const response = await this.api.get<FindManyScrapersResponse>("/scrapers", { params })

        const scrapers = response.data.data.map((scraper) => {
            return new Scraper(
                this.api,
                scraper.id,
                scraper.clientId,
                scraper.ownerId,
                scraper.parsingModel,
                scraper.defaultUrl,
                {
                    name: scraper.name,
                    description: scraper.description,
                    createdAt: scraper.createdAt,
                    updatedAt: scraper.updatedAt
                }
            )
        })

        return scrapers
    }

    async update(id: string, data: UpdateScraperOptions) {
        const response = await this.api.patch<UpdateScraperResponse>(`/scrapers/${id}`, data)
        const responseData = response.data

        return new Scraper(
            this.api,
            responseData.id,
            responseData.clientId,
            responseData.ownerId,
            responseData.parsingModel,
            responseData.defaultUrl,
            {
                name: responseData.name,
                description: responseData.description,
                createdAt: responseData.createdAt,
                updatedAt: responseData.updatedAt
            }
        )
    }

    async delete(id: string) {
        const response = await this.api.delete(`/scrapers/${id}`)
        return response.data
    }
}