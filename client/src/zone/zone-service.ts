import { ZoneConfig, ZoneId, ZoneWeather } from "../configs/zone-configs"
import { randomItem } from "../math/utils"
import { updateState } from "../state"
import { selectView } from "../view"

export function switchZone(zoneId: ZoneId) {
    updateState({
        currZone: zoneId,
    })
    selectView("zone")
}

export function isDaylight() {
    const date = new Date()

    const hour = date.getUTCHours()
    const mapToDay = hour % 4
    const daylight = mapToDay < 2

    return daylight
}

export function getWeather(zoneCfg: ZoneConfig): ZoneWeather {
    const date = new Date()

    const year = date.getUTCFullYear()
    const month = date.getUTCMonth()
    const day = date.getUTCDay()
    const hour = date.getUTCHours()
    const minutes = date.getUTCMinutes()
    const seed = zoneCfg.seed + year * 1000000 + month * 10000 + day * 100 + hour * 10 + minutes

    return randomItem(zoneCfg.weathers, seed)
}
