export interface HTTPClient {
    get(url: URL): Promise<any>
    post(url: URL, data: any): Promise<void>
    delete(url: URL): Promise<void>
}
