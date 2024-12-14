import { ItemConfigs, ItemId } from "../configs/item-configs"
import { getState, updateState } from "../state"

export function equip(itemId: ItemId) {
    const { codex, equipment } = getState()

    const itemCodex = codex.items
    const item = itemCodex[itemId]
    if (!item) {
        console.error(`No such item in the codex: ${itemId}`)
        return
    }

    equipment.rod = { itemId }

    updatePower()
}

export function updatePower() {
    const { equipment } = getState()

    let power = 0

    if (equipment.rod) {
        const itemCfg = ItemConfigs[equipment.rod.itemId]
        power += itemCfg.power
    }

    updateState({
        power,
    })
}
