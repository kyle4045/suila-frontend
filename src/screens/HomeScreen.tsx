import { useEffect, useState } from "react"
import { Card } from "../components/Card"
import { WaterBottle } from "../components/WaterBottle"
import {
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

type StatusLine = { tone: "ok" | "warn"; text: string }

export function HomeScreen({
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
  onEditRecord,
  onPair,
}: {
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
  onEditRecord: (record: DrinkRecord) => void
  onPair: () => void
}) {
  const t = useT()
  // Progress starts at zero and grows to the real value, so a change is seen to happen.
  const [shown, setShown] = useState(0)
  useEffect(() => setShown(waterPercentage), [waterPercentage])
  const goalMet = todayWater >= goalMl

  // The bottle picture can be switched off; the choice is kept on this phone.
  const [showBottle, setShowBottle] = useState(() => {
    try {
      return localStorage.getItem("suila-show-bottle") !== "off"
    } catch {
      return true
    }
  })
  const toggleBottle = () => {
    setShowBottle((current) => {
      try {
        localStorage.setItem("suila-show-bottle", current ? "off" : "on")
      } catch {
        // Not remembered, but the switch still works for this visit.
      }
      return !current
    })
  }

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
    line.tone === "warn" ? <WarningIcon /> : <CheckCircleIcon />
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

  return (
    <section className="swipe-page water-page" aria-label={t.home.aria}>
      {/* One big blue area behind the header: today's water at a glance. */}
      <div className={`hero-blue ${showBottle ? "with-bottle" : ""}`.trim()}>
        <div className="hero-status">{statusLines}</div>
        <div className="hero-head">
          <p className="hero-label">{t.home.todayWater}</p>
          <button
            className="bottle-switch"
            type="button"
            role="switch"
            aria-checked={showBottle}
            onClick={toggleBottle}
          >
            {t.home.showBottle}
            <span className="switch-track" aria-hidden="true">
              <span />
            </span>
          </button>
        </div>
        <div className="hero-body">
          {showBottle && <WaterBottle level={shown / 100} />}
          <div className="hero-numbers">
            {amount}
            {!showBottle && progress}
            <p className="hero-percent">{percentText}</p>
          </div>
        </div>
      </div>
      {messagesRow}
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
