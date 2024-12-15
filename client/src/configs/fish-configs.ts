import { ZoneDayNight } from "./zone-configs"

export type FishId = "anchovy" | "fish_2" | "fish_3" | "fish_4"
export type DayNightCondition = "any" | ZoneDayNight

export interface FishConfig {
    id: FishId
    power: number
    xp: number
    dayNight: DayNightCondition
}

export const FishConfigs: Record<FishId, FishConfig> = {
    anchovy: {
        id: "anchovy",
        power: 100,
        xp: 1,
        dayNight: "any",
    },
    fish_2: {
        id: "fish_2",
        power: 200,
        xp: 2,
        dayNight: "any",
    },
    fish_3: {
        id: "fish_3",
        power: 300,
        xp: 3,
        dayNight: "any",
    },
    fish_4: {
        id: "fish_4",
        power: 400,
        xp: 4,
        dayNight: "any",
    },
}

export const FishKeys = Object.keys(FishConfigs)
