import { Card } from "../components/Card"
import { ScreenHeader } from "../components/ScreenHeader"
import { freeFamilyLimit } from "../data/mock"
import { useT } from "../i18n"

/** Explains what Pro adds. No payment step: this is a demo. */
export function ProScreen({ onClose }: { onClose: () => void }) {
  const t = useT()

  return (
    <section className="settings-screen" aria-label={t.pro.title}>
      <ScreenHeader title={t.pro.title} onBack={onClose} />

      <div className="settings-content">
        <Card className="pro-feature">
          <h2>{t.pro.habitTitle}</h2>
          <p>{t.pro.habitBody}</p>
        </Card>
        <Card className="pro-feature">
          <h2>{t.pro.familyTitle}</h2>
          <p>{t.pro.familyBody(freeFamilyLimit)}</p>
        </Card>
        <p className="pro-note">
          <span aria-hidden="true">✓</span>
          {t.pro.bluetoothFree}
        </p>
      </div>
    </section>
  )
}
