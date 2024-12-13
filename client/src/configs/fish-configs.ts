export type FishId = "fish" | "fish_2" | "fish_3" | "fish_4"

export interface FishConfig {
    id: FishId
    xp: number
}

export const FishConfigs: Record<FishId, FishConfig> = {
    fish: {
        id: "fish",
        xp: 1,
    },
    fish_2: {
        id: "fish_2",
        xp: 2,
    },
    fish_3: {
        id: "fish_3",
        xp: 3,
    },
    fish_4: {
        id: "fish_4",
        xp: 4,
    },
}

export const FishKeys = Object.keys(FishConfigs)
