import type { HTMLAttributes } from "react"
import { useT } from "../i18n"
import { NavigationIcon, type NavigationIconType } from "./Icons"

const items: { key: "water" | "family" | "my"; icon: NavigationIconType }[] = [
  { key: "water", icon: "water" },
  { key: "family", icon: "social" },
  { key: "my", icon: "profile" },
]

export const pageCount = items.length
export const familyPage = items.findIndex((item) => item.key === "family")

export function BottomNav({
  currentPage,
  newMessageCount,
  slideHandlers,
  onSelect,
}: {
  currentPage: number
  newMessageCount: number
  /** Lets a finger slide along the bar to change tab. */
  slideHandlers: HTMLAttributes<HTMLElement>
  onSelect: (page: number) => void
}) {
  const t = useT()
  return (
    <nav className="bottom-navigation" aria-label={t.nav.aria} {...slideHandlers}>
      <span className="nav-indicator" aria-hidden="true" />
      {items.map((item, index) => (
        <button
          className={currentPage === index ? "is-active" : ""}
          type="button"
          key={item.key}
          onClick={() => onSelect(index)}
          aria-current={currentPage === index ? "page" : undefined}
        >
          <NavigationIcon type={item.icon} />
          <span>{t.nav[item.key]}</span>
          {item.key === "family" && newMessageCount > 0 && (
            <>
              <b className="nav-badge" aria-hidden="true">
                {newMessageCount}
              </b>
              <span className="sr-only">
                {t.nav.newMessages(newMessageCount)}
              </span>
            </>
          )}
        </button>
      ))}
    </nav>
  )
}
