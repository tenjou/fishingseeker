import { CodexEntry } from "./codex/codex-types"
import { ZoneId } from "./configs/zone-configs"
import { EquipmentEntry } from "./equipment/equipment-types"
import { ViewType } from "./view"
import { ZoneEntry } from "./zone/zones-types"

export interface SaveFile {
    name: string
    xp: number
    level: number
    energy: number
    gold: number
    power: number
    tCurr: number
    tEnergyNext: number
    view: ViewType
    fishingResult: {
        fishId: string
        size: number
        gold: number
    }
    currZone: ZoneId
    zones: Record<ZoneId, ZoneEntry>
    codex: Record<string, CodexEntry>
    equipment: {
        rod: EquipmentEntry | null
        bait: EquipmentEntry | null
    }
}
