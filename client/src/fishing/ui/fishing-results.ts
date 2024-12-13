import { HTMLComponent } from "../../dom"
import { getState } from "../../state"
import { selectView } from "../../view"

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

    <div class="flex gap-2">
        <div>Gold</div>
        <div id="gold"></div>
    </div>

    <div class="flex gap-2">
        <button id="fish-again">Fish Again</button>
        <close-button></close-button>
    </div>
`

export class FishingResultsElement extends HTMLComponent {
    constructor() {
        super(template)
    }

    load() {
        const { fishingResult } = getState()

        this.setText("#name", fishingResult.fishId)
        this.setText("#size", fishingResult.size.toFixed(2))
        this.setText("#gold", fishingResult.gold)

        this.getElement("#fish-again").onclick = () => selectView("fishing", undefined, true)
    }
}

customElements.define("fishing-results", FishingResultsElement)
