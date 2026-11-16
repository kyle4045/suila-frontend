import { Card } from "../components/Card"
import { ScreenHeader } from "../components/ScreenHeader"
import { demoValues } from "../data/mock"
import { useT } from "../i18n"

export type DemoData = "normal" | "dayOne"
export type DemoDevice = "connected" | "offline" | "unpaired"

/** One group of either/or choices. The current one is filled in and ticked. */
function Choices<Value extends string | boolean>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: Value
  options: { value: Value; label: string }[]
  onChange: (value: Value) => void
}) {
  return (
    <Card>
      <p className="card-label">{label}</p>
      <div className="choice-list">
        {options.map((option) => {
          const selected = option.value === value
          return (
            <button
              className="choice-button"
              type="button"
              key={String(option.value)}
              aria-pressed={selected}
              onClick={() => onChange(option.value)}
            >
              {selected && <span aria-hidden="true">✓ </span>}
              {option.label}
            </button>
          )
        })}
      </div>
    </Card>
  )
}

/**
 * Presenter-only controls for showing each state live. Opened by tapping the
 * app name five times; nothing in the normal UI leads here.
 */
export function DemoPanelScreen({
  data,
  device,
  batteryLow,
  lineConnected,
  isPro,
  onData,
  onDevice,
  onBatteryLow,
  onLine,
  onPro,
  onReset,
  onClose,
}: {
  data: DemoData
  device: DemoDevice
  batteryLow: boolean
  lineConnected: boolean
  isPro: boolean
  onData: (value: DemoData) => void
  onDevice: (value: DemoDevice) => void
  onBatteryLow: (value: boolean) => void
  onLine: (value: boolean) => void
  onPro: (value: boolean) => void
  onReset: () => void
  onClose: () => void
}) {
  const t = useT()

  return (
    <section className="settings-screen" aria-label={t.demo.title}>
      <ScreenHeader title={t.demo.title} onBack={onClose} />

      <div className="settings-content">
        <p className="demo-hint">{t.demo.hint}</p>
        <Choices
          label={t.demo.data}
          value={data}
          onChange={onData}
          options={[
            { value: "normal", label: t.demo.dataNormal },
            { value: "dayOne", label: t.demo.dataDayOne },
          ]}
        />
        <Choices
          label={t.demo.device}
          value={device}
          onChange={onDevice}
          options={[
            { value: "connected", label: t.demo.deviceConnected },
            {
              value: "offline",
              label: t.demo.deviceOffline(demoValues.offlinePendingCount),
            },
            { value: "unpaired", label: t.demo.deviceUnpaired },
          ]}
        />
        <Choices
          label={t.demo.battery}
          value={batteryLow}
          onChange={onBatteryLow}
          options={[
            {
              value: false,
              label: t.demo.batteryNormal(demoValues.normalBatteryPercent),
            },
            {
              value: true,
              label: t.demo.batteryLow(demoValues.lowBatteryPercent),
            },
          ]}
        />
        <Choices
          label={t.demo.line}
          value={lineConnected}
          onChange={onLine}
          options={[
            { value: true, label: t.demo.lineOn },
            { value: false, label: t.demo.lineOff },
          ]}
        />
        <Choices
          label={t.demo.pro}
          value={isPro}
          onChange={onPro}
          options={[
            { value: false, label: t.demo.proOff },
            { value: true, label: t.demo.proOn },
          ]}
        />
        <button className="danger-button" type="button" onClick={onReset}>
          {t.demo.reset}
        </button>
      </div>
    </section>
  )
}
