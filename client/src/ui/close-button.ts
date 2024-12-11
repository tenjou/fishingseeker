import { HTMLComponent } from "../dom"
import { closeView } from "../view"

const template = document.createElement("template")
template.className = "flex"
template.innerHTML = html`
    <button>Close</button>
`

export class CloseButton extends HTMLComponent {
    constructor() {
        super(template)
    }

    connectedCallback() {
        super.connectedCallback()

        this.onclick = () => {
            closeView()
        }
    }
}

customElements.define("close-button", CloseButton)