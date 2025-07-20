export interface ExecuteOneDynamicScraperResponse<T extends any> {
    readonly metadata: ExecutionMetadata
    readonly data: T
}

export interface ExecutionMetadata {
    request: ExecutionRequestMetadata
    response: ExecutionResponseMetadata
    parsing: ExecutionParsingMetadata
}

export interface ExecutionRequestMetadata {
    url: string
    startTime: number
    endTime: number
    duration: number
    hadRetries: boolean
    attempts: number
    userAgent: string
}

export interface ExecutionResponseMetadata {
    status: number
    statusText: string
    contentType: string
}

export interface ExecutionParsingMetadata {
    startTime: number
    endTime: number
    duration: number
}