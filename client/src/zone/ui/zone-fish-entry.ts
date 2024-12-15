import { FishConfigs, FishId } from "../../configs/fish-configs"
import { HTMLComponent } from "../../dom"
import { getState } from "../../state"

const template = document.createElement("template")
template.className = "flex gap-2"
template.innerHTML = html`
    <img />

    <div class="flex column">
        <div id="name"></div>
        <div id="weather-conditions"></div>
    </div>
`

export class ZoneFishEntryElement extends HTMLComponent {
    constructor() {
        super(template)
    }

    load(fishId: FishId) {
        const { codex } = getState()

        const fishEntry = codex.fish[fishId]
        const fishCfg = FishConfigs[fishId]

        this.getElement("img").setAttribute("src", `/icons/${fishId}.png`)
        this.setText("#name", fishEntry ? fishId : "???")
        this.setText("#weather-conditions", fishCfg.dayNight)
    }
}

customElements.define("zone-fish-entry", ZoneFishEntryElement)
