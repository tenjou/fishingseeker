import { HTMLComponent, removeAllChildren } from "../../dom"
import "./fishing-minigame"
import { FishingMinigameElement } from "./fishing-minigame"
import "./fishing-results"
import { FishingResultsElement } from "./fishing-results"

const template = document.createElement("template")
template.className = "flex"
template.innerHTML = html``

export class FishingViewElement extends HTMLComponent {
    constructor() {
        super(template)
    }

    connectedCallback(): void {
        super.connectedCallback()

        this.subscribe("fishing-success", () => this.onFishingSuccess())
        this.subscribe("fishing-failed", () => this.onFishingFailed())
    }

    load() {
        const fishingMinigame = new FishingMinigameElement()
        this.appendChild(fishingMinigame)
        fishingMinigame.load()
    }

    onFishingSuccess() {
        removeAllChildren(this)

        const fishingResults = new FishingResultsElement()
        this.appendChild(fishingResults)
        fishingResults.load()
    }

    onFishingFailed() {}
}

customElements.define("fishing-view", FishingViewElement)
