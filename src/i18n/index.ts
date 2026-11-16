import { zhTW } from "./zh-TW"

export type Translations = typeof zhTW

// shortcut: one language only. Becomes a real language switch (with the
// choice remembered) when the English file is added.
export function useT(): Translations {
  return zhTW
}
