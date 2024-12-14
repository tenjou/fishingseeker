import { ItemConfigs, ItemId } from "../../configs/item-configs"
import { HTMLComponent } from "../../dom"
import { haveGold } from "../../game/resources"
import { buy } from "../shop-service"

const template = document.createElement("template")
template.className = "flex gap-2"
template.innerHTML = html`
    <img />

    <div class="flex column">
        <div id="name" class="bold"></div>
        <div id="price"></div>
    </div>

    <button id="buy">Buy</button>
`

export class ShopEntryElement extends HTMLComponent {
    constructor() {
        super(template)
    }

    load(itemId: ItemId) {
        const itemCfg = ItemConfigs[itemId]

        this.getElement("img").setAttribute("src", `/icons/${itemId}.png`)

        this.setText("#name", itemId)
        this.setText("#price", itemCfg.price)

        this.getElement("#buy").onclick = () => buy(itemId)
        this.toggleClass("#buy", "disabled", !haveGold(itemCfg.price))
    }
}

customElements.define("shop-entry", ShopEntryElement)
