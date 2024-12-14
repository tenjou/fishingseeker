import { ItemId } from "../../configs/item-configs"
import { HTMLComponent, removeAllChildren } from "../../dom"
import { getState } from "../../state"
import "./shop-entry"
import { ShopEntryElement } from "./shop-entry"

const template = document.createElement("template")
template.className = "flex column gap-2"
template.innerHTML = html`
    <div id="items" class="flex column gap-2"></div>

    <close-button></close-button>
`

export class ShopViewElement extends HTMLComponent {
    constructor() {
        super(template)
    }

    connectedCallback(): void {
        super.connectedCallback()

        this.subscribe("gold-updated", () => this.update())
    }

    load() {
        this.update()
    }

    update() {
        const container = this.getElement("#items")
        removeAllChildren(container)

        this.populateWithItem("basic_rod", true)
        this.populateWithItem("willow_rod", true)
        this.populateWithItem("steelline_rod", true)
    }

    populateWithItem(itemId: ItemId, isUnique: boolean) {
        if (isUnique) {
            const { codex } = getState()

            if (codex.items[itemId]) {
                return
            }
        }

        const shopEntry = new ShopEntryElement()
        this.getElement("#items").appendChild(shopEntry)
        shopEntry.load(itemId)
    }
}

customElements.define("shop-view", ShopViewElement)
