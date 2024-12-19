import { FishKeys } from "../../configs/fish-configs"
import { HTMLComponent } from "../../dom"
import { getState } from "../../state"
import { countItems } from "../../utils"
import "./codex-entry"
import { CodexEntryElement } from "./codex-entry"

const template = document.createElement("template")
template.className = "flex column gap-2"
template.innerHTML = html`
    <div id="progress"></div>

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

        const fishCodex = codex.fish

        const progress = countItems(FishKeys, (fishId) => !!fishCodex[fishId])
        this.setText("#progress", `${progress}/${FishKeys.length}`)

        const container = this.getElement("#codex-entries")
        this.syncElementEntries("codex-entry", FishKeys.length, container)
        for (let n = 0; n < container.children.length; n += 1) {
            const fishId = FishKeys[n]
            const element = container.children[n] as CodexEntryElement
            element.load(fishId, fishCodex[fishId])
        }
    }
}

customElements.define("codex-view", CodexViewElement)
