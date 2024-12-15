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

export function isDaylight(offsetInHours = 0) {
    const date = new Date()
    date.setUTCHours(date.getUTCHours() + offsetInHours)

    const hour = date.getUTCHours()
    const mapToDay = hour % 4
    const daylight = mapToDay < 2

    return daylight
}

export function getWeather(zoneCfg: ZoneConfig, offsetInHours = 0): ZoneWeather {
    const date = new Date()
    date.setUTCHours(date.getUTCHours() + offsetInHours)

    const year = date.getUTCFullYear()
    const month = date.getUTCMonth()
    const day = date.getUTCDay()
    const hour = date.getUTCHours()
    const seed = zoneCfg.seed + year * 1000000 + month * 10000 + day * 100 + hour

    return randomItem(zoneCfg.weathers, seed)
}
