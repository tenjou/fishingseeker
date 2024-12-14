import { ItemConfigs, ItemId } from "../configs/item-configs"
import { addGold, haveGold } from "../game/resources"

export function buy(itemId: ItemId) {
    const itemCfg = ItemConfigs[itemId]

    if (!haveGold(itemCfg.price)) {
        return
    }

    addGold(-itemCfg.price)
}
