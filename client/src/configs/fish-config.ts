interface FishConfig {
    id: string
    xp: number
}

export const FishConfigs: Record<string, FishConfig> = {
    fish: {
        id: "fish",
        xp: 1,
    },
}

export const FishKeys = Object.keys(FishConfigs)
