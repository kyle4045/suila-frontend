import { Card } from "../components/Card"
import { FloatingButton } from "../components/FloatingButton"
import { ScreenHeader } from "../components/ScreenHeader"
import type { Dispatch, SetStateAction } from "react"
import type { NightMute } from "../data/mock"
import { useT } from "../i18n"

const hourOptions = Array.from({ length: 24 }, (_, hour) =>
  String(hour).padStart(2, "0"),
)
const minuteOptions = Array.from({ length: 60 }, (_, minute) =>
  String(minute).padStart(2, "0"),
)

function TimeRow({
  label,
  hour,
  minute,
  hourLabel,
  minuteLabel,
  onHourChange,
  onMinuteChange,
}: {
  label: string
  hour: string
  minute: string
  hourLabel: string
  minuteLabel: string
  onHourChange: (hour: string) => void
  onMinuteChange: (minute: string) => void
}) {
  return (
    <label>
      <span>{label}</span>
      <div className="time-select-row">
        <select
          value={hour}
          onChange={(event) => onHourChange(event.target.value)}
          aria-label={hourLabel}
        >
          {hourOptions.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
        <b aria-hidden="true">：</b>
        <select
          value={minute}
          onChange={(event) => onMinuteChange(event.target.value)}
          aria-label={minuteLabel}
        >
          {minuteOptions.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </label>
  )
}

export function NightMuteScreen({
  night,
  onChange,
  onClose,
}: {
  night: NightMute
  onChange: Dispatch<SetStateAction<NightMute>>
  onClose: () => void
}) {
  const t = useT()

  return (
    <section className="settings-screen" aria-label={t.night.aria}>
      <ScreenHeader
        className="settings-header"
        closeLabel={t.night.close}
        onClose={onClose}
      />

      <div className="settings-content">
        <Card className="setting-card">
          <strong>{t.night.enable}</strong>
          <button
            className={`compact-switch ${night.enabled ? "is-on" : ""}`}
            type="button"
            role="switch"
            aria-checked={night.enabled}
            aria-label={t.night.switchAria}
            onClick={() =>
              onChange((current) => ({ ...current, enabled: !current.enabled }))
            }
          >
            <span />
          </button>
        </Card>

        <Card className="expanded-setting time-setting">
          <TimeRow
            label={t.night.start}
            hour={night.startHour}
            minute={night.startMinute}
            hourLabel={t.night.startHour}
            minuteLabel={t.night.startMinute}
            onHourChange={(startHour) =>
              onChange((current) => ({ ...current, startHour }))
            }
            onMinuteChange={(startMinute) =>
              onChange((current) => ({ ...current, startMinute }))
            }
          />
          <TimeRow
            label={t.night.end}
            hour={night.endHour}
            minute={night.endMinute}
            hourLabel={t.night.endHour}
            minuteLabel={t.night.endMinute}
            onHourChange={(endHour) =>
              onChange((current) => ({ ...current, endHour }))
            }
            onMinuteChange={(endMinute) =>
              onChange((current) => ({ ...current, endMinute }))
            }
          />
        </Card>
      </div>

      <FloatingButton onClick={onClose}>{t.common.save}</FloatingButton>
    </section>
  )
}
