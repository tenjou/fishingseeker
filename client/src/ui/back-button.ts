import { HTMLComponent } from "../dom"
import { selectView } from "../view"

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
            selectView("zone")
        }

        this.subscribe("key-down", (key) => {
            if (key === "Escape") {
                selectView("zone")
            }
        })
    }
}

customElements.define("back-button", BackButton)
