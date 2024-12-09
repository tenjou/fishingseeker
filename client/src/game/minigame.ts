import { isKeyPressed } from "../input"

const MaxPaddleSpeedX = 20

let fishingPaddleElement: HTMLElement
let isFishing = true
let paddleX = 0

let fishingBarWidth = 0
let paddlePxPerPercentX = 0

export function loadFishingMinigame() {
    fishingPaddleElement = document.getElementById("fishing-paddle")!

    const fishingBar = document.getElementById("fishing-bar")!
    fishingBarWidth = fishingBar.clientWidth - fishingPaddleElement.clientWidth
    paddlePxPerPercentX = fishingBarWidth / 100
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

    paddleX += speedX * (MaxPaddleSpeedX * paddlePxPerPercentX) * tDelta
    if (paddleX < 0) {
        paddleX = 0
    }
    if (paddleX >= fishingBarWidth) {
        paddleX = fishingBarWidth
    }

    fishingPaddleElement.style.left = `${paddleX}px`
}
