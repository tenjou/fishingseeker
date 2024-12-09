import { isKeyPressed } from "../input"
import { clamp } from "./../utils"

const MaxPaddleSpeedX = 20
const MaxFishSpeedX = 10

let fishingPaddleElement: HTMLElement
let fishPaddleElement: HTMLElement

let isFishing = false
let paddleX = 0
let fishX = 0
let fishSpeedX = 0

let fishingBarWidth = 0
let fishPxPerPercentX = 0
let paddlePxPerPercentX = 0

export function startFishing() {
    const paddleWidth = 48
    const fishWidth = 24

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
    const fishPosX = fishX * fishPxPerPercentX

    let speedX = 0
    if (isKeyPressed("ArrowLeft") || isKeyPressed("a")) {
        speedX = -1
    } else if (isKeyPressed("ArrowRight") || isKeyPressed("d")) {
        speedX = 1
    }

    paddleX += speedX * MaxPaddleSpeedX * tDelta
    paddleX = clamp(paddleX, 0, 100)
    const paddlePosX = paddleX * paddlePxPerPercentX

    // fishX += fishSpeedX * (MaxFishSpeedX * fishPxPerPercentX) * tDelta
    // if(fishX <= 0) {
    //     fishX = 0
    //     fishSpeedX = 1
    // }
    // else if(fishX >= fishi)

    // paddleX += speedX * (MaxPaddleSpeedX * paddlePxPerPercentX) * tDelta

    fishPaddleElement.style.left = `${fishPosX}px`
    fishingPaddleElement.style.left = `${paddlePosX}px`
}
