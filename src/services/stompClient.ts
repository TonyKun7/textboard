import WebSocket from "ws"
import { Client } from "@stomp/stompjs"
import { SERVER_URL, KEY, DELAY_MS } from "../config/settings.js"
import { mapChunkToArray, topicChunkToArray } from "./arrayService.js"
import { delay } from "../utils/helpers.js"

export const client = new Client({
    brokerURL: SERVER_URL,
    connectHeaders: {
        Authorization: KEY,
        "accept-version": "1.2,1.1,1.0",
        "heart-beat": "10000,10000",
    },
    webSocketFactory: () => new WebSocket(SERVER_URL),
    reconnectDelay: 1000,
})

export function subscribeToAppMapChunk(chunkX: number, chunkY: number) {
    client.subscribe(`/app/map/chunk/${chunkX}/${chunkY}`, (message) => {
        const chunk = JSON.parse(message.body)
        mapChunkToArray(chunk)
    })
}

export function subscribeToTopicMapChunk(chunkX: number, chunkY: number) {
    client.subscribe(`/topic/map/chunk/${chunkX}/${chunkY}`, (message) => {
        const chunk = JSON.parse(message.body)
        topicChunkToArray(chunk)
    })
}

export async function publishCharacter(x: number, y: number, character: string): Promise<boolean> {
    if(!client.connected) return false

    try {
        const message = JSON.stringify({ x, y, value: character })
        client.publish({ destination: "/app/map/set", body: message })
        await delay(DELAY_MS)
        return true
    }catch (e: any) {
        console.error("Error publishing character")
        return false
    }
}

client.onConnect = () => console.log("Connected to server")