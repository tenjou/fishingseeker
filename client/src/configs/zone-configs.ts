import { FishId } from "./fish-configs"

export type ZoneId = "zone_1" | "zone_2"

export interface ZoneConfig {
    id: ZoneId
    fishes: {
        fishId: FishId
    }[]
}

export const ZoneConfigs: Record<ZoneId, ZoneConfig> = {
    zone_1: {
        id: "zone_1",
        fishes: [
            {
                fishId: "fish",
            },
            {
                fishId: "fish_2",
            },
        ],
    },
    zone_2: {
        id: "zone_2",
        fishes: [
            {
                fishId: "fish_3",
            },
            {
                fishId: "fish_4",
            },
        ],
    },
}

export const ZoneKeys = Object.keys(ZoneConfigs) as ZoneId[]
