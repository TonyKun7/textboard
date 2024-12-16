import { START_X, START_Y, textArray, CHUNK_WIDTH, CHUNK_HEIGHT, mapArray } from "../config/settings.js"

export function textToArray(text: string) {
    const lines = text.split("\n")
    let currentY = START_Y

    for (let lineY = 0; lineY < lines.length; lineY++) {
        const line = lines[lineY]

        for (let lineX = 0; lineX < line.length; lineX++) {
            const character = line[lineX]

            const posX = START_X + lineX
            const posY = currentY + lineY

            textArray.push({ x: posX, y: posY, value: character })
        }
    }
}

export function mapChunkToArray(mapChunk: MapChunk){
    const startX = (mapChunk.position.x) * CHUNK_WIDTH
    const startY = (mapChunk.position.y) * CHUNK_HEIGHT

    for (let y = 0; y < CHUNK_HEIGHT; y++) {
        for (let x = 0; x < CHUNK_WIDTH; x++) {
            const cell = mapChunk.cells[y * CHUNK_WIDTH + x]

            const existing = mapArray.find((char) => char.x === startX + x && char.y === startY + y)
            if (existing) existing.value = cell.cellValue
            else mapArray.push({ x: startX + x, y: startY + y, value: cell.cellValue})
            
        }
    }
}

export function topicChunkToArray(topicChunk: TopicChunk[]) {
    for (const chunk of topicChunk) {
        const existing = mapArray.find((char) => char.x === chunk.x && char.y === chunk.y)
        if (existing) existing.value = chunk.value
        else mapArray.push({ x: chunk.x, y: chunk.y, value: chunk.value })
    }
}