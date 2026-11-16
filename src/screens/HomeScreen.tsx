import { Card } from "../components/Card"
import { CalendarIcon } from "../components/Icons"
import type { DrinkRecord } from "../data/mock"
import { useT } from "../i18n"

export function HomeScreen({
  waterPercentage,
  records,
  onOpenCalendar,
  onOpenAddWater,
}: {
  waterPercentage: number
  records: DrinkRecord[]
  onOpenCalendar: () => void
  onOpenAddWater: () => void
}) {
  const t = useT()
  const today = new Date().toDateString()

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
                <span>
                  {t.home.recordTime(date, date.toDateString() === today)}
                </span>
                <strong>{t.home.recordAmount(record.amountMl)}</strong>
              </div>
            )
          })}
        </div>
      </Card>
    </section>
  )
}
