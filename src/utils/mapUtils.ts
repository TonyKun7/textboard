import { CHUNK_WIDTH, CHUNK_HEIGHT, START_X, START_Y, TEXT } from "../config/settings.js"

export function getAllNeedSubscribe() {
    const lines = TEXT.split("\n")
    const casesToSubscribe: { x: number; y: number }[] = []

    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[y].length; x++) {
            const charX = START_X + x
            const charY = START_Y + y

            const caseX = Math.floor((charX + -29) / CHUNK_WIDTH) + 1
            const caseY = Math.floor((charY + -16) / CHUNK_HEIGHT) + 1

            const caseToSubscribe = { x: caseX, y: caseY }
            if (!casesToSubscribe.some((c) => c.x === caseToSubscribe.x && c.y === caseToSubscribe.y)) {
                casesToSubscribe.push(caseToSubscribe)
            }
        }
    }

    return casesToSubscribe
}