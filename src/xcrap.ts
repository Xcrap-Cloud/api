import axios, { AxiosInstance } from "axios"

import { ScrapersService } from "./scrapers/scrapers-service"
import { ClientsService } from "./clients/clients-service"
import { AuthService } from "./auth/auth-service"

export const defaultBaseUrl = "https://api.xcrap.cloud"

type ApiKeyAuth = {
    apiKey: string
    accessToken?: never
    refreshToken?: never
}

type JwtAuth = {
    accessToken: string
    refreshToken: string
    apiKey?: never
}

export type XcrapOptions = (ApiKeyAuth | JwtAuth) & {
    baseUrl?: string
}

export type XcrapSignInOptions = {
    baseUrl?: string
}

export class Xcrap {
    readonly baseUrl: string
    readonly api: AxiosInstance
    readonly scrapers: ScrapersService
    readonly clients: ClientsService
    readonly auth: AuthService

    constructor({ apiKey, accessToken, refreshToken, baseUrl }: XcrapOptions) {
        if (!apiKey && !(accessToken && refreshToken)) {
            throw new Error("apiKey or accessToken and refreshToken are required")
        }

        this.baseUrl = baseUrl ?? defaultBaseUrl

        this.api = axios.create({
            baseURL: this.baseUrl,
        })

        if (apiKey) {
            this.api.interceptors.request.use(config => {
                config.headers["X-API-KEY"] = apiKey
                return config
            })
        } else {
            this.api.interceptors.request.use(config => {
                config.headers["Authorization"] = `Bearer ${accessToken}`
                return config
            })
        }

        this.scrapers = new ScrapersService(this.api)
        this.clients = new ClientsService(this.api)
        this.auth = new AuthService(this.api)
    }
}