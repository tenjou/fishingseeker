import { HTMLComponent } from "../dom"
import { backView } from "../view"

const template = document.createElement("template")
template.className = "flex"
template.innerHTML = html`
    <button>Back</button>
`

export class BackButton extends HTMLComponent {
    constructor() {
        super(template)
    }

    connectedCallback() {
        super.connectedCallback()

        this.onclick = () => {
            backView()
        }
    }
}

customElements.define("back-button", BackButton)
