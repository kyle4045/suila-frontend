import { Card } from "../components/Card"
import { DeviceStatusLines } from "../components/DeviceStatusLines"
import { ScreenHeader } from "../components/ScreenHeader"
import { baseLightColors, type DeviceStatus } from "../data/mock"
import { useT } from "../i18n"

export function DeviceScreen({
  device,
  onPair,
  onClose,
}: {
  device: DeviceStatus
  onPair: () => void
  onClose: () => void
}) {
  const t = useT()

  return (
    <section className="settings-screen" aria-label={t.device.title}>
      <ScreenHeader title={t.device.title} onBack={onClose} />

      <div className="settings-content">
        <Card className="device-status">
          <DeviceStatusLines device={device} />
          {device.paired && (
            <p className="status-line">
              {t.device.pairedTo(t.device.baseName)}
            </p>
          )}
          <button
            className="outline-button is-wide"
            type="button"
            onClick={onPair}
          >
            {device.paired ? t.device.repair : t.home.pairButton}
          </button>
        </Card>

        <Card>
          <p className="card-label">{t.device.legendTitle}</p>
          {baseLightColors.map((color) => (
            <div className="legend-row" key={color}>
              <span className={`light-dot ${color}`} aria-hidden="true" />
              <strong>{t.device.lights[color].name}</strong>
              <span>{t.device.lights[color].meaning}</span>
            </div>
          ))}
        </Card>
      </div>
    </section>
  )
}
