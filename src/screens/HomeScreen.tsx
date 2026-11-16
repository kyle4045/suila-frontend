import { Card } from "../components/Card"
import { DeviceStatusLines } from "../components/DeviceStatusLines"
import { CalendarIcon } from "../components/Icons"
import type { DeviceStatus, DrinkRecord } from "../data/mock"
import { useT } from "../i18n"

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
          <span aria-hidden="true">＞</span>
        </button>
      )}
      <Card className="water-total-card">
        <p className="card-label">{t.home.todayWater}</p>
        <button
          className="water-ring"
          type="button"
          aria-label={t.home.ringAria(todayWater, goalMl, waterPercentage)}
          onClick={onOpenAddWater}
          style={{
            background: `conic-gradient(#69beff 0 ${waterPercentage}%, #fff ${waterPercentage}% 100%)`,
          }}
        >
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
          <p className="records-empty">{t.home.noRecords}</p>
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
