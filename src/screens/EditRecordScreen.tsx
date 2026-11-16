import { useState } from "react"
import { Card } from "../components/Card"
import { ConfirmDialog } from "../components/ConfirmDialog"
import { FloatingButton } from "../components/FloatingButton"
import { ScreenHeader } from "../components/ScreenHeader"
import { drinkAmountLimits, type DrinkRecord } from "../data/mock"
import { useT } from "../i18n"
import { isToday } from "../lib/date"

export function EditRecordScreen({
  record,
  onSave,
  onDelete,
  onClose,
}: {
  record: DrinkRecord
  onSave: (amountMl: number) => void
  onDelete: () => void
  onClose: () => void
}) {
  const t = useT()
  const [amount, setAmount] = useState(String(record.amountMl))
  const [asking, setAsking] = useState<"delete" | "leave" | null>(null)
  const date = new Date(record.time)
  const time = t.common.dayTime(date, isToday(date))
  const parsed = Number(amount)
  const valid =
    Number.isInteger(parsed) &&
    parsed >= drinkAmountLimits.min &&
    parsed <= drinkAmountLimits.max
  const changed = amount !== String(record.amountMl)

  return (
    <section className="settings-screen" aria-label={t.editRecord.title}>
      <ScreenHeader
        title={t.editRecord.title}
        onBack={() => (changed ? setAsking("leave") : onClose())}
      />

      <div className="settings-content">
        <Card>
          <div className="profile-form">
            <p className="card-label">{t.editRecord.heading(time)}</p>
            <label>
              <span>{t.editRecord.amount}</span>
              <input
                type="number"
                inputMode="numeric"
                min={drinkAmountLimits.min}
                max={drinkAmountLimits.max}
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                aria-describedby="edit-record-hint"
              />
            </label>
            <p className="field-hint" id="edit-record-hint">
              {t.editRecord.hint(drinkAmountLimits.min, drinkAmountLimits.max)}
            </p>
          </div>
        </Card>

        <button
          className="danger-button"
          type="button"
          onClick={() => setAsking("delete")}
        >
          {t.editRecord.delete}
        </button>
      </div>

      <FloatingButton disabled={!valid} onClick={() => onSave(parsed)}>
        {t.common.save}
      </FloatingButton>

      {asking === "delete" && (
        <ConfirmDialog
          danger
          message={t.editRecord.deleteConfirm(
            time,
            t.home.recordAmount(record.amountMl),
          )}
          confirmLabel={t.editRecord.deleteYes}
          cancelLabel={t.editRecord.deleteNo}
          onConfirm={onDelete}
          onCancel={() => setAsking(null)}
        />
      )}

      {asking === "leave" && (
        <ConfirmDialog
          message={t.common.unsaved}
          confirmLabel={t.common.leave}
          cancelLabel={t.common.stay}
          onConfirm={onClose}
          onCancel={() => setAsking(null)}
        />
      )}
    </section>
  )
}
