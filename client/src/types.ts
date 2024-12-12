import { CodexEntry } from "./codex/codex-types"
import { ViewType } from "./view"

export interface SaveFile {
    name: string
    xp: number
    level: number
    energy: number
    tCurr: number
    tEnergyNext: number
    view: ViewType
    fishingResult: {
        fishId: string
        size: number
    }
    codex: Record<string, CodexEntry>
}
