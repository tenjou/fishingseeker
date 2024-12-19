import { FishCodexEntry, ItemCodexEntry } from "./codex/codex-types"
import { QuestId } from "./configs/quest-configs"
import { ZoneId } from "./configs/zone-configs"
import { EquipmentEntry } from "./equipment/equipment-types"
import { ViewType } from "./view"
import { ZoneEntry } from "./zone/zone-types"

export interface SaveFile {
    name: string
    xp: number
    level: number
    gold: number
    power: number
    tCurr: number
    view: ViewType
    fishingResult: {
        fishId: string
        size: number
        gold: number
    }
    currZone: ZoneId
    zones: Record<ZoneId, ZoneEntry>
    codex: {
        fish: Record<string, FishCodexEntry>
        items: Record<string, ItemCodexEntry>
    }
    equipment: {
        rod: EquipmentEntry | null
        bait: EquipmentEntry | null
    }
    questsCompleted: Partial<Record<QuestId, boolean>>
}
