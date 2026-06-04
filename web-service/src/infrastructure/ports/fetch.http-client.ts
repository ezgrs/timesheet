import { HTTPClient } from "../../application/ports/http-client";

export class FetchHTTPClient implements HTTPClient {
    async get(url: URL): Promise<any> {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return await response.json()
    }

    async post(url: URL, data: any): Promise<void> {
        await fetch(url, {method: "POST", body: JSON.stringify(data)})
    }

    async delete(url: URL): Promise<void> {
        await fetch(url, {method: "DELETE"})
    }
}