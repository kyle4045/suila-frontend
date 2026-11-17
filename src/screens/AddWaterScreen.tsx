import { useState } from "react"
import { ConfirmDialog } from "../components/ConfirmDialog"
import { FloatingButton } from "../components/FloatingButton"
import { ScreenHeader } from "../components/ScreenHeader"
import { WaterBottle } from "../components/WaterBottle"
import { drinkAmountLimits, quickAmountsMl } from "../data/mock"
import { useT } from "../i18n"
import { useCountUp } from "../lib/useCountUp"

export function AddWaterScreen({
  onAdd,
  onClose,
}: {
  onAdd: (amountMl: number) => void
  onClose: () => void
}) {
  const t = useT()
  const [amount, setAmount] = useState("")
  const [asking, setAsking] = useState(false)
  const parsedAmount = Number(amount)
  const canAdd =
    Number.isInteger(parsedAmount) &&
    parsedAmount >= drinkAmountLimits.min &&
    parsedAmount <= drinkAmountLimits.max
  // The bottle on this page holds 500 毫升; more than that shows it full.
  const cupLevel = canAdd ? Math.min(100, (parsedAmount / 500) * 100) : 0
  const readout = useCountUp(canAdd ? parsedAmount : 0)

  return (
    <section className="extra-water-screen is-techy" aria-label={t.addWater.title}>
      <ScreenHeader
        title={t.addWater.title}
        onBack={() => (amount !== "" ? setAsking(true) : onClose())}
      />

      <div className="extra-water-content">
        <div className="water-cup-area">
          <div role="img" aria-label={t.addWater.cupAria(Math.round(cupLevel))}>
            <WaterBottle level={cupLevel / 100} className="is-large" />
          </div>
          <p className="readout" aria-hidden="true">
            <strong>{readout}</strong>
            <span>{t.common.ml}</span>
          </p>
          <p aria-live="polite">
            {canAdd ? t.addWater.ready(parsedAmount) : t.addWater.prompt}
          </p>
        </div>

        <div className="extra-water-form">
          <p className="form-label">{t.addWater.quickLabel}</p>
          <div className="quick-row">
            {quickAmountsMl.map((quick) => (
              <button
                className="quick-amount"
                type="button"
                key={quick}
                aria-pressed={parsedAmount === quick}
                onClick={() => setAmount(String(quick))}
              >
                <strong>{quick}</strong>
                {t.common.ml}
              </button>
            ))}
          </div>
          <label>
            {t.addWater.inputLabel}
            <div className="extra-water-input">
              <input
                type="number"
                inputMode="numeric"
                min={drinkAmountLimits.min}
                max={drinkAmountLimits.max}
                placeholder={t.addWater.placeholder}
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
              />
              <strong>{t.common.ml}</strong>
            </div>
          </label>
        </div>
      </div>

      <FloatingButton
        disabled={!canAdd}
        onClick={() => {
          if (canAdd) onAdd(parsedAmount)
        }}
      >
        {t.addWater.add}
      </FloatingButton>
      {asking && (
        <ConfirmDialog
          message={t.addWater.unsaved}
          confirmLabel={t.common.leave}
          cancelLabel={t.common.stay}
          onConfirm={onClose}
          onCancel={() => setAsking(false)}
        />
      )}
    </section>
  )
}
