import "./codex/ui/codex-view"
import { emit } from "./events"
import { updateFishingMinigame } from "./fishing/fishing"
import "./fishing/ui/fishing-view"
import "./game/ui/home-view"
import { loadInput } from "./input"
import "./quest/ui/quests-view"
import "./shop/ui/shop-view"
import { createState, getState, loadState, saveState } from "./state"
import "./style.css"
import "./ui/back-button"
import "./ui/close-button"
import "./ui/countdown-timer"
import { loadView } from "./view"
import "./zone/ui/zones-view"

let tPrev = 0
let tLastSave = 0
let tAccumulator = 0

function load() {
    const state = createState()
    loadState(state)

    window.addEventListener("keydown", (event) => {
        emit("key-down", event.key)
    })
    window.addEventListener("keyup", (event) => {
        emit("key-up", event.key)
    })

    loadInput()
    loadView(state.view)

    tPrev = Date.now()
    tLastSave = Date.now()

    setInterval(update, 1000 / 60)
}

function update() {
    const state = getState()

    const tNow = Date.now()
    let tDelta = tNow - tPrev
    if (tDelta <= 0) {
        tPrev = tNow
        console.log("strange tDelta", tDelta, tNow, tPrev)
        return
    }

    tPrev = tNow
    tAccumulator += tDelta

    if (tAccumulator > 60000) {
        tAccumulator = 60000
        console.log("cut")
    }

    const timeStep = Math.min(tDelta, 50)
    const timeStepF = 1 / timeStep

    while (tAccumulator > timeStep) {
        tAccumulator -= timeStep
        state.tCurr += timeStep

        updateFishingMinigame(timeStepF)
    }

    const tLastSaveDiff = tNow - tLastSave
    if (tLastSaveDiff >= 60 * 1000) {
        tLastSave = tNow
        saveState()
    }
}

document.body.onload = load

declare global {
    function html(str: TemplateStringsArray, ...values: unknown[]): string
}
