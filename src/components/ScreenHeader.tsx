import { useT } from "../i18n"
import { BackIcon } from "./Icons"

/** Floating header of a full-screen view: labeled 返回 button, then the title. */
export function ScreenHeader({
  title,
  onBack,
}: {
  title: string
  onBack: () => void
}) {
  const t = useT()
  return (
    <header className="screen-header">
      <button className="back-button" type="button" onClick={onBack}>
        <BackIcon />
        {t.common.back}
      </button>
      <h1>{title}</h1>
    </header>
  )
}
