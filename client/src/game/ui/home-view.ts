import { HTMLComponent } from "../../dom"
import { getState } from "../../state"
import { CountdownTimerElement } from "../../ui/countdown-timer"
import { selectView } from "../../view"
import { EnergyMax } from "../energy"

const template = document.createElement("template")
template.className = "flex column gap-2"
template.innerHTML = html`
    <div class="flex gap-2">
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

    <zones-view></zones-view>
`

export class HomeViewElement extends HTMLComponent {
    constructor() {
        super(template)
    }

    connectedCallback() {
        super.connectedCallback()

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
        const { energy, tEnergyNext, xp, gold, power } = getState()

        this.setText("#xp-value", xp)
        this.setText("#gold-value", gold)
        this.setText("#power", power)
        this.setText("#energy-value", `${energy}/${EnergyMax}`)

        this.getElement<CountdownTimerElement>("#energy-timer").update(tEnergyNext)
        this.toggleClass("#energy-timer", "hide", tEnergyNext === 0)
    }
}

customElements.define("home-view", HomeViewElement)
