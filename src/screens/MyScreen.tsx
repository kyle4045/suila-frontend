import type { ReactNode } from "react"
import { Card } from "../components/Card"
import {
  BatteryIcon,
  BellIcon,
  ChartIcon,
  ChevronIcon,
  InfoIcon,
  MoonIcon,
  NavigationIcon,
} from "../components/Icons"
import { languages, setLanguage, useLanguage, useT } from "../i18n"

// Written out in full so the stylesheet clean-up can see these names are used.
const toneClass = {
  blue: "is-blue",
  coral: "is-coral",
  green: "is-green",
  amber: "is-amber",
}

/** One row of a grouped menu: a small coloured icon, the name, and an arrow. */
function MenuRow({
  icon,
  tone,
  label,
  tag,
  onClick,
}: {
  icon: ReactNode
  tone: keyof typeof toneClass
  label: string
  tag?: string
  onClick: () => void
}) {
  return (
    <button className="menu-row" type="button" onClick={onClick}>
      <span className={`menu-icon ${toneClass[tone]}`} aria-hidden="true">
        {icon}
      </span>
      <strong>
        {label}
        {tag && <b className="pro-tag">{tag}</b>}
      </strong>
      <ChevronIcon />
    </button>
  )
}

export function MyScreen({
  ownerName,
  onOpenProfile,
  onOpenReminders,
  onOpenNightMute,
  onOpenDevice,
  onOpenHabits,
  onOpenAbout,
  onOpenPro,
  isPro,
}: {
  ownerName: string
  onOpenProfile: () => void
  onOpenReminders: () => void
  onOpenNightMute: () => void
  onOpenDevice: () => void
  onOpenHabits: () => void
  onOpenAbout: () => void
  onOpenPro: () => void
  isPro: boolean
}) {
  const t = useT()
  const language = useLanguage()

  return (
    <section className="swipe-page my-page" aria-label={t.my.aria}>
      <div className="hero-blue tab-band">
        <p className="band-title">{ownerName}</p>
        <p className="band-sub">{isPro ? t.pro.activeTitle : t.my.freePlan}</p>
      </div>

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

      <Card className="menu-group">
        <MenuRow
          icon={<NavigationIcon type="profile" />}
          tone="blue"
          label={t.my.profile}
          onClick={onOpenProfile}
        />
        <MenuRow icon={<BellIcon />} tone="coral" label={t.my.reminders} onClick={onOpenReminders} />
        <MenuRow icon={<MoonIcon />} tone="blue" label={t.my.nightMute} onClick={onOpenNightMute} />
        <MenuRow icon={<BatteryIcon />} tone="green" label={t.my.device} onClick={onOpenDevice} />
      </Card>

      <Card className="menu-group">
        <MenuRow
          icon={<ChartIcon />}
          tone="amber"
          label={t.my.habits}
          tag={isPro ? undefined : t.my.proTag}
          onClick={onOpenHabits}
        />
        <MenuRow icon={<InfoIcon />} tone="blue" label={t.my.about} onClick={onOpenAbout} />
      </Card>

      <button className="pro-upgrade-button" type="button" onClick={onOpenPro}>
        <span>{isPro ? t.pro.activeTitle : t.my.proTitle}</span>
        <strong>{isPro ? t.pro.activeBody : t.my.proSubtitle}</strong>
      </button>
    </section>
  )
}
