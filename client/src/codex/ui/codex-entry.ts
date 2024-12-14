import { HTMLComponent } from "../../dom"
import { FishCodexEntry } from "../codex-types"

const template = document.createElement("template")
template.className = "flex gap-2"
template.innerHTML = html`
    <div id="name"></div>
    <div id="count"></div>
    <div id="size"></div>
`

export class CodexEntryElement extends HTMLComponent {
    constructor() {
        super(template)
    }

    load(fishId: string, entry?: FishCodexEntry) {
        if (!entry) {
            this.setText("#name", "???")
            return
        }

        this.setText("#name", fishId)
        this.setText("#count", entry.count)
        this.setText("#size", entry.largestSize.toFixed(2))
    }
}

customElements.define("codex-entry", CodexEntryElement)
