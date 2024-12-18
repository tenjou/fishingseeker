import { QuestConfigs, QuestId } from "../../configs/quest-configs"
import { HTMLComponent } from "../../dom"
import { canCompleteQuest, completeQuest } from "../quest-service"

const template = document.createElement("template")
template.className = "flex gap-2"
template.innerHTML = html`
    <div class="flex column">
        <div id="name" class="bold"></div>
        <div id="progress">0/1</div>
    </div>
    <button id="complete">Complete</button>
`

export class QuestEntryElement extends HTMLComponent {
    constructor() {
        super(template)
    }

    update(questId: QuestId) {
        const questCfg = QuestConfigs[questId]

        this.setText("#name", questId)
        this.getElement("#complete").onclick = () => completeQuest(questId)
        this.toggleClass("#complete", "disabled", !canCompleteQuest(questId))

        switch (questCfg.objective) {
        }
    }
}

customElements.define("quest-entry", QuestEntryElement)
