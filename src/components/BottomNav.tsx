import { useT } from "../i18n"
import { NavigationIcon, type NavigationIconType } from "./Icons"

const items: { key: "water" | "family" | "my"; icon: NavigationIconType }[] = [
  { key: "water", icon: "water" },
  { key: "family", icon: "social" },
  { key: "my", icon: "profile" },
]

export const pageCount = items.length

export function BottomNav({
  currentPage,
  onSelect,
}: {
  currentPage: number
  onSelect: (page: number) => void
}) {
  const t = useT()
  return (
    <nav className="bottom-navigation" aria-label={t.nav.aria}>
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
        </button>
      ))}
    </nav>
  )
}
