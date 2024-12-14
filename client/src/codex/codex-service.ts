import { FishId } from "../configs/fish-configs"
import { ItemId } from "../configs/item-configs"
import { getState } from "../state"

export function updateFishingCodexEntry(fishId: FishId, size: number) {
    const { codex } = getState()

    const fishCodex = codex.fish
    const fishEntry = fishCodex[fishId]
    if (fishEntry) {
        fishEntry.count += 1
        if (size > fishEntry.largestSize) {
            fishEntry.largestSize = size
        }
    } else {
        fishCodex[fishId] = {
            count: 1,
            largestSize: size,
        }
    }
}

export function updateItemCodex(itemId: ItemId) {
    const { codex } = getState()

    const itemCodex = codex.items
    const itemEntry = itemCodex[itemId]
    if (itemEntry) {
        itemEntry.count += 1
    } else {
        itemCodex[itemId] = {
            count: 1,
        }
    }
}
