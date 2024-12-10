import { HTMLComponent } from "../../dom"
import { startFishing } from "../minigame"

const template = document.createElement("template")
template.className = "flex"
template.innerHTML = html`
    <div class="flex column pt-4 gap-2">
        <div id="fishing-bar" class="relative width-300px height-32px border border-radius">
            <div id="fishing-paddle" class="absolute height-100 bg-blue p-1 border border-radius"></div>
            <div id="fish-paddle" class="absolute height-100 bg-gray p-1 border border-radius"></div>
        </div>

        <div id="fishing-progress-bar" class="height-16px border">
            <div id="fishing-progress" class="height-100 bg-gray"></div>
        </div>

        <back-button></back-button>
    </div>
`

export class FishingViewElement extends HTMLComponent {
    constructor() {
        super(template)
    }

    load() {
        startFishing()
    }
}

customElements.define("fishing-view", FishingViewElement)
