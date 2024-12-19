export function assert(expr: boolean, error: string) {
    if (expr) {
        throw new Error(error)
    }
}

export function removeAtIndex<T>(array: T[], index: number) {
    array[index] = array[array.length - 1]
    array.pop()
}

export function countItems<T>(array: T[], func: (item: T) => boolean) {
    let count = 0

    for (const item of array) {
        if (func(item)) {
            count += 1
        }
    }

    return count
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
