import { HTMLComponent } from "../../dom"
import { getState } from "../../state"

const template = document.createElement("template")
template.className = "flex column gap-2"
template.innerHTML = html`
    <div class="flex gap-2">
        <div>Name</div>
        <div id="name"></div>
    </div>

    <div class="flex gap-2">
        <div>Size</div>
        <div id="size"></div>
    </div>

    <close-button></close-button>
`

export class FishingResultsElement extends HTMLComponent {
    constructor() {
        super(template)
    }

    load() {
        const { fishingResult } = getState()

        this.setText("#name", fishingResult.fishId)
        this.setText("#size", fishingResult.size.toFixed(2))
    }
}

customElements.define("fishing-results", FishingResultsElement)
