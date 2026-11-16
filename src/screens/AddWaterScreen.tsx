import { useState } from "react"
import { ScreenHeader } from "../components/ScreenHeader"
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
  const cupLevel =
    Number.isFinite(parsedAmount) && parsedAmount > 0
      ? Math.min(100, (parsedAmount / 500) * 100)
      : 0
  const canAdd = parsedAmount > 0

  return (
    <section className="extra-water-screen" aria-label={t.addWater.aria}>
      <ScreenHeader
        className="extra-water-header"
        closeLabel={t.addWater.close}
        onClose={onClose}
      >
        <h1>{t.addWater.title}</h1>
      </ScreenHeader>

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
          <p>{canAdd ? t.addWater.ready(parsedAmount) : t.addWater.prompt}</p>
        </div>

        <div className="extra-water-form">
          <label>
            <div className="extra-water-input">
              <input
                type="number"
                inputMode="numeric"
                min="1"
                max="2000"
                placeholder={t.addWater.placeholder}
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                aria-label={t.addWater.inputAria}
                autoFocus
              />
              <strong>{t.common.mlShort}</strong>
            </div>
          </label>
          <button
            className="add-water-button"
            type="button"
            disabled={!canAdd}
            onClick={() => {
              if (canAdd) onAdd(parsedAmount)
            }}
          >
            {t.addWater.add}
          </button>
        </div>
      </div>
    </section>
  )
}
