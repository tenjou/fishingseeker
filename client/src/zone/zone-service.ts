import { ZoneId } from "../configs/zone-configs"
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
    const day = hour % 4
    const daylight = day < 2

    return daylight
}
