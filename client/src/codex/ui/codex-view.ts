import { FishKeys } from "../../configs/fish-configs"
import { HTMLComponent } from "../../dom"
import { getState } from "../../state"
import "./codex-entry"
import { CodexEntryElement } from "./codex-entry"

const template = document.createElement("template")
template.className = "flex column gap-2"
template.innerHTML = html`
    <div id="codex-entries" class="flex column gap-2"></div>

    <close-button></close-button>
`

export class CodexViewElement extends HTMLComponent {
    constructor() {
        super(template)
    }

    connectedCallback(): void {
        super.connectedCallback()
    }

    load() {
        const { codex } = getState()

        const container = this.getElement("#codex-entries")
        this.syncElementEntries("codex-entry", FishKeys.length, container)
        for (let n = 0; n < container.children.length; n += 1) {
            const fishId = FishKeys[n]
            const element = container.children[n] as CodexEntryElement
            element.load(fishId, codex[fishId])
        }
    }
}

customElements.define("codex-view", CodexViewElement)
