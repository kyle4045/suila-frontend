import { useEffect, useState } from "react"
import { Card } from "../components/Card"
import { FloatingButton } from "../components/FloatingButton"
import { CheckCircleIcon } from "../components/Icons"
import { ScreenHeader } from "../components/ScreenHeader"
import { useT } from "../i18n"

// shortcut: there is no real Bluetooth. "Searching" is a two-second wait
// that always succeeds. Replace with the real pairing call later.
const searchMs = 2000

export function PairingScreen({
  onPaired,
  onClose,
}: {
  onPaired: () => void
  onClose: () => void
}) {
  const t = useT()
  const [phase, setPhase] = useState<"steps" | "searching" | "done">("steps")

  useEffect(() => {
    if (phase !== "searching") return
    const timer = setTimeout(() => setPhase("done"), searchMs)
    return () => clearTimeout(timer)
  }, [phase])

  return (
    <section className="settings-screen" aria-label={t.pairing.title}>
      <ScreenHeader title={t.pairing.title} onBack={onClose} />

      <div className="settings-content">
        {phase === "steps" && (
          <Card>
            <p className="card-label">{t.pairing.stepsLabel}</p>
            <ol className="pair-steps">
              {t.pairing.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </Card>
        )}
        <div aria-live="polite">
          {phase === "searching" && (
            <Card>
              <p className="pair-status">{t.pairing.searching}</p>
            </Card>
          )}
          {phase === "done" && (
            <Card>
              <p className="pair-status is-ok">
                <CheckCircleIcon />
                {t.pairing.success}
              </p>
            </Card>
          )}
        </div>
      </div>

      {phase === "steps" && (
        <FloatingButton onClick={() => setPhase("searching")}>
          {t.pairing.start}
        </FloatingButton>
      )}
      {phase === "done" && (
        <FloatingButton onClick={onPaired}>{t.pairing.done}</FloatingButton>
      )}
    </section>
  )
}
