import { QuestKeys } from "../../configs/quest-configs"
import { HTMLComponent } from "../../dom"
import { getState } from "../../state"
import "./quest-entry"
import { QuestEntryElement } from "./quest-entry"

const template = document.createElement("template")
template.className = "flex column gap-2"
template.innerHTML = html`
    <div id="quests" class="flex column gap-2"></div>

    <close-button></close-button>
`

export class QuestsViewElement extends HTMLComponent {
    constructor() {
        super(template)
    }

    connectedCallback(): void {
        super.connectedCallback()

        this.subscribe("quest-completed", () => this.update())
    }

    load() {
        this.update()
    }

    update() {
        const { questsCompleted } = getState()

        const questsAvailable = QuestKeys.filter((questId) => !questsCompleted[questId])

        const questsContainer = this.getElement("#quests")
        this.syncElementEntries("quest-entry", questsAvailable.length, questsContainer)
        for (let n = 0; n < questsAvailable.length; n += 1) {
            const questId = questsAvailable[n]
            const element = questsContainer.children[n] as QuestEntryElement
            element.update(questId)
        }
    }
}

customElements.define("quests-view", QuestsViewElement)
