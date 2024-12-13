import { ZoneId } from "../configs/zone-configs"
import { updateState } from "../state"
import { selectView } from "../view"

export function switchZone(zoneId: ZoneId) {
    updateState({
        currZone: zoneId,
    })
    selectView("zone")
}
