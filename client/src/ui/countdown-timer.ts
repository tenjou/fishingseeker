import { HTMLComponent } from "../dom"
import { getPrettyTime } from "../utils"

const template = document.createElement("template")
template.innerHTML = html``

export class CountdownTimerElement extends HTMLComponent {
    tEnd = 0

    constructor() {
        super(template)
    }

    update(tEnd: number) {
        this.tEnd = tEnd

        this.setInterval(() => this.updateProgress(), 1000 / 30)
    }

    updateProgress() {
        let tRemaining = this.tEnd - Date.now()
        if (tRemaining <= 0) {
            tRemaining = 0
            this.clearInterval()
        }

        this.setText("", getPrettyTime(tRemaining))
    }
}

customElements.define("countdown-timer", CountdownTimerElement)
