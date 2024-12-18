import { FishId } from "../configs/fish-configs"
import { QuestConfigs, QuestId } from "../configs/quest-configs"
import { ZoneConfigs, ZoneId } from "../configs/zone-configs"
import { emit } from "../events"
import { addGold } from "../game/resources"
import { addXp } from "../game/xp"
import { getState } from "../state"

export function progressFishQuest(zoneId: ZoneId, fishId: FishId) {}

export function canCompleteQuest(questId: QuestId) {
    const { codex } = getState()
    const { objective } = QuestConfigs[questId]

    switch (objective.type) {
        case "zone-catch-all-fish": {
            const zoneCfg = ZoneConfigs[objective.zoneId]
            const fishCodex = codex.fish

            for (const zoneFish of zoneCfg.fishes) {
                if (!fishCodex[zoneFish.fishId]) {
                    return false
                }
            }
            break
        }
    }

    return true
}

export function completeQuest(questId: QuestId) {
    if (!canCompleteQuest(questId)) {
        return
    }

    const { questsCompleted } = getState()

    if (questsCompleted[questId]) {
        console.error(`Quest already completed`, questId)
        return
    }

    const questCfg = QuestConfigs[questId]

    addXp(questCfg.reward.xp)
    addGold(questCfg.reward.gold)

    questsCompleted[questId] = true

    emit("quest-completed", questId)
}
