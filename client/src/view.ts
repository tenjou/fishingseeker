import { getElement, HTMLComponent, removeAllChildren } from "./dom"
import { getState, updateState } from "./state"

export type ViewType = "home" | "fishing" | "codex" | "zone" | "shop"

let prevView: ViewType = "home"

const HandleLoad: Partial<Record<ViewType, () => void>> = {}

const HandleUnload: Partial<Record<ViewType, () => void>> = {}

export function selectView(nextView: ViewType, onViewLoad?: () => void, force?: boolean) {
    const { view } = getState()

    if (view === nextView && !force) {
        return
    }

    prevView = view

    const unloadFunc = HandleUnload[view]
    if (unloadFunc) {
        unloadFunc()
    }

    if (onViewLoad) {
        onViewLoad()
    }

    loadView(nextView)

    const loadFunc = HandleLoad[nextView]
    if (loadFunc) {
        loadFunc()
    }
}

export function loadView(newView: ViewType) {
    updateState({
        view: newView,
    })

    const container = getElement("#view")

    let viewElement: HTMLComponent

    switch (newView) {
        case "home":
            viewElement = document.createElement("home-view") as HTMLComponent
            break
        case "fishing":
            viewElement = document.createElement("fishing-view") as HTMLComponent
            break
        case "codex":
            viewElement = document.createElement("codex-view") as HTMLComponent
            break
        case "zone":
            viewElement = document.createElement("zone-view") as HTMLComponent
            break
        case "shop":
            viewElement = document.createElement("shop-view") as HTMLComponent
            break
    }

    removeAllChildren(container)
    container.appendChild(viewElement)

    viewElement.load()
}

export function closeView() {
    selectView("home")
}

export function backView() {
    selectView(prevView)
}
