export function isConnectionError(e: any): e is TypeError {
    return e instanceof TypeError && e.message === "Failed to fetch"
}
