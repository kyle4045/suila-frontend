import { useEffect, useState } from "react"
import { Card } from "../components/Card"
import {
  BatteryIcon,
  CalendarIcon,
  CheckCircleIcon,
  CheckIcon,
  ChevronIcon,
  NavigationIcon,
  WarningIcon,
} from "../components/Icons"
import {
  lowBatteryPercent,
  type DeviceStatus,
  type DrinkRecord,
} from "../data/mock"
import { useT } from "../i18n"
import { lastSevenDays } from "../lib/habits"
import type { HomeStyle } from "./DemoPanelScreen"

type StatusLine = { tone: "ok" | "warn" | "plain"; text: string }

export function HomeScreen({
  homeStyle,
  device,
  records,
  isPro,
  todayWater,
  goalMl,
  waterPercentage,
  todayRecords,
  newMessageCount,
  onOpenCalendar,
  onOpenMessages,
  onOpenHabits,
  onOpenDevice,
  onEditRecord,
  onPair,
}: {
  homeStyle: HomeStyle
  device: DeviceStatus
  records: DrinkRecord[]
  isPro: boolean
  todayWater: number
  goalMl: number
  waterPercentage: number
  todayRecords: DrinkRecord[]
  newMessageCount: number
  onOpenCalendar: () => void
  onOpenMessages: () => void
  onOpenHabits: () => void
  onOpenDevice: () => void
  onEditRecord: (record: DrinkRecord) => void
  onPair: () => void
}) {
  const t = useT()
  // Progress starts at zero and grows to the real value, so a change is seen to happen.
  const [shown, setShown] = useState(0)
  useEffect(() => setShown(waterPercentage), [waterPercentage])
  const goalMet = todayWater >= goalMl

  // The base in as few words as possible: one line when all is well.
  const batteryLow = device.batteryPercent <= lowBatteryPercent
  const status: StatusLine[] = !device.paired
    ? [{ tone: "warn", text: t.home.notPaired }]
    : [
        ...(!device.connected
          ? [{ tone: "warn", text: t.home.statusOffline(device.pendingSyncCount) } as const]
          : batteryLow
            ? []
            : [{ tone: "ok", text: t.home.statusOk(device.batteryPercent) } as const]),
        ...(batteryLow
          ? [{ tone: "warn", text: t.home.batteryLow(device.batteryPercent) } as const]
          : []),
      ]
  const statusIcon = (line: StatusLine) =>
    line.tone === "warn" ? <WarningIcon /> : line.tone === "ok" ? <CheckCircleIcon /> : <BatteryIcon />
  const statusLines = (
    <>
      {status.map((line) => (
        <p className={`status-line is-${line.tone}`} key={line.text}>
          {statusIcon(line)}
          {line.text}
        </p>
      ))}
      {!device.paired && (
        <button className="outline-button is-wide" type="button" onClick={onPair}>
          {t.home.pairButton}
        </button>
      )}
    </>
  )

  const progress = (
    <div className="progress" aria-hidden="true">
      <span style={{ transform: `scaleX(${shown / 100})` }} />
    </div>
  )
  const percentText = goalMet
    ? t.home.goalMet(waterPercentage)
    : t.home.percentDone(waterPercentage)
  const amount = (
    <p className="amount" aria-label={t.home.ringAria(todayWater, goalMl, waterPercentage)}>
      <strong>{todayWater}</strong>
      <span>{t.home.goalLine(goalMl)}</span>
    </p>
  )

  const messagesRow = newMessageCount > 0 && (
    <button className="news-row" type="button" onClick={onOpenMessages}>
      <NavigationIcon type="social" />
      <strong>{t.nav.newMessages(newMessageCount)}</strong>
      <ChevronIcon />
    </button>
  )

  const week = lastSevenDays(records, new Date())
  const weekTop = Math.max(goalMl, ...week.map((day) => day.totalMl))
  const weekPeek = (
    <button className="week-peek" type="button" onClick={onOpenHabits}>
      <span className="week-head">
        <strong>{t.habits.weekTitle}</strong>
        <span className="week-more">
          {t.home.weekMore}
          {!isPro && <b className="pro-tag">{t.my.proTag}</b>}
          <ChevronIcon />
        </span>
      </span>
      <span className="week-bars" aria-hidden="true">
        {week.map((day) => {
          const met = day.totalMl >= goalMl
          return (
            <span className={`week-day ${met ? "is-met" : ""}`.trim()} key={day.date.getTime()}>
              <span className="week-mark">{met && <CheckIcon />}</span>
              <span className="week-bar">
                <span style={{ height: `${(day.totalMl / weekTop) * 100}%` }} />
              </span>
              <span className="week-label">{t.calendar.weekdays[day.date.getDay()]}</span>
            </span>
          )
        })}
      </span>
      <span className="sr-only">
        {t.habits.metCount(week.filter((day) => day.totalMl >= goalMl).length, week.length)}
      </span>
    </button>
  )

  const glassLevel = Math.min(1, shown / 100)
  const hero: Record<HomeStyle, React.ReactNode> = {
    blueTop: (
      <div className="hero-blue">
        <div className="hero-status">{statusLines}</div>
        <p className="hero-label">{t.home.todayWater}</p>
        {amount}
        {progress}
        <p className="hero-percent">{percentText}</p>
      </div>
    ),
    glass: (
      <>
        <div className="status-strip">{statusLines}</div>
        <Card className="glass-card">
          <svg className="glass" viewBox="0 0 120 160" aria-hidden="true">
            <defs>
              <clipPath id="glass-shape">
                <path d="M12 10 H108 L97 150 H23 Z" />
              </clipPath>
            </defs>
            <g clipPath="url(#glass-shape)">
              <rect className="glass-empty" x="0" y="0" width="120" height="160" />
              <rect
                className="glass-water"
                x="0"
                y="10"
                width="120"
                height="140"
                style={{ transform: `scaleY(${glassLevel})` }}
              />
            </g>
            <path className="glass-edge" d="M12 10 H108 L97 150 H23 Z" />
          </svg>
          <div className="glass-text">
            <p className="hero-label">{t.home.drunkLabel}</p>
            {amount}
            <p className="glass-left">
              {goalMet ? t.home.goalMet(waterPercentage) : t.home.remaining(goalMl - todayWater)}
            </p>
          </div>
        </Card>
      </>
    ),
    tiles: (
      <>
        <Card className="tile tile-water">
          <p className="hero-label">{t.home.todayWater}</p>
          {amount}
          {progress}
          <p className="hero-percent">{percentText}</p>
        </Card>
        <div className="tile-row">
          <button className="tile tile-family" type="button" onClick={onOpenMessages}>
            <NavigationIcon type="social" />
            <strong>{t.nav.family}</strong>
            <span>
              {newMessageCount > 0 ? t.nav.newMessages(newMessageCount) : t.home.noNewMessages}
            </span>
          </button>
          <button
            className={`tile tile-base ${status.some((line) => line.tone === "warn") ? "is-warn" : ""}`.trim()}
            type="button"
            onClick={device.paired ? onOpenDevice : onPair}
          >
            {status.some((line) => line.tone === "warn") ? <WarningIcon /> : <BatteryIcon />}
            <strong>{t.home.baseTitle}</strong>
            {status.map((line) => (
              <span key={line.text}>{line.text}</span>
            ))}
          </button>
        </div>
      </>
    ),
    calm: (
      <div className="hero-calm">
        <div className="status-strip">{statusLines}</div>
        <p className="hero-label">{t.home.todayWater}</p>
        {amount}
        {progress}
        <p className="hero-percent">{percentText}</p>
      </div>
    ),
  }

  return (
    <section className={`swipe-page water-page home-${homeStyle}`} aria-label={t.home.aria}>
      {hero[homeStyle]}
      {homeStyle !== "tiles" && messagesRow}
      {weekPeek}
      <Card className="records-card drink-records-card">
        <div className="records-heading">
          <p className="card-label recent-records-label">{t.home.todayRecords}</p>
          <button className="calendar-button" type="button" onClick={onOpenCalendar}>
            <CalendarIcon />
            {t.home.calendar}
          </button>
        </div>
        {todayRecords.length === 0 && (
          <>
            <p className="records-empty">{t.home.noRecords}</p>
            <p className="field-hint">{t.home.noRecordsHint}</p>
          </>
        )}
        {todayRecords.map((record) => {
          const time = t.common.dayTime(new Date(record.time), true)
          return (
            <div className="record-row" key={record.id}>
              <div>
                <span>{time}</span>
                <strong>{t.home.recordAmount(record.amountMl)}</strong>
              </div>
              <button
                className="edit-button"
                type="button"
                aria-label={t.home.editAria(time)}
                onClick={() => onEditRecord(record)}
              >
                {t.home.edit}
              </button>
            </div>
          )
        })}
      </Card>
    </section>
  )
}
