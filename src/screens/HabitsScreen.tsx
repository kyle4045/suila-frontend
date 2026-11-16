import { Card } from "../components/Card"
import { CheckIcon } from "../components/Icons"
import { ScreenHeader } from "../components/ScreenHeader"
import type { DrinkRecord } from "../data/mock"
import { useT } from "../i18n"
import { forgetfulPeriod, lastSevenDays } from "../lib/habits"

export function HabitsScreen({
  records,
  goalMl,
  onAddReminder,
  onClose,
}: {
  records: DrinkRecord[]
  goalMl: number
  onAddReminder: () => void
  onClose: () => void
}) {
  const t = useT()
  const today = new Date()
  const week = lastSevenDays(records, today)
  const period = forgetfulPeriod(records, today)
  const metCount = week.filter((day) => day.totalMl >= goalMl).length
  const average = Math.round(
    week.reduce((total, day) => total + day.totalMl, 0) / week.length,
  )
  // Bars are drawn against the larger of the goal and the best day.
  const scale = Math.max(goalMl, ...week.map((day) => day.totalMl))

  return (
    <section className="settings-screen" aria-label={t.habits.title}>
      <ScreenHeader title={t.habits.title} onBack={onClose} />

      <div className="settings-content">
        <Card>
          <p className="card-label">{t.habits.weekTitle}</p>
          {week.map((day) => {
            const met = day.totalMl >= goalMl
            return (
              <div className="habit-day" key={day.date.getTime()}>
                <div className="habit-day-head">
                  <span>
                    {t.habits.dayLabel(
                      day.date.getMonth() + 1,
                      day.date.getDate(),
                      t.calendar.weekdays[day.date.getDay()],
                    )}
                  </span>
                  <strong>{t.home.recordAmount(day.totalMl)}</strong>
                </div>
                <div className="habit-bar-row">
                  <div className="habit-bar" aria-hidden="true">
                    <span
                      style={{ width: `${(day.totalMl / scale) * 100}%` }}
                    />
                  </div>
                  {/* The tick sits after the bar; the slot stays so bars line up. */}
                  <span className="habit-mark">
                    {met && (
                      <>
                        <CheckIcon />
                        <span className="sr-only">{t.calendar.met}</span>
                      </>
                    )}
                  </span>
                </div>
              </div>
            )
          })}
          <p className="habit-note">
            <CheckIcon />
            {t.habits.metLegend}
          </p>
          <p className="habit-summary">
            {t.habits.metCount(metCount, week.length)}
          </p>
          <p className="habit-summary">{t.habits.average(average)}</p>
        </Card>

        <Card>
          <p className="card-label">{t.habits.forgetTitle}</p>
          {period ? (
            <>
              <p className="habit-period">
                {t.habits.period(
                  t.common.clock(period.from, 0),
                  t.common.clock(period.to, 0),
                )}
              </p>
              <p className="habit-body">{t.habits.forgetBody}</p>
              <button
                className="outline-button is-wide"
                type="button"
                onClick={onAddReminder}
              >
                {t.habits.addReminder}
              </button>
            </>
          ) : (
            <p className="records-empty">{t.habits.notEnough}</p>
          )}
        </Card>
      </div>
    </section>
  )
}
