import { ZoneConfigs } from "../../configs/zone-configs"
import { HTMLComponent } from "../../dom"
import { getState } from "../../state"
import { selectView } from "../../view"
import { getWeather, isDaylight } from "../zone-service"

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

        const dayNight = isDaylight() ? "day" : "night"
        const weather = getWeather(zoneCfg)

        const dayNightNext = isDaylight(1) ? "day" : "night"
        const weatherNext = getWeather(zoneCfg, 1)

        this.setText("#name", currZone)
        this.setText("#weather", `${dayNight}, ${weather}`)
        this.setText("#weather-next", `${dayNightNext}, ${weatherNext}`)

        this.getElement("#fish").onclick = () => {
            selectView("fishing")
        }

        // const fishesContainer = this.getElement("#fishes")
        // this.syncElementEntries()
    }
}

customElements.define("zone-view", ZoneViewElement)
