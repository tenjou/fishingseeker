import { updateFishingCodexEntry } from "../codex/codex-service"
import { FishConfigs, FishId } from "../configs/fish-configs"
import { ZoneConfigs } from "../configs/zone-configs"
import { emit } from "../events"
import { addGold } from "../game/resources"
import { addXp } from "../game/xp"
import { isKeyPressed } from "../input"
import { clamp, randomItem, randomNumber } from "../math/utils"
import { getState, updateState } from "../state"
import { getDayNight, getWeather } from "../zone/zone-service"

const MaxPaddleSpeedX = 20
const MaxFishSpeedX = 10
const PositiveProgressSpeed = 5
const NegativeProgressSpeed = 5

let fishingPaddleElement: HTMLElement
let fishPaddleElement: HTMLElement
let progressBarElement: HTMLElement
let progressElement: HTMLElement

let currFishId: FishId | null = null
let paddleX = 0
let fishX = 0
let fishSpeedX = 0
let progress = 50

let paddleWidth = 50
let fishWidth = 24

let fishingBarWidth = 0
let fishPxPerPercentX = 0
let paddlePxPerPercentX = 0

export function startFishing() {
    const { currZone } = getState()

    const zoneCfg = ZoneConfigs[currZone]
    const dayNight = getDayNight()
    const weather = getWeather(zoneCfg)

    const possibleFish = zoneCfg.fishes.filter((entry) => {
        const fishCfg = FishConfigs[entry.fishId]

        if (fishCfg.dayNight === "any" || fishCfg.dayNight === dayNight) {
            return true
        }
        if (fishCfg.weather === "any" || fishCfg.weather === weather) {
            return true
        }

        return false
    })

    console.log(possibleFish)
    currFishId = randomItem(possibleFish).fishId

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

    progress = 50
    paddleX = 0
    fishX = 0
    fishSpeedX = 1
}

export function endFishing() {
    currFishId = null
}

export function updateFishingMinigame(tDelta: number) {
    if (!currFishId) {
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
        progress += PositiveProgressSpeed * tDelta
        if (progress >= 100) {
            progress = 100
            fishingSuccessful()
        }
    } else {
        progress -= NegativeProgressSpeed * tDelta
        if (progress <= 0) {
            progress = 0
            fishingFailed()
        }
    }

    const progressWidth = (progressBarElement.clientWidth / 100) * progress

    fishPaddleElement.style.left = `${fishMinX}px`
    fishingPaddleElement.style.left = `${paddleMinX}px`
    progressElement.style.width = `${progressWidth}px`
}

function fishingSuccessful() {
    if (!currFishId) {
        console.error(`No fish ir currently being fished`)
        return
    }

    const fishCfg = FishConfigs[currFishId]
    const size = generateFishSize()
    const gold = 1

    updateState({
        fishingResult: {
            fishId: currFishId,
            size,
            gold,
        },
    })

    addGold(gold)
    addXp(fishCfg.xp)
    updateFishingCodexEntry(currFishId, size)
    endFishing()

    emit("fishing-success", currFishId)
}

function fishingFailed() {
    endFishing()

    emit("fishing-failed")
}

function generateFishSize() {
    const MaxRoll = 100000000
    const ExtraPossibleSize = 0.5

    const roll = randomNumber(0, MaxRoll) / MaxRoll
    const skewed = Math.pow(roll, 2)
    const size = 0.6 + skewed * ExtraPossibleSize

    return size
}
