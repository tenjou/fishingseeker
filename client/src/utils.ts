import { rand } from "./math/rand"

export function randomNumber(min: number, max: number) {
    return (rand() * (max - min + 1) + min) << 0
}

export function randomItem<T>(array: T[] | readonly T[]) {
    return array[randomNumber(0, array.length - 1)]
}

export function randomIndex<T>(array: T[]) {
    return randomNumber(0, array.length - 1)
}

export function popRandomIndex<T>(array: T[]) {
    const randomIndex = randomNumber(0, array.length - 1)
    const item = array[randomIndex]
    array[randomIndex] = array[array.length - 1]
    array.pop()

    return item
}

export function shuffle<T>(array: T[]) {
    for (let n = array.length - 1; n > 0; n -= 1) {
        const m = Math.floor(rand() * (n + 1))
        const temp = array[n]
        array[n] = array[m]
        array[m] = temp
    }

    return array
}

export function roll(chance: number, dice = 100) {
    return randomNumber(1, dice) <= chance
}

export function clamp(value: number, min: number, max: number) {
    if (value > max) {
        return max
    } else if (value < min) {
        return min
    }

    return value
}

export function assert(expr: boolean, error: string) {
    if (expr) {
        throw new Error(error)
    }
}

export function removeAtIndex<T>(array: T[], index: number) {
    array[index] = array[array.length - 1]
    array.pop()
}

export function findAndRemoveIndex(array: number[], indexToRemove: number) {
    const indexFound = array.indexOf(indexToRemove)
    if (indexFound === -1) {
        console.error(`Failed to removeIndex for array: ${JSON.stringify(array)}, with index: ${indexToRemove}`)
        return
    }

    array[indexFound] = array[array.length - 1]
    array.pop()
}

export function getPrettyTime(timeInMs: number, floor = false) {
    timeInMs = floor ? Math.floor(timeInMs / 1000) : Math.ceil(timeInMs / 1000)

    const seconds = timeInMs % 60
    const minutes = (timeInMs / 60) | 0
    const hours = (timeInMs / 3600) | 0

    if (hours > 0) {
        return `${hours}h ${minutes}m ${seconds}s`
    }

    if (minutes > 0) {
        return `${minutes}m ${seconds}s`
    }

    return `${seconds}s`
}

export function getPrettyCount(count: number) {
    if (count > 1000) {
        const thousands = (count / 1000).toFixed(1)
        return `${thousands}k`
    }

    return `${count}`
}

export function assertUnreachable(_x: never): never {
    throw new Error("never")
}
