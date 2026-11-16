import { useState } from "react"
import { Card } from "../components/Card"
import { ConfirmDialog } from "../components/ConfirmDialog"
import { FloatingButton } from "../components/FloatingButton"
import { ScreenHeader } from "../components/ScreenHeader"
import type { NightMute } from "../data/mock"
import { useT } from "../i18n"
import { halfHours, splitTime } from "../lib/time"

export function NightMuteScreen({
  night,
  onSave,
  onClose,
}: {
  night: NightMute
  onSave: (night: NightMute) => void
  onClose: () => void
}) {
  const t = useT()
  const [draft, setDraft] = useState(night)
  const [asking, setAsking] = useState(false)
  const changed = JSON.stringify(draft) !== JSON.stringify(night)

  const timeSelect = (field: "start" | "end") => (
    <label>
      <span>{t.night[field]}</span>
      <select
        value={draft[field]}
        onChange={(event) =>
          setDraft((current) => ({ ...current, [field]: event.target.value }))
        }
      >
        {halfHours.map((time) => (
          <option value={time} key={time}>
            {t.common.clock(...splitTime(time))}
          </option>
        ))}
      </select>
    </label>
  )

  return (
    <section className="settings-screen" aria-label={t.night.aria}>
      <ScreenHeader
        title={t.night.title}
        onBack={() => (changed ? setAsking(true) : onClose())}
      />

      <div className="settings-content">
        {/* The whole row is the switch, so it is easy to hit. */}
        <button
          className="info-card setting-card switch-row"
          type="button"
          role="switch"
          aria-checked={draft.enabled}
          onClick={() =>
            setDraft((current) => ({ ...current, enabled: !current.enabled }))
          }
        >
          <div>
            <strong>{t.night.enable}</strong>
            <span className="switch-state">
              {draft.enabled ? t.common.on : t.common.off}
            </span>
          </div>
          <span
            className={`compact-switch ${draft.enabled ? "is-on" : ""}`}
            aria-hidden="true"
          >
            <span />
          </span>
        </button>

        <Card className="expanded-setting time-setting">
          {timeSelect("start")}
          {timeSelect("end")}
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
