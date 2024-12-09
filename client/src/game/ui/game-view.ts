import { HTMLComponent } from "../../dom"
import { getState } from "../../state"
import { CountdownTimerElement } from "../../ui/countdown-timer"
import { EnergyMax } from "../energy"
import { canFish, fish } from "../fishing"
import { startFishing } from "../minigame"

const template = document.createElement("template")
template.innerHTML = html`
    <div class="p-4">
        <div class="flex">
            <span>XP</span>
            <span id="xp-value"></span>
        </div>

        <div class="flex">
            <span>Energy</span>
            <span id="energy-value"></span>
            <countdown-timer id="energy-timer"></countdown-timer>
        </div>

        <button id="fish">Fish</button>

        <div class="flex pt-4">
            <div id="fishing-bar" class="relative width-300px height-32px border border-radius">
                <div id="fishing-paddle" class="absolute height-100 bg-blue p-1 border border-radius"></div>
                <div id="fish-paddle" class="absolute width-24px height-100 bg-gray p-1 border border-radius"></div>
            </div>
        </div>
    </div>
`

export class GameViewElement extends HTMLComponent {
    constructor() {
        super(template)
    }

    connectedCallback() {
        super.connectedCallback()

        const button = this.getElement("#fish")
        button.onclick = () => {
            fish()
            startFishing()
        }

        this.subscribe("xp-updated", () => this.update())
        this.subscribe("energy-updated", () => {
            this.update()

            const fishingEnabled = canFish()
            this.toggleClass("#fish", "disabled", !fishingEnabled)
        })

        this.update()
    }

    update() {
        const { energy, tEnergyNext, xp } = getState()

        this.setText("#xp-value", xp)
        this.setText("#energy-value", `${energy}/${EnergyMax}`)

        this.getElement<CountdownTimerElement>("#energy-timer").update(tEnergyNext)
        this.toggleClass("#energy-timer", "hide", tEnergyNext === 0)
    }
}

customElements.define("game-view", GameViewElement)
