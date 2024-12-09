interface LocalEntry {
    en: string
}

type Languages = "en"

const lang: Languages = "en"

const I18nValues: Record<string, LocalEntry> = {
    loading: {
        en: "Loading",
    },
}

export const i18n = (key: string | null, args?: (string | number)[]) => {
    if (!key) {
        return "undefined"
    }

    const entry = I18nValues[key as keyof typeof I18nValues]
    if (!entry) {
        return `__${key}__`
    }

    if (args) {
        return entry[lang].replace(/%s/g, () => {
            const arg = args.shift()
            return String(Number.isInteger(arg) ? Math.abs(Number(arg)) : arg) || "<missing_arg>"
        })
    }

    return entry[lang]
}
