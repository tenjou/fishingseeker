export type FishId = "fish" | "fish_2" | "fish_3" | "fish_4"

export interface FishConfig {
    id: FishId
    power: number
    xp: number
}

export const FishConfigs: Record<FishId, FishConfig> = {
    fish: {
        id: "fish",
        power: 100,
        xp: 1,
    },
    fish_2: {
        id: "fish_2",
        power: 200,
        xp: 2,
    },
    fish_3: {
        id: "fish_3",
        power: 300,
        xp: 3,
    },
    fish_4: {
        id: "fish_4",
        power: 400,
        xp: 4,
    },
}

export const FishKeys = Object.keys(FishConfigs)
