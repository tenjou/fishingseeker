import { isKeyPressed } from "../input"
import { clamp } from "./../utils"

const MaxPaddleSpeedX = 20
const MaxFishSpeedX = 10
const ProgressSpeed = 5

let fishingPaddleElement: HTMLElement
let fishPaddleElement: HTMLElement
let progressBarElement: HTMLElement
let progressElement: HTMLElement

let isFishing = false
let paddleX = 0
let fishX = 0
let fishSpeedX = 0
let progress = 50

let paddleWidth = 48
let fishWidth = 24

let fishingBarWidth = 0
let fishPxPerPercentX = 0
let paddlePxPerPercentX = 0

export function startFishing() {
    progressBarElement = document.getElementById("fishing-progress-bar")!
    progressElement = document.getElementById("fishing-progress")!

    const fishingBar = document.getElementById("fishing-bar")!
    fishingBarWidth = fishingBar.clientWidth

    fishingPaddleElement = document.getElementById("fishing-paddle")!
    fishingPaddleElement.style.width = `${paddleWidth}px`

    fishPaddleElement = document.getElementById("fish-paddle")!
    fishPaddleElement.style.width = `${fishWidth}px`

    paddlePxPerPercentX = (fishingBarWidth - paddleWidth) / 100
    fishPxPerPercentX = (fishingBarWidth - fishWidth) / 100

    fishX = 0
    fishSpeedX = 1

    isFishing = true
}

export function endFishing() {
    isFishing = false
}

export function updateFishingMinigame(tDelta: number) {
    if (!isFishing) {
        return
    }

    fishX += fishSpeedX * MaxFishSpeedX * tDelta
    if (fishX <= 0) {
        fishX = 0
        fishSpeedX = 1
    } else if (fishX >= 100) {
        fishX = 100
        fishSpeedX = -1
    }
    const fishMinX = fishX * fishPxPerPercentX
    const fishMaxX = fishMinX + fishWidth

    let speedX = 0
    if (isKeyPressed("ArrowLeft") || isKeyPressed("a")) {
        speedX = -1
    } else if (isKeyPressed("ArrowRight") || isKeyPressed("d")) {
        speedX = 1
    }

    paddleX += speedX * MaxPaddleSpeedX * tDelta
    paddleX = clamp(paddleX, 0, 100)
    const paddleMinX = paddleX * paddlePxPerPercentX
    const paddleMaxX = paddleMinX + paddleWidth

    if (fishMinX >= paddleMinX && fishMaxX <= paddleMaxX) {
        progress += ProgressSpeed * tDelta
        if (progress >= 100) {
            progress = 100
        }
    } else {
        progress -= ProgressSpeed * tDelta
        if (progress <= 0) {
            progress = 0
        }
    }

    const progressWidth = (progressBarElement.clientWidth / 100) * progress

    fishPaddleElement.style.left = `${fishMinX}px`
    fishingPaddleElement.style.left = `${paddleMinX}px`
    progressElement.style.width = `${progressWidth}px`
}
