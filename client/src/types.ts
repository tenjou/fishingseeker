import { ViewType } from "./view"

export interface SaveFile {
    name: string
    xp: number
    level: number
    energy: number
    tCurr: number
    tEnergyNext: number
    view: ViewType
}
