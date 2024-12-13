import { HTMLComponent } from "../../dom"

const template = document.createElement("template")
template.className = "flex column gap-2"
template.innerHTML = html`
    <div class="flex gap-2">
        <close-button></close-button>
    </div>
`

export class ShopViewElement extends HTMLComponent {
    constructor() {
        super(template)
    }

    load() {}
}

customElements.define("shop-view", ShopViewElement)
