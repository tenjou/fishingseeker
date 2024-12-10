import { emit } from "./events"
import { updateEnergy } from "./game/energy"
import { updateFishingMinigame } from "./game/minigame"
import "./game/ui/home-view"
import { loadInput } from "./input"
import { createState, getState, loadState, saveState } from "./state"
import "./style.css"
import "./ui/countdown-timer"
import "./ws"

let tPrev = 0
let tLastSave = 0
let tAccumulator = 0

function load() {
    const state = createState()
    loadState(state)

    const gameView = document.createElement("game-view")
    document.body.appendChild(gameView)

    window.addEventListener("keydown", (event) => {
        emit("key-down", event.key)
    })
    window.addEventListener("keyup", (event) => {
        emit("key-up", event.key)
    })

    loadInput()

    tPrev = Date.now()
    tLastSave = Date.now()

    setInterval(update, 1000 / 60)
}

function update() {
    const state = getState()

    const tNow = Date.now()
    let tDelta = tNow - tPrev
    if (!tDelta) {
        console.log("strange tDelta", tDelta)
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

    if (timeStep <= 0) {
        console.log("what")
    }

    while (tAccumulator > timeStep) {
        tAccumulator -= timeStep
        state.tCurr += timeStep

        if (timeStep <= 0) {
            console.log("what2")
        }

        updateEnergy()
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
