import { HTMLComponent } from "../../dom"

const template = document.createElement("template")
template.className = "flex column gap-2"
template.innerHTML = html`
    results-from-fishing

    <close-button></close-button>
`

export class FishingResultsElement extends HTMLComponent {
    constructor() {
        super(template)
    }

    load() {}
}

customElements.define("fishing-results", FishingResultsElement)
