import { client, subscribeToAppMapChunk, subscribeToTopicMapChunk } from "./services/stompClient.js"
import { delay } from "./utils/helpers.js"
import { getAllNeedSubscribe } from "./utils/mapUtils.js"
import { textToArray } from "./services/arrayService.js"
import { TEXT, textArray, mapArray, INTERVAL_MS } from "./config/settings.js"
import { verifyAndDraw } from "./services/updateService.js"

async function main() {
    console.log("Connecting to server...")
    client.activate()

    await delay(1000)

    await textToArray(TEXT)

    const chunks = getAllNeedSubscribe()
    for (const chunk of chunks) {
        await subscribeToAppMapChunk(chunk.x, chunk.y)
    }

    await delay(1000)
    const updatedCount = await verifyAndDraw(textArray, mapArray)
    console.log(`initial update completed with ${updatedCount} updates.`)

    for (const chunk of chunks) {
        await subscribeToTopicMapChunk(chunk.x, chunk.y)
    }
    let isUpdating = false

    setInterval(async () => {
        if (isUpdating) {
            return
        }
        isUpdating = true
        try {
            const updatedCount = await verifyAndDraw(textArray, mapArray)
            console.log(`update completed with ${updatedCount} updates.`)
        } catch (error) {
            console.error("Error during update:", error)
        } finally {
            isUpdating = false
        }
    }, INTERVAL_MS)

}

main().catch((error) => console.error("Error:", error))
