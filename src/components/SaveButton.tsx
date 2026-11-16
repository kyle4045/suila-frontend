import { useT } from "../i18n"

/** The wide 儲存 button at the bottom of a settings screen. */
export function SaveButton({ onClick }: { onClick: () => void }) {
  const t = useT()
  return (
    <button className="save-settings-button" type="button" onClick={onClick}>
      {t.common.save}
    </button>
  )
}
