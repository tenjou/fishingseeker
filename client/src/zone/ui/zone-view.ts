import { ZoneConfigs } from "../../configs/zone-configs"
import { HTMLComponent } from "../../dom"
import { getState } from "../../state"
import { selectView } from "../../view"

const template = document.createElement("template")
template.className = "flex column gap-2"
template.innerHTML = html`
    <div id="name"></div>
    <div id="fishes" class="flex column gap-2"></div>

    <div class="flex gap-2">
        <button id="fish">Fish</button>
        <close-button></close-button>
    </div>
`

export class ZoneViewEntry extends HTMLComponent {
    constructor() {
        super(template)
    }

    load() {
        const { currZone } = getState()

        const zoneCfg = ZoneConfigs[currZone]

        this.setText("#name", currZone)
        this.getElement("#fish").onclick = () => {
            selectView("fishing")
        }

        // const fishesContainer = this.getElement("#fishes")
        // this.syncElementEntries()
    }
}

customElements.define("zone-view", ZoneViewEntry)
