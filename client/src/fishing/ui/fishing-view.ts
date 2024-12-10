import { HTMLComponent } from "../../dom"

const template = document.createElement("template")
template.className = "flex"
template.innerHTML = html`
    <div class="flex column pt-4">
        <div id="fishing-bar" class="relative width-300px height-32px border border-radius">
            <div id="fishing-paddle" class="absolute height-100 bg-blue p-1 border border-radius"></div>
            <div id="fish-paddle" class="absolute height-100 bg-gray p-1 border border-radius"></div>
        </div>

        <div id="fishing-progress-bar" class="mt-2 height-16px border">
            <div id="fishing-progress" class="height-100 bg-gray"></div>
        </div>
    </div>
`

export class FishingViewElement extends HTMLComponent {
    constructor() {
        super(template)
    }
}

customElements.define("fishing-view", FishingViewElement)
