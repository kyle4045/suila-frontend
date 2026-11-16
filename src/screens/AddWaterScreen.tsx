import { useState } from "react"
import { FloatingButton } from "../components/FloatingButton"
import { ScreenHeader } from "../components/ScreenHeader"
import { drinkAmountLimits, quickAmountsMl } from "../data/mock"
import { useT } from "../i18n"

export function AddWaterScreen({
  onAdd,
  onClose,
}: {
  onAdd: (amountMl: number) => void
  onClose: () => void
}) {
  const t = useT()
  const [amount, setAmount] = useState("")
  const parsedAmount = Number(amount)
  const canAdd =
    Number.isInteger(parsedAmount) &&
    parsedAmount >= drinkAmountLimits.min &&
    parsedAmount <= drinkAmountLimits.max
  const cupLevel = canAdd ? Math.min(100, (parsedAmount / 500) * 100) : 0

  return (
    <section className="extra-water-screen" aria-label={t.addWater.title}>
      <ScreenHeader title={t.addWater.title} onBack={onClose} />

      <div className="extra-water-content">
        <div className="water-cup-area">
          <div
            className="water-cup"
            role="img"
            aria-label={t.addWater.cupAria(Math.round(cupLevel))}
          >
            <div className="water-cup-fill" style={{ height: `${cupLevel}%` }}>
              <span />
            </div>
          </div>
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
    </section>
  )
}
