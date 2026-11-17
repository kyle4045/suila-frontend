import { Card } from "../components/Card"
import { languages, setLanguage, useLanguage, useT } from "../i18n"

export function MyScreen({
  onOpenProfile,
  onOpenReminders,
  onOpenNightMute,
  onOpenDevice,
  onOpenHabits,
  onOpenAbout,
  onOpenPro,
}: {
  onOpenProfile: () => void
  onOpenReminders: () => void
  onOpenNightMute: () => void
  onOpenDevice: () => void
  onOpenHabits: () => void
  onOpenAbout: () => void
  onOpenPro: () => void
}) {
  const t = useT()
  const language = useLanguage()

  return (
    <section className="swipe-page my-page" aria-label={t.my.aria}>
      <button className="my-menu-row" type="button" onClick={onOpenProfile}>
        <strong>{t.my.profile}</strong>
        <span aria-hidden="true">＞</span>
      </button>

      <button className="my-menu-row" type="button" onClick={onOpenReminders}>
        <strong>{t.my.reminders}</strong>
        <span aria-hidden="true">＞</span>
      </button>

      <button className="my-menu-row" type="button" onClick={onOpenNightMute}>
        <strong>{t.my.nightMute}</strong>
        <span aria-hidden="true">＞</span>
      </button>

      <button className="my-menu-row" type="button" onClick={onOpenDevice}>
        <strong>{t.my.device}</strong>
        <span aria-hidden="true">＞</span>
      </button>

      <button className="my-menu-row" type="button" onClick={onOpenHabits}>
        <strong>
          {t.my.habits}
          <b className="pro-tag">{t.my.proTag}</b>
        </strong>
        <span aria-hidden="true">＞</span>
      </button>

      {/* Both language names are always shown, each written in its own language. */}
      <Card className="language-card">
        <p className="card-label">{t.my.language}</p>
        <div className="stepper-row">
          {languages.map((option) => (
            <button
              className="choice-button"
              type="button"
              key={option}
              lang={option}
              aria-pressed={language === option}
              onClick={() => setLanguage(option)}
            >
              {language === option && <span aria-hidden="true">✓ </span>}
              {t.my.languageNames[option]}
            </button>
          ))}
        </div>
      </Card>

      <button className="my-menu-row" type="button" onClick={onOpenAbout}>
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
