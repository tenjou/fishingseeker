import { FishConfigs, FishKeys } from "../configs/fish-configs"
import { emit } from "../events"
import { getEnergy, useEnergy } from "../game/energy"
import { addXp } from "../game/xp"
import { randomItem } from "../math/utils"

export function fish() {
    if (!canFish()) {
        return
    }

    const fishId = randomItem(FishKeys)
    const fishCfg = FishConfigs[fishId]

    useEnergy()
    addXp(fishCfg.xp)

    emit("fish", fishCfg)
}

export function canFish() {
    const energy = getEnergy()

    return energy > 0
}
