import { useState } from "react"
import { Card } from "../components/Card"
import { ConfirmDialog } from "../components/ConfirmDialog"
import { FloatingButton } from "../components/FloatingButton"
import { ScreenHeader } from "../components/ScreenHeader"
import {
  goalLimits,
  type Brightness,
  type ReminderSettings,
} from "../data/mock"
import { useT } from "../i18n"

const brightnessLevels: Brightness[] = ["low", "medium", "high"]

// Every half hour of the day, "00:00" to "23:30".
const halfHours = Array.from(
  { length: 48 },
  (_, index) =>
    `${String(Math.floor(index / 2)).padStart(2, "0")}:${index % 2 ? "30" : "00"}`,
)

export function ReminderSettingsScreen({
  settings,
  showHealthNote,
  onSave,
  onClose,
}: {
  settings: ReminderSettings
  showHealthNote: boolean
  onSave: (settings: ReminderSettings) => void
  onClose: () => void
}) {
  const t = useT()
  const [draft, setDraft] = useState(settings)
  const [asking, setAsking] = useState(false)
  const available = halfHours.filter((time) => !draft.times.includes(time))
  const [newTime, setNewTime] = useState(available[0] ?? "")
  const changed = JSON.stringify(draft) !== JSON.stringify(settings)
  const label = (time: string) => {
    const [hour, minute] = time.split(":").map(Number)
    return t.common.clock(hour, minute)
  }

  const changeGoal = (difference: number) =>
    setDraft((current) => ({
      ...current,
      // Clamped here too, so very fast taps cannot pass the limits.
      dailyGoalMl: Math.min(
        goalLimits.max,
        Math.max(goalLimits.min, current.dailyGoalMl + difference),
      ),
    }))

  const addTime = () => {
    if (!newTime) return
    const times = [...draft.times, newTime].sort()
    setDraft((current) => ({ ...current, times }))
    setNewTime(halfHours.find((time) => !times.includes(time)) ?? "")
  }

  const removeTime = (time: string) => {
    setDraft((current) => ({
      ...current,
      times: current.times.filter((item) => item !== time),
    }))
    if (!newTime) setNewTime(time)
  }

  return (
    <section className="settings-screen" aria-label={t.reminders.title}>
      <ScreenHeader
        title={t.reminders.title}
        onBack={() => (changed ? setAsking(true) : onClose())}
      />

      <div className="settings-content">
        <Card>
          <p className="card-label">{t.reminders.goalLabel}</p>
          <p className="goal-value" aria-live="polite">
            {t.reminders.goalValue(draft.dailyGoalMl)}
          </p>
          <div className="stepper-row">
            <button
              className="outline-button"
              type="button"
              aria-label={t.reminders.decreaseAria(goalLimits.step)}
              disabled={draft.dailyGoalMl - goalLimits.step < goalLimits.min}
              onClick={() => changeGoal(-goalLimits.step)}
            >
              {t.reminders.decrease(goalLimits.step)}
            </button>
            <button
              className="outline-button"
              type="button"
              aria-label={t.reminders.increaseAria(goalLimits.step)}
              disabled={draft.dailyGoalMl + goalLimits.step > goalLimits.max}
              onClick={() => changeGoal(goalLimits.step)}
            >
              {t.reminders.increase(goalLimits.step)}
            </button>
          </div>
          {showHealthNote && (
            <p className="health-note">{t.reminders.healthNote}</p>
          )}
        </Card>

        <Card>
          <p className="card-label">{t.reminders.timesLabel}</p>
          {draft.times.length === 0 && (
            <p className="records-empty">{t.reminders.noTimes}</p>
          )}
          {draft.times.map((time) => (
            <div className="time-row" key={time}>
              <strong>{label(time)}</strong>
              <button
                className="edit-button"
                type="button"
                aria-label={t.reminders.removeAria(label(time))}
                onClick={() => removeTime(time)}
              >
                {t.reminders.remove}
              </button>
            </div>
          ))}
          {available.length > 0 && (
            <div className="add-time-row">
              <select
                value={newTime}
                onChange={(event) => setNewTime(event.target.value)}
                aria-label={t.reminders.addTimeAria}
              >
                {available.map((time) => (
                  <option value={time} key={time}>
                    {label(time)}
                  </option>
                ))}
              </select>
              <button className="outline-button" type="button" onClick={addTime}>
                {t.reminders.add}
              </button>
            </div>
          )}
        </Card>

        <Card>
          <p className="card-label">{t.reminders.brightnessLabel}</p>
          <div className="choice-row">
            {brightnessLevels.map((level) => {
              const selected = draft.brightness === level
              return (
                <button
                  className="choice-button"
                  type="button"
                  key={level}
                  aria-pressed={selected}
                  onClick={() =>
                    setDraft((current) => ({ ...current, brightness: level }))
                  }
                >
                  {selected && <span aria-hidden="true">✓ </span>}
                  {t.reminders.brightness[level]}
                </button>
              )
            })}
          </div>
        </Card>
      </div>

      <FloatingButton onClick={() => onSave(draft)}>
        {t.common.save}
      </FloatingButton>

      {asking && (
        <ConfirmDialog
          message={t.common.unsaved}
          confirmLabel={t.common.leave}
          cancelLabel={t.common.stay}
          onConfirm={onClose}
          onCancel={() => setAsking(false)}
        />
      )}
    </section>
  )
}
