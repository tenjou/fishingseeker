import { HTMLComponent } from "../../dom"
import "../../equipment/ui/equipment-view"
import { getState } from "../../state"
import { selectView } from "../../view"

const template = document.createElement("template")
template.className = "flex column gap-2"
template.innerHTML = html`
    <div class="flex gap-2">
        <button id="button-zones">Travel</button>
        <button id="button-shop">Shop</button>
        <button id="button-quests">Quests</button>
        <button id="button-codex">Codex</button>
    </div>

    <div class="flex gap-2">
        <span>XP</span>
        <span id="xp-value"></span>
    </div>

    <div class="flex gap-2">
        <span>Gold</span>
        <span id="gold-value"></span>
    </div>

    <div class="flex gap-2">
        <span>Power</span>
        <span id="power"></span>
    </div>

    <div class="flex gap-2">
        <span>Energy</span>
        <span id="energy-value"></span>
        <countdown-timer id="energy-timer"></countdown-timer>
    </div>

    <equipment-view></equipment-view>
`

export class HomeViewElement extends HTMLComponent {
    constructor() {
        super(template)
    }

    connectedCallback() {
        super.connectedCallback()

        this.getElement("#button-zones").onclick = () => {
            selectView("zones")
        }
        this.getElement("#button-shop").onclick = () => {
            selectView("shop")
        }
        this.getElement("#button-quests").onclick = () => {
            selectView("quests")
        }
        this.getElement("#button-codex").onclick = () => {
            selectView("codex")
        }
        // this.getElement("#fish").onclick = () => {
        //     selectView("fishing")
        // }

        this.subscribe("xp-updated", () => this.update())
        // this.subscribe("energy-updated", () => {
        //     this.update()

        //     const fishingEnabled = canFish()
        //     this.toggleClass("#fish", "disabled", !fishingEnabled)
        // })

        this.update()
    }

    update() {
        const { xp, gold, power } = getState()

        this.setText("#xp-value", xp)
        this.setText("#gold-value", gold)
        this.setText("#power", power)
    }
}

customElements.define("home-view", HomeViewElement)
