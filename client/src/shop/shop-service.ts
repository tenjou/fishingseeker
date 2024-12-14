import { updateItemCodex } from "../codex/codex-service"
import { ItemConfigs, ItemId } from "../configs/item-configs"
import { equip } from "../equipment/equipment-service"
import { addGold, haveGold } from "../game/resources"

export function buy(itemId: ItemId) {
    const itemCfg = ItemConfigs[itemId]

    if (!haveGold(itemCfg.price)) {
        return
    }

    updateItemCodex(itemId)
    addGold(-itemCfg.price)

    if (itemCfg.type === "rod") {
        equip(itemId)
    }
}
