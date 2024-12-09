import { emit } from "../events"
import { getState } from "../state"

export function addXp(amount: number) {
    const state = getState()

    state.xp += amount

    emit("xp-updated", state.xp)
}
