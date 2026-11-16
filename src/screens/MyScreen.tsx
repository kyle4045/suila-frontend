import { useT } from "../i18n"

export function MyScreen({
  onOpenProfile,
  onOpenNightMute,
  onOpenPro,
}: {
  onOpenProfile: () => void
  onOpenNightMute: () => void
  onOpenPro: () => void
}) {
  const t = useT()

  return (
    <section className="swipe-page my-page" aria-label={t.my.aria}>
      <button className="my-menu-row" type="button" onClick={onOpenProfile}>
        <strong>{t.my.profile}</strong>
        <span aria-hidden="true">＞</span>
      </button>

      <button className="my-menu-row" type="button" onClick={onOpenNightMute}>
        <strong>{t.my.nightMute}</strong>
        <span aria-hidden="true">＞</span>
      </button>

      <button className="my-menu-row" type="button">
        <strong>{t.my.about}</strong>
        <span aria-hidden="true">＞</span>
      </button>

      <button className="pro-upgrade-button" type="button" onClick={onOpenPro}>
        <span>{t.my.proTitle}</span>
        <strong>{t.my.proSubtitle}</strong>
      </button>
    </section>
  )
}
