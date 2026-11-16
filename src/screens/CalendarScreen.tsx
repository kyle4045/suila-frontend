import { useState } from "react"
import { Card } from "../components/Card"
import { CheckIcon, DotIcon } from "../components/Icons"
import { ScreenHeader } from "../components/ScreenHeader"
import type { DrinkRecord } from "../data/mock"
import { useT } from "../i18n"
import { dayKey, isToday, startOfDay } from "../lib/date"

export function CalendarScreen({
  records,
  goalMl,
  onClose,
}: {
  records: DrinkRecord[]
  goalMl: number
  onClose: () => void
}) {
  const t = useT()
  const today = startOfDay(new Date())
  const [selected, setSelected] = useState(today)
  // The month on screen follows the selected day.
  const year = selected.getFullYear()
  const month = selected.getMonth()

  const byDay = new Map<string, DrinkRecord[]>()
  for (const record of records) {
    const key = dayKey(new Date(record.time))
    byDay.set(key, [...(byDay.get(key) ?? []), record])
  }
  const totalOf = (date: Date) => {
    const dayRecords = byDay.get(dayKey(date))
    return dayRecords
      ? dayRecords.reduce((total, record) => total + record.amountMl, 0)
      : null
  }

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const leadingBlanks = new Date(year, month, 1).getDay()
  const days = Array.from(
    { length: daysInMonth },
    (_, index) => new Date(year, month, index + 1),
  )

  // Never past today: there is nothing to show in the future.
  const select = (date: Date) => setSelected(date > today ? today : date)
  const moveDay = (difference: number) =>
    select(new Date(year, month, selected.getDate() + difference))
  const onCurrentMonth =
    year === today.getFullYear() && month === today.getMonth()

  const selectedRecords = byDay.get(dayKey(selected)) ?? []
  const selectedTotal = totalOf(selected)

  return (
    <section className="calendar-screen" aria-label={t.calendar.aria}>
      <ScreenHeader title={t.calendar.title} onBack={onClose} />

      <div className="calendar-content">
        <h2 className="month-title" aria-live="polite">
          {t.calendar.monthTitle(year, month + 1)}
        </h2>
        <div className="stepper-row">
          <button
            className="outline-button"
            type="button"
            onClick={() => select(new Date(year, month, 0))}
          >
            {t.calendar.prevMonth}
          </button>
          <button
            className="outline-button"
            type="button"
            disabled={onCurrentMonth}
            onClick={() => select(new Date(year, month + 1, 1))}
          >
            {t.calendar.nextMonth}
          </button>
        </div>

        <div className="calendar-card">
          <div className="calendar-weekdays" aria-hidden="true">
            {t.calendar.weekdays.map((weekday) => (
              <span key={weekday}>{weekday}</span>
            ))}
          </div>
          <div className="calendar-grid">
            {Array.from({ length: leadingBlanks }, (_, index) => (
              <span key={`blank-${index}`} aria-hidden="true" />
            ))}
            {days.map((date) => {
              const total = totalOf(date)
              const met = total !== null && total >= goalMl
              const isSelected = dayKey(date) === dayKey(selected)
              return (
                <button
                  className={[
                    isSelected ? "is-selected" : "",
                    isToday(date) ? "is-today" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  type="button"
                  key={date.getDate()}
                  disabled={date > today}
                  aria-label={t.calendar.dayAria(
                    month + 1,
                    date.getDate(),
                    total,
                    met,
                  )}
                  aria-pressed={isSelected}
                  onClick={() => select(date)}
                >
                  {date.getDate()}
                  {total !== null && (met ? <CheckIcon /> : <DotIcon />)}
                </button>
              )
            })}
          </div>
          <p className="calendar-legend">
            <span>
              <CheckIcon />
              {t.calendar.legendMet}
            </span>
            <span>
              <DotIcon />
              {t.calendar.legendSome}
            </span>
          </p>
        </div>

        <div aria-live="polite">
          <Card className="day-details">
            <p className="card-label">
              {t.calendar.dayTitle(
                month + 1,
                selected.getDate(),
                t.calendar.weekdayNames[selected.getDay()],
                isToday(selected),
              )}
            </p>
            {selectedTotal === null ? (
              <p className="records-empty">{t.calendar.noRecords}</p>
            ) : (
              <>
                <p className="day-total">
                  {t.calendar.drunk(selectedTotal, goalMl)}
                </p>
                <p
                  className={`status-line ${selectedTotal >= goalMl ? "is-ok" : ""}`.trim()}
                >
                  {selectedTotal >= goalMl ? <CheckIcon /> : <DotIcon />}
                  {selectedTotal >= goalMl
                    ? t.calendar.met
                    : t.calendar.notMet}
                </p>
                {selectedRecords.map((record) => {
                  const time = new Date(record.time)
                  return (
                    <div className="time-row" key={record.id}>
                      <span>
                        {t.common.clock(time.getHours(), time.getMinutes())}
                      </span>
                      <strong>{t.home.recordAmount(record.amountMl)}</strong>
                    </div>
                  )
                })}
              </>
            )}
          </Card>
        </div>

        {/* Large buttons, because the day cells above are small on narrow phones. */}
        <div className="stepper-row day-nav">
          <button
            className="outline-button"
            type="button"
            onClick={() => moveDay(-1)}
          >
            {t.calendar.prevDay}
          </button>
          <button
            className="outline-button"
            type="button"
            disabled={isToday(selected)}
            onClick={() => moveDay(1)}
          >
            {t.calendar.nextDay}
          </button>
        </div>
      </div>
    </section>
  )
}
