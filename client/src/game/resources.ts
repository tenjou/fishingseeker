import { emit } from "../events"
import { getState, updateState } from "../state"

export function addGold(amount: number) {
    const { gold } = getState()

    let newGold = gold + amount
    if (newGold < 0) {
        newGold = 0
    }

    if (gold === newGold) {
        return
    }

    updateState({
        gold: newGold,
    })
    emit("gold-updated", newGold)
}
