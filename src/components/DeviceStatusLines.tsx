import { lowBatteryPercent, type DeviceStatus } from "../data/mock"
import { useT } from "../i18n"
import { BatteryIcon, CheckCircleIcon, WarningIcon } from "./Icons"

/** Connection, battery and waiting records of the base, as icon + text lines. */
export function DeviceStatusLines({ device }: { device: DeviceStatus }) {
  const t = useT()

  if (!device.paired) {
    return (
      <p className="status-line is-warn">
        <WarningIcon />
        {t.home.notPaired}
      </p>
    )
  }

  return (
    <>
      {device.connected ? (
        <p className="status-line is-ok">
          <CheckCircleIcon />
          {t.home.deviceConnected}
        </p>
      ) : (
        <p className="status-line is-warn">
          <WarningIcon />
          {t.home.deviceDisconnected}
        </p>
      )}
      {device.batteryPercent <= lowBatteryPercent ? (
        <p className="status-line is-warn">
          <WarningIcon />
          {t.home.batteryLow(device.batteryPercent)}
        </p>
      ) : (
        <p className="status-line">
          <BatteryIcon />
          {t.home.battery(device.batteryPercent)}
        </p>
      )}
      {device.pendingSyncCount > 0 && (
        <p className="status-line">
          {t.home.pendingSync(device.pendingSyncCount)}
        </p>
      )}
    </>
  )
}
