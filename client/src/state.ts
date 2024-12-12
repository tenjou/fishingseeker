import { SaveFile } from "./types"

let state: SaveFile

export function loadState(newState: SaveFile) {
    state = newState
}

export function getState() {
    return state
}

export function updateState(updatedState: Partial<SaveFile>) {
    state = {
        ...state,
        ...updatedState,
    }
}

export function createState(): SaveFile {
    return {
        name: "Tenjou",
        xp: 0,
        level: 1,
        energy: 10,
        tCurr: 0,
        tEnergyNext: 0,
        view: "home",
        fishingResult: {
            fishId: "",
            size: 0,
        },
    }
}

export function saveState() {}
