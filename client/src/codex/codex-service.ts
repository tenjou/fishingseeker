import { getState } from "../state"

export function updateFishingCodexEntry(fishId: string, size: number) {
    const { codex } = getState()

    const fishEntry = codex[fishId]
    if (fishEntry) {
        fishEntry.count += 1
        if (size > fishEntry.largestSize) {
            fishEntry.largestSize = size
        }
    } else {
        codex[fishId] = {
            count: 1,
            largestSize: size,
        }
    }
}
