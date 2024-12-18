import { ZoneId } from "./zone-configs"

export type QuestId = "zone-1-fish" | "zone-2-fish"

export interface QuestConfig {
    id: QuestId
    objective: {
        type: "zone-catch-all-fish"
        zoneId: ZoneId
    }
    reward: {
        xp: number
        gold: number
    }
}

export const QuestConfigs: Record<QuestId, QuestConfig> = {
    "zone-1-fish": {
        id: "zone-1-fish",
        objective: {
            type: "zone-catch-all-fish",
            zoneId: "zone_1",
        },
        reward: {
            xp: 100,
            gold: 100,
        },
    },
    "zone-2-fish": {
        id: "zone-2-fish",
        objective: {
            type: "zone-catch-all-fish",
            zoneId: "zone_2",
        },
        reward: {
            xp: 100,
            gold: 100,
        },
    },
}

export const QuestKeys = Object.keys(QuestConfigs) as QuestId[]
