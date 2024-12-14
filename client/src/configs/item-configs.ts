export type ItemId = "basic_rod" | "willow_rod" | "steelline_rod"

export interface ItemConfig {
    itemId: ItemId
    type: "rod"
    price: number
    power: number
}

export const ItemConfigs: Record<ItemId, ItemConfig> = {
    basic_rod: {
        itemId: "basic_rod",
        type: "rod",
        price: 50,
        power: 100,
    },
    willow_rod: {
        itemId: "willow_rod",
        type: "rod",
        price: 100,
        power: 200,
    },
    steelline_rod: {
        itemId: "steelline_rod",
        type: "rod",
        price: 200,
        power: 300,
    },
}
