import { FishConfigs, FishKeys } from "../configs/fish-config"
import { emit } from "../events"
import { randomItem } from "../utils"
import { addXp } from "../game/xp"
import { getEnergy, useEnergy } from "../game/energy"

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
