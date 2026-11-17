import { Card } from "../components/Card"
import { CheckIcon } from "../components/Icons"
import { ScreenHeader } from "../components/ScreenHeader"
import type { DrinkRecord } from "../data/mock"
import { useT } from "../i18n"
import { forgetfulPeriod, lastSevenDays } from "../lib/habits"

export function HabitsScreen({
  records,
  goalMl,
  advice,
  hasSensitiveCondition,
  onAddReminder,
  onClose,
}: {
  records: DrinkRecord[]
  goalMl: number
  /** Analysis text from the backend (and its AI). Null until it sends one. */
  advice: string | null
  hasSensitiveCondition: boolean
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

  if (!period) {
    return (
      <section className="settings-screen" aria-label={t.habits.title}>
        <ScreenHeader title={t.habits.title} onBack={onClose} />
        <div className="settings-content">
          <Card>
            <p className="card-label">{t.habits.weekTitle}</p>
            <p className="records-empty">{t.habits.notEnough}</p>
          </Card>
          {/* Too few records for our own sample, but the backend may still have something to say. */}
          {advice && (
            <Card className="advice-card">
              <p className="card-label">{t.habits.adviceTitle}</p>
              <p className="habit-body">{advice}</p>
              {hasSensitiveCondition && (
                <p className="health-note">{t.habits.adviceCondition}</p>
              )}
              <p className="advice-label">{t.habits.adviceLabel}</p>
            </Card>
          )}
        </div>
      </section>
    )
  }

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
        </Card>

        <Card className="advice-card">
          <p className="card-label">{t.habits.adviceTitle}</p>
          {/* shortcut: until the backend sends its analysis, a plain sample built from the owner's own goal. */}
          <p className="habit-body">
            {advice ??
              (metCount === week.length
                ? t.habits.adviceAllMet(week.length)
                : t.habits.adviceMissed(week.length - metCount, week.length, goalMl))}
          </p>
          {!advice && (
            <p className="habit-body">
              {t.habits.adviceTip(
                t.habits.period(
                  t.common.clock(period.from, 0),
                  t.common.clock(period.to, 0),
                ),
              )}
            </p>
          )}
          {hasSensitiveCondition && (
            <p className="health-note">{t.habits.adviceCondition}</p>
          )}
          <p className="advice-label">{t.habits.adviceLabel}</p>
        </Card>
      </div>
    </section>
  )
}
