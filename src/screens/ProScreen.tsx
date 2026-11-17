import { useState } from "react"
import { Card } from "../components/Card"
import { ConfirmDialog } from "../components/ConfirmDialog"
import { FloatingButton } from "../components/FloatingButton"
import { CheckCircleIcon } from "../components/Icons"
import { ScreenHeader } from "../components/ScreenHeader"
import { freeFamilyLimit, premiumPlans, type PremiumPlan } from "../data/mock"
import { useT } from "../i18n"

/**
 * What SuiLa Premium adds, and a pretend way to switch to it.
 * shortcut: no real payment; onSubscribe only flips the demo state. Connect
 * to the backend's subscription call when it exists.
 */
export function ProScreen({
  isPro,
  onSubscribe,
  onClose,
}: {
  isPro: boolean
  onSubscribe: (plan: PremiumPlan) => void
  onClose: () => void
}) {
  const t = useT()
  const [plan, setPlan] = useState<PremiumPlan>("yearly")
  const [asking, setAsking] = useState(false)

  return (
    <section className="settings-screen" aria-label={t.pro.title}>
      <ScreenHeader title={t.pro.title} onBack={onClose} />

      <div className="settings-content">
        {isPro && (
          <p className="pro-note">
            <CheckCircleIcon />
            {t.pro.activeTitle}
          </p>
        )}
        <Card className="pro-feature">
          <h2>{t.pro.habitTitle}</h2>
          <p>{t.pro.habitBody}</p>
        </Card>
        <Card className="pro-feature">
          <h2>{t.pro.familyTitle}</h2>
          <p>{t.pro.familyBody(freeFamilyLimit)}</p>
        </Card>

        {!isPro && (
          <Card>
            <p className="card-label">{t.pro.choosePlan}</p>
            <div className="plan-list">
              {premiumPlans.map((option) => (
                <button
                  className="plan-option"
                  type="button"
                  key={option}
                  aria-pressed={plan === option}
                  onClick={() => setPlan(option)}
                >
                  <strong>
                    {plan === option && <span aria-hidden="true">✓ </span>}
                    {t.pro.plans[option]}
                  </strong>
                  <span>{t.pro.priceTbd}</span>
                </button>
              ))}
            </div>
            <p className="field-hint">{t.pro.demoNote}</p>
          </Card>
        )}

        <p className="pro-note">
          <span aria-hidden="true">✓</span>
          {t.pro.bluetoothFree}
        </p>
      </div>

      {!isPro && (
        <FloatingButton onClick={() => setAsking(true)}>
          {t.my.proTitle}
        </FloatingButton>
      )}

      {asking && (
        <ConfirmDialog
          message={t.pro.confirm(t.pro.plans[plan])}
          confirmLabel={t.pro.confirmYes}
          cancelLabel={t.pro.confirmNo}
          onConfirm={() => {
            setAsking(false)
            onSubscribe(plan)
          }}
          onCancel={() => setAsking(false)}
        />
      )}
    </section>
  )
}
