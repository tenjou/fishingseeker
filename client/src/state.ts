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
        gold: 100,
        power: 0,
        tCurr: 0,
        view: "zone",
        fishingResult: {
            fishId: "",
            size: 0,
            gold: 0,
        },
        currZone: "zone_1",
        zones: {
            zone_1: {},
            zone_2: {},
        },
        codex: {
            fish: {},
            items: {},
        },
        equipment: {
            bait: null,
            rod: null,
        },
        questsCompleted: {},
    }
}

export function saveState() {}
