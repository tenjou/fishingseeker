import { FishId } from "./fish-configs"

export type ZoneId = "zone_1" | "zone_2"
export type ZoneWeather = "sunny" | "cloudy" | "rainy"

export interface ZoneConfig {
    id: ZoneId
    fishes: {
        fishId: FishId
    }[]
    weathers: ZoneWeather[]
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
        weathers: ["sunny", "cloudy"],
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
        weathers: ["sunny", "cloudy"],
    },
}

export const ZoneKeys = Object.keys(ZoneConfigs) as ZoneId[]
