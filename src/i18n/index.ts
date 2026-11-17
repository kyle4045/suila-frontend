import { useSyncExternalStore } from "react"
import { en } from "./en"
import { zhTW } from "./zh-TW"

export type Translations = typeof zhTW
export type Language = "zh-TW" | "en"

export const languages: Language[] = ["zh-TW", "en"]
const files: Record<Language, Translations> = { "zh-TW": zhTW, en }

/** The sample owner's name in every language, to tell it apart from a name the user typed. */
export const defaultNames = languages.map(
  (language) => files[language].profile.defaultName,
)

const storageKey = "suila-language"

// Storage can be unavailable (private windows); the app then just starts in Chinese.
const readSaved = () => {
  try {
    return localStorage.getItem(storageKey)
  } catch {
    return null
  }
}

let current: Language = readSaved() === "en" ? "en" : "zh-TW"
const listeners = new Set<() => void>()

const applyToDocument = () => {
  document.documentElement.lang = files[current].meta.htmlLang
  document.title = files[current].meta.documentTitle
}
applyToDocument()

/** Switches the whole app at once and remembers the choice for next time. */
export function setLanguage(language: Language) {
  current = language
  try {
    localStorage.setItem(storageKey, language)
  } catch {
    // Not remembered, but the switch still works for this visit.
  }
  applyToDocument()
  listeners.forEach((listener) => listener())
}

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useLanguage(): Language {
  return useSyncExternalStore(subscribe, () => current)
}

export function useT(): Translations {
  return files[useLanguage()]
}
