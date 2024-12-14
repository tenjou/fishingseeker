import { HTMLComponent } from "../../dom"
import { getState } from "../../state"
import { SaveFile } from "../../types"

const template = document.createElement("template")
template.className = "flex column gap-2"
template.innerHTML = html`
    <div class="flex gap-2">
        <span class="bold">Rod</span>
        <span id="rod"></span>
    </div>

    <div class="flex gap-2">
        <span class="bold">Bait</span>
        <span id="bait"></span>
    </div>
`

export class EquipmentView extends HTMLComponent {
    constructor() {
        super(template)
    }

    connectedCallback(): void {
        super.connectedCallback()

        this.update()
    }

    update() {
        this.updateEntry("rod")
        this.updateEntry("bait")
    }

    updateEntry(slot: keyof SaveFile["equipment"]) {
        const { equipment } = getState()

        const item = equipment[slot]

        this.setText(`#${slot}`, item ? item.itemId : "None")
    }
}

customElements.define("equipment-view", EquipmentView)
