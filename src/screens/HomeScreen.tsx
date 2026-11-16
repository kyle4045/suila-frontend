import { Card } from "../components/Card"
import { CalendarIcon } from "../components/Icons"
import type { DrinkRecord } from "../data/mock"
import { useT } from "../i18n"
import { isToday } from "../lib/date"

export function HomeScreen({
  waterPercentage,
  records,
  newMessageCount,
  onOpenCalendar,
  onOpenMessages,
  onOpenAddWater,
}: {
  waterPercentage: number
  records: DrinkRecord[]
  newMessageCount: number
  onOpenCalendar: () => void
  onOpenMessages: () => void
  onOpenAddWater: () => void
}) {
  const t = useT()

  return (
    <section className="swipe-page water-page" aria-label={t.home.aria}>
      <div className="today-summary-row">
        <strong>{t.home.statusOk}</strong>
        <button
          className="calendar-button"
          type="button"
          aria-label={t.home.openCalendar}
          onClick={onOpenCalendar}
        >
          <CalendarIcon />
        </button>
      </div>
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
          aria-label={t.home.ringAria(waterPercentage)}
          onClick={onOpenAddWater}
          style={{
            background: `conic-gradient(#69beff 0 ${waterPercentage}%, #fff ${waterPercentage}% 100%)`,
          }}
        >
          <div>
            <strong>{t.home.percent(waterPercentage)}</strong>
          </div>
        </button>
      </Card>
      <Card className="records-card drink-records-card">
        <p className="card-label recent-records-label">
          {t.home.recentRecords}
        </p>
        <div className="drink-record-list">
          {records.map((record) => {
            const date = new Date(record.time)
            return (
              <div className="record-row" key={record.id}>
                <span>{t.common.dayTime(date, isToday(date))}</span>
                <strong>{t.home.recordAmount(record.amountMl)}</strong>
              </div>
            )
          })}
        </div>
      </Card>
    </section>
  )
}
