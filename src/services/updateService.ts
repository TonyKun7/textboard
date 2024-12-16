import { publishCharacter } from "./stompClient.js"

export async function verifyAndDraw(textArray: { x: number; y: number; value: string }[], mapArray: { x: number; y: number; value: string }[]) {
    let updated = 0

    for (const textChar of textArray) {
        const mapChar = mapArray.find((mapChar) => mapChar.x === textChar.x && mapChar.y === textChar.y)

        if (!mapChar) {
            console.warn(`No map data found for (${textChar.x}, ${textChar.y}). Skipping.`)
            continue
        }

        if (mapChar.value !== textChar.value) {
            let update = await publishCharacter(textChar.x, textChar.y, textChar.value)
            if (update) updated++
        }
    }

    console.log(`Updated ${updated} characters.`)
    return updated
}
