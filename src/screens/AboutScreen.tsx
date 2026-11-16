import { Card } from "../components/Card"
import { ScreenHeader } from "../components/ScreenHeader"
import { useT } from "../i18n"

export function AboutScreen({ onClose }: { onClose: () => void }) {
  const t = useT()

  return (
    <section className="settings-screen" aria-label={t.about.title}>
      <ScreenHeader title={t.about.title} onBack={onClose} />

      <div className="settings-content">
        <Card className="about-card">
          <h2>
            {t.brand.name} {t.brand.latin}
          </h2>
          <p>{t.about.description}</p>
        </Card>
        <Card className="about-card">
          <h2>{t.about.demoTitle}</h2>
          <p>{t.about.demoBody}</p>
        </Card>
      </div>
    </section>
  )
}
