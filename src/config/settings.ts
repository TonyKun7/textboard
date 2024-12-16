import dotenv from "dotenv"
dotenv.config()

import fs from "fs"

export const CHUNK_WIDTH: number = 29
export const CHUNK_HEIGHT: number = 16

export const DELAY_MS: number = process.env.DELAY_MS ? parseInt(process.env.DELAY_MS) : 1000
export const INTERVAL_MS: number = process.env.INTERVAL_MS ? parseInt(process.env.INTERVAL_MS) : 1000
export const START_X: number = process.env.START_X ? parseInt(process.env.START_X) : 0
export const START_Y: number = process.env.START_Y ? parseInt(process.env.START_Y) : 0
export const KEY: string = process.env.KEY || "default"
export const TEXT = fs.readFileSync("string.txt", "utf-8")
export var mapArray: { x: number; y: number; value: string }[] = []
export var textArray: { x: number; y: number; value: string }[] = []

export const SERVER_URL: string = "wss://aywenito.textboard.fr:25555/ws"
