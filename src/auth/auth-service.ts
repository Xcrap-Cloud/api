import axios, { AxiosInstance } from "axios"

import { RefreshTokenResponse } from "./interfaces/refresh-token-response"
import { SignInResponse } from "./interfaces/sign-in-response"

export type SignInOptions = {
    email: string
    password: string
}

export class AuthService {
    private readonly api: AxiosInstance

    constructor(api?: AxiosInstance) {
        if (!api) {
            this.api = axios.create({
                baseURL: "https://api.xcrap.cloud",
                headers: {
                    "Content-Type": "application/json"
                }
            })
        } else {
            this.api = api
        }
    }

    async signIn(data: SignInOptions): Promise<SignInResponse> {
        const response = await this.api.post("/auth/sign-in", data)
        return response.data
    }

    async refreshToken(): Promise<RefreshTokenResponse> {
        const response = await this.api.post("/auth/refresh-token")
        return response.data
    }
}