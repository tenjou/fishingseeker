import { ZoneConfigs } from "../../configs/zone-configs"
import { HTMLComponent } from "../../dom"
import { getState } from "../../state"
import { selectView } from "../../view"
import { getDayNight, getWeather } from "../zone-service"
import "./zone-fish-entry"
import { ZoneFishEntryElement } from "./zone-fish-entry"

const template = document.createElement("template")
template.className = "flex column gap-2"
template.innerHTML = html`
    <div id="name" class="bold"></div>

    <div class="flex gap-2">
        <div id="weather"></div>
        <div>-></div>
        <div id="weather-next"></div>
    </div>

    <div id="fishes" class="flex column gap-2"></div>

    <div class="flex gap-2">
        <button id="fish">Fish</button>
        <close-button></close-button>
    </div>
`

export class ZoneViewElement extends HTMLComponent {
    constructor() {
        super(template)
    }

    load() {
        const { currZone } = getState()

        const zoneCfg = ZoneConfigs[currZone]

        const dayNight = getDayNight()
        const weather = getWeather(zoneCfg)
        const dayNightNext = getDayNight(1)
        const weatherNext = getWeather(zoneCfg, 1)

        this.setText("#name", currZone)
        this.setText("#weather", `${dayNight}, ${weather}`)
        this.setText("#weather-next", `${dayNightNext}, ${weatherNext}`)

        const fishesContainer = this.getElement("#fishes")
        this.syncElementEntries("zone-fish-entry", zoneCfg.fishes.length, fishesContainer)
        for (let n = 0; n < zoneCfg.fishes.length; n += 1) {
            const zoneFishCfg = zoneCfg.fishes[n]
            const element = fishesContainer.children[n] as ZoneFishEntryElement
            element.load(zoneFishCfg.fishId)
        }

        this.getElement("#fish").onclick = () => {
            selectView("fishing")
        }
    }
}

customElements.define("zone-view", ZoneViewElement)
