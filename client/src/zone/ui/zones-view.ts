import { ZoneKeys } from "../../configs/zone-configs"
import { HTMLComponent } from "../../dom"
import { getState } from "../../state"
import "./zone-entry"
import { ZoneEntryElement } from "./zone-entry"
import "./zone-view"

const template = document.createElement("template")
template.className = "flex column gap-2"
template.innerHTML = html`
    <div id="zones-entries" class="flex column gap-2"></div>
`

export class ZonesViewElement extends HTMLComponent {
    constructor() {
        super(template)
    }

    connectedCallback(): void {
        super.connectedCallback()

        this.load()
    }

    load() {
        const { zones } = getState()

        const container = this.getElement("#zones-entries")
        this.syncElementEntries("zone-entry", ZoneKeys.length, container)
        for (let n = 0; n < container.children.length; n += 1) {
            const zoneId = ZoneKeys[n]
            const element = container.children[n] as ZoneEntryElement
            element.load(zoneId)
        }
    }
}

customElements.define("zones-view", ZonesViewElement)
