interface State {
    name: string
    xp: number
    level: number
    energy: number
    tCurr: number
    tEnergyNext: number
}

let state: State

export function loadState(newState: State) {
    state = newState
}

export function getState() {
    return state
}

export function updateState(updatedState: Partial<State>) {
    state = {
        ...state,
        ...updatedState,
    }
}

export function createState(): State {
    return {
        name: "Tenjou",
        xp: 0,
        level: 1,
        energy: 10,
        tCurr: 0,
        tEnergyNext: 0,
    }
}

export function saveState() {}
