export interface ExecuteOneScraperResponse<T extends any> {
    readonly metadata: Metadata
    readonly data: T
}

export interface Metadata {
    request: Request
    response: Response
    parsing: Parsing
}

export interface Request {
    url: string
    startTime: number
    endTime: number
    duration: number
    hadRetries: boolean
    attempts: number
    userAgent: string
}

export interface Response {
    status: number
    statusText: string
    contentType: string
}

export interface Parsing {
    startTime: number
    endTime: number
    duration: number
}