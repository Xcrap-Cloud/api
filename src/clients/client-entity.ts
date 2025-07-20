import { AxiosInstance } from "axios"

import { UpdateClientResponse } from "./interfaces/update-client-response"
import { UpdateClientOptions } from "./clients-service"

export type ClientMetadata = {
    readonly createdAt: string
    readonly updatedAt: string
    readonly name: string
    readonly description: string | null
}

export class Client {
    constructor(
        private readonly api: AxiosInstance,
        readonly id: string,
        public ownerId: string,
        public metadata: ClientMetadata,
    ) {}

    async update(data: UpdateClientOptions) {
        const response = await this.api.patch<UpdateClientResponse>(`/clients/${this.id}`, data)
        const responseData = response.data

        this.metadata = {
            name: responseData.name,
            description: responseData.description,
            createdAt: responseData.createdAt,
            updatedAt: responseData.updatedAt
        }
    }

    async delete() {
        const response = await this.api.delete(`/clients/${this.id}`)
        return response.data
    }
}