import { rand } from "./rand"

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
