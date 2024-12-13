import { ZoneId } from "../../configs/zone-configs"
import { HTMLComponent } from "../../dom"
import { switchZone } from "../zone-service"

const template = document.createElement("template")
template.className = "flex gap-2"
template.innerHTML = html`
    <div id="name"></div>
    <button id="button-enter">Enter</button>
`

export class ZoneEntryElement extends HTMLComponent {
    constructor() {
        super(template)
    }

    load(zoneId: ZoneId) {
        this.setText("#name", zoneId)
        this.getElement("#button-enter").onclick = () => {
            switchZone(zoneId)
        }
    }
}

customElements.define("zone-entry", ZoneEntryElement)
