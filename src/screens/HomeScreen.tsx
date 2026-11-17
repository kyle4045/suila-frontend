import { Card } from "../components/Card"
import { DeviceStatusLines } from "../components/DeviceStatusLines"
import { CalendarIcon, ChevronIcon } from "../components/Icons"
import type { DeviceStatus, DrinkRecord } from "../data/mock"
import { useEffect, useState } from "react"
import { useT } from "../i18n"

// Circumference of the ring (radius 103). pathLength is not honoured for dashes in every browser.
const ringLength = 2 * Math.PI * 103

export function HomeScreen({
  device,
  todayWater,
  goalMl,
  waterPercentage,
  todayRecords,
  newMessageCount,
  onOpenCalendar,
  onOpenMessages,
  onOpenAddWater,
  onEditRecord,
  onPair,
}: {
  device: DeviceStatus
  todayWater: number
  goalMl: number
  waterPercentage: number
  todayRecords: DrinkRecord[]
  newMessageCount: number
  onOpenCalendar: () => void
  onOpenMessages: () => void
  onOpenAddWater: () => void
  onEditRecord: (record: DrinkRecord) => void
  onPair: () => void
}) {
  const t = useT()
  // The ring starts empty and fills to the real value, so a change is seen to happen.
  const [ringPercent, setRingPercent] = useState(0)
  useEffect(() => setRingPercent(waterPercentage), [waterPercentage])

  return (
    <section className="swipe-page water-page" aria-label={t.home.aria}>
      <Card className="device-status">
        <DeviceStatusLines device={device} />
        {!device.paired && (
          <button
            className="outline-button is-wide"
            type="button"
            onClick={onPair}
          >
            {t.home.pairButton}
          </button>
        )}
      </Card>
      {newMessageCount > 0 && (
        <button className="my-menu-row" type="button" onClick={onOpenMessages}>
          <strong>{t.home.newMessages(newMessageCount)}</strong>
          <ChevronIcon />
        </button>
      )}
      <Card className="water-total-card">
        <p className="card-label">{t.home.todayWater}</p>
        <button
          className="water-ring"
          type="button"
          aria-label={t.home.ringAria(todayWater, goalMl, waterPercentage)}
          onClick={onOpenAddWater}
        >
          <svg viewBox="0 0 224 224" aria-hidden="true">
            <circle className="ring-track" cx="112" cy="112" r="103" />
            <circle
              className="ring-progress"
              cx="112"
              cy="112"
              r="103"
              strokeDasharray={ringLength}
              strokeDashoffset={ringLength * (1 - ringPercent / 100)}
            />
          </svg>
          <div>
            <span>{t.home.drunkLabel}</span>
            <strong>{todayWater}</strong>
            <span>{t.home.goalLine(goalMl)}</span>
          </div>
        </button>
        <p className="ring-percent">
          {todayWater >= goalMl
            ? t.home.goalMet(waterPercentage)
            : t.home.percentDone(waterPercentage)}
        </p>
      </Card>
      <Card className="records-card drink-records-card">
        <div className="records-heading">
          <p className="card-label recent-records-label">
            {t.home.todayRecords}
          </p>
          <button
            className="calendar-button"
            type="button"
            onClick={onOpenCalendar}
          >
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
