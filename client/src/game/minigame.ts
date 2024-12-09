import { isKeyPressed } from "../input"

const MaxPaddleSpeedX = 30

let fishingPaddleElement: HTMLElement
let isFishing = true
let paddleX = 0

export function loadFishingMinigame() {
    fishingPaddleElement = document.getElementById("fishing-paddle")!
}

export function startFishing() {}

export function endFishing() {}

export function updateFishingMinigame(tDelta: number) {
    if (!isFishing) {
        return
    }

    let speedX = 0
    if (isKeyPressed("ArrowLeft") || isKeyPressed("a")) {
        speedX = -1
    } else if (isKeyPressed("ArrowRight") || isKeyPressed("d")) {
        speedX = 1
    }

    paddleX += speedX * MaxPaddleSpeedX * tDelta
    if (paddleX < 0) {
        paddleX = 0
    }

    fishingPaddleElement.style.left = `${paddleX}px`
}
