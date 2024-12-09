import { subscribe } from "./events"

const keysPressed: Record<string, boolean> = {}

export function loadInput() {
    subscribe("key-down", (key) => {
        keysPressed[key] = true
    })
    subscribe("key-up", (key) => {
        keysPressed[key] = false
    })
}

export function isKeyPressed(key: string) {
    return keysPressed[key]
}
