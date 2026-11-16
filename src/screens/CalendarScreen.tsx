import { ScreenHeader } from "../components/ScreenHeader"
import { calendarYear, type ReminderDay } from "../data/mock"
import { useT } from "../i18n"

const months = Array.from({ length: 12 }, (_, index) => index + 1)
const dateKey = (month: number, day: number) =>
  `${calendarYear}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`

export type CalendarSelection = { month: number; day: number }

export function CalendarScreen({
  reminderDays,
  selection,
  onSelect,
  onClose,
}: {
  reminderDays: ReminderDay[]
  selection: CalendarSelection
  onSelect: (selection: CalendarSelection) => void
  onClose: () => void
}) {
  const t = useT()
  const { month, day: selectedDay } = selection
  const recordFor = (day: number) =>
    reminderDays.find((record) => record.date === dateKey(month, day))
  const selectedRecord = recordFor(selectedDay)
  const days = Array.from(
    { length: new Date(calendarYear, month, 0).getDate() },
    (_, index) => index + 1,
  )
  const leadingBlanks = Array.from(
    { length: new Date(calendarYear, month - 1, 1).getDay() },
    (_, index) => index,
  )

  return (
    <section className="calendar-screen" aria-label={t.calendar.aria}>
      <ScreenHeader title={t.calendar.title} onBack={onClose} />

      <div className="calendar-content">
        <div className="calendar-month-picker">
          <span>{t.calendar.year(calendarYear)}</span>
          <label>
            <select
              value={month}
              onChange={(event) =>
                onSelect({ month: Number(event.target.value), day: 1 })
              }
              aria-label={t.calendar.selectMonth}
            >
              {months.map((option) => (
                <option value={option} key={option}>
                  {t.calendar.month(option)}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="calendar-card">
          <div className="calendar-weekdays" aria-hidden="true">
            {t.calendar.weekdays.map((weekday) => (
              <span key={weekday}>{weekday}</span>
            ))}
          </div>
          <div className="calendar-grid">
            {leadingBlanks.map((blank) => (
              <span key={`blank-${blank}`} aria-hidden="true" />
            ))}
            {days.map((day) => {
              const hasReminders = recordFor(day) !== undefined
              return (
                <button
                  className={[
                    selectedDay === day ? "is-selected" : "",
                    hasReminders ? "has-reminders" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  type="button"
                  key={day}
                  aria-label={t.calendar.dayAria(month, day, hasReminders)}
                  aria-pressed={selectedDay === day}
                  onClick={() => onSelect({ month, day })}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </div>

        <div className="calendar-day-details" aria-live="polite">
          <div className="calendar-day-heading">
            <div>
              <strong>
                {t.calendar.reminderCount(selectedRecord?.times.length ?? 0)}
              </strong>
            </div>
          </div>
          {selectedRecord ? (
            <div className="calendar-reminder-times">
              {selectedRecord.times.map((time, index) => (
                <div key={time}>
                  <span>{t.calendar.reminderIndex(index + 1)}</span>
                  <strong>{time}</strong>
                </div>
              ))}
            </div>
          ) : (
            <p className="calendar-empty">{t.calendar.empty}</p>
          )}
        </div>
      </div>
    </section>
  )
}
