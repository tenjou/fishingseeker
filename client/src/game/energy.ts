import { emit } from "../events"
import { getState } from "../state"

export const EnergyMax = 10
const EnergyRegenTime = 3 * 1000

export function useEnergy() {
    const state = getState()

    if (state.energy <= 0) {
        console.warn(`Do not have energy`)
        return
    }

    state.energy -= 1

    if (state.tEnergyNext === 0) {
        state.tEnergyNext = Date.now() + EnergyRegenTime
    }

    emit("energy-updated", state.energy)
}

export function getEnergy() {
    const { energy } = getState()

    return energy
}

export function updateEnergy() {
    const state = getState()

    if (state.tEnergyNext === 0) {
        return
    }

    const tCurr = Date.now()

    do {
        if (state.tEnergyNext > tCurr) {
            return
        }

        state.energy += 1

        state.tEnergyNext = 0
    } while (state.tEnergyNext > 0)

    emit("energy-updated", state.energy)
}
