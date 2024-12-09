import { subscribe } from "../events"

const MaxPaddleSpeedX = 30

let fishingPaddleElement: HTMLElement
let isFishing = true
let paddleX = 0
let paddleSpeedX = 0

export function loadFishingMinigame() {
    fishingPaddleElement = document.getElementById("fishing-paddle")!

    subscribe("key-down", (key) => {
        switch (key) {
            case "ArrowLeft":
                paddleSpeedX = -1
                break
            case "ArrowRight":
                paddleSpeedX = 1
                break
        }
    })
    subscribe("key-up", (key) => {
        switch (key) {
            case "ArrowLeft":
            case "ArrowRight":
                paddleSpeedX = 0
                break
        }
    })
}

export function startFishing() {}

export function endFishing() {}

export function updateFishingMinigame(tDelta: number) {
    if (!isFishing) {
        return
    }

    paddleX += paddleSpeedX * MaxPaddleSpeedX * tDelta
    if (paddleX < 0) {
        paddleX = 0
    }

    fishingPaddleElement.style.left = `${paddleX}px`
}
