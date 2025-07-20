import { AxiosInstance } from "axios"

import { CreateClientResponse } from "./interfaces/create-client-response"
import { FindManyClientsResponse } from "./interfaces/find-many-response"
import { PaginateOptions } from "../common/interfaces/paginate-options"
import { Client } from "./client-entity"
import { UpdateClientResponse } from "./interfaces/update-client-response"

export type CreateClientOptions = {
    name: string
    description?: string
    type: string
}

export type UpdateClientOptions = Partial<CreateClientOptions>

export class ClientsService {
    constructor(private readonly api: AxiosInstance) { }

    async create(data: CreateClientOptions) {
        const response = await this.api.post<CreateClientResponse>("/clients", data)
        const responseData = response.data

        return new Client(
            this.api,
            responseData.id,
            responseData.ownerId,
            {
                name: responseData.name,
                description: responseData.description,
                createdAt: responseData.createdAt,
                updatedAt: responseData.updatedAt
            }
        )
    }

    async findOne(id: string) {
        const response = await this.api.get(`/clients/${id}`)
        return response.data
    }

    async findMany({ page, perPage }: PaginateOptions = {}) {
        const params: any = {}

        if (page) params.page = page
        if (perPage) params.perPage = perPage

        const response = await this.api.get<FindManyClientsResponse>("/clients", { params })

        const clients = response.data.data.map((client) => {
            return new Client(
                this.api,
                client.id,
                client.ownerId,
                {
                    name: client.name,
                    description: client.description,
                    createdAt: client.createdAt,
                    updatedAt: client.updatedAt
                }
            )
        })

        return clients
    }

    async update(id: string, data: UpdateClientOptions) {
        const response = await this.api.patch<UpdateClientResponse>(`/clients/${id}`, data)
        const responseData = response.data

        return new Client(
            this.api,
            responseData.id,
            responseData.ownerId,
            {
                name: responseData.name,
                description: responseData.description,
                createdAt: responseData.createdAt,
                updatedAt: responseData.updatedAt
            }
        )
    }

    async delete(id: string) {
        const response = await this.api.delete(`/clients/${id}`)
        return response.data
    }
}