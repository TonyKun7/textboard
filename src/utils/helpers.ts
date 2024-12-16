export function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export function checkIsConnected(client: any) {
    setTimeout(() => {
        if (!client.connected) return false
        return true
    }, 1000)
}