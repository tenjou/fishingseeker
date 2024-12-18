import { FishId } from "./fish-configs"

export type ZoneId = "zone_1" | "zone_2"
export type ZoneDayNight = "day" | "night"
export type ZoneWeather = "sunny" | "cloudy" | "rainy"

export interface ZoneConfig {
    id: ZoneId
    seed: number
    fishes: {
        fishId: FishId
    }[]
    weathers: ZoneWeather[]
}

const defaultWeathers: ZoneWeather[] = ["sunny", "cloudy", "rainy"]

export const ZoneConfigs: Record<ZoneId, ZoneConfig> = {
    zone_1: {
        id: "zone_1",
        seed: 10000000,
        fishes: [
            // {
            //     fishId: "anchovy",
            // },
            // {
            //     fishId: "fish_2",
            // },
        ],
        weathers: defaultWeathers,
    },
    zone_2: {
        id: "zone_2",
        seed: 20000000,
        fishes: [
            {
                fishId: "fish_3",
            },
            {
                fishId: "fish_4",
            },
        ],
        weathers: defaultWeathers,
    },
}

export const ZoneKeys = Object.keys(ZoneConfigs) as ZoneId[]
