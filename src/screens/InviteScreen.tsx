import { Card } from "../components/Card"
import { FloatingButton } from "../components/FloatingButton"
import { ScreenHeader } from "../components/ScreenHeader"
import { familyInviteLink } from "../data/mock"
import { useT } from "../i18n"

/**
 * Premium only: how another family member joins through LINE.
 * The real invite (and the LINE linking behind it) is the backend's job;
 * the link here is a placeholder from the sample data.
 */
export function InviteScreen({
  onShared,
  onClose,
}: {
  onShared: (message: string) => void
  onClose: () => void
}) {
  const t = useT()

  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: t.invite.title, url: familyInviteLink })
        onShared(t.invite.sharedToast)
        return
      }
      await navigator.clipboard.writeText(familyInviteLink)
      onShared(t.invite.copiedToast)
    } catch {
      // Cancelled by the user, or sharing is not allowed here: say so plainly.
      onShared(t.invite.failedToast)
    }
  }

  return (
    <section className="settings-screen" aria-label={t.invite.title}>
      <ScreenHeader title={t.invite.title} onBack={onClose} />

      <div className="settings-content">
        <Card>
          <p className="card-label">{t.invite.stepsLabel}</p>
          <ol className="pair-steps">
            {t.invite.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </Card>
      </div>

      <FloatingButton onClick={share}>{t.invite.share}</FloatingButton>
    </section>
  )
}
