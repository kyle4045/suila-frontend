import { useEffect, useRef, useState } from "react"
import { BottomNav, familyPage, pageCount } from "./components/BottomNav"
import { Toast } from "./components/Toast"
import {
  demoValues,
  deviceStatus,
  drinkRecords,
  type DrinkRecord,
  familyMembers,
  fluidSensitiveConditions,
  initialIsPro,
  initialLineConnected,
  initialNightMute,
  initialProfile,
  initialReminderSettings,
  voiceMessages,
} from "./data/mock"
import { defaultNames, useT } from "./i18n"
import { isToday } from "./lib/date"
import { useTabSwipe } from "./lib/useTabSwipe"
import { useVoicePlayer } from "./lib/useVoicePlayer"
import { AboutScreen } from "./screens/AboutScreen"
import { AddWaterScreen } from "./screens/AddWaterScreen"
import { EditRecordScreen } from "./screens/EditRecordScreen"
import {
  DemoPanelScreen,
  type DemoData,
} from "./screens/DemoPanelScreen"
import { DeviceScreen } from "./screens/DeviceScreen"
import { PairingScreen } from "./screens/PairingScreen"
import { CalendarScreen } from "./screens/CalendarScreen"
import { FamilyScreen } from "./screens/FamilyScreen"
import { HabitsScreen } from "./screens/HabitsScreen"
import { InviteScreen } from "./screens/InviteScreen"
import { HomeScreen } from "./screens/HomeScreen"
import { MyScreen } from "./screens/MyScreen"
import { NightMuteScreen } from "./screens/NightMuteScreen"
import { ProScreen } from "./screens/ProScreen"
import { ProfileScreen } from "./screens/ProfileScreen"
import { ReminderSettingsScreen } from "./screens/ReminderSettingsScreen"

type Overlay =
  | "calendar"
  | "addWater"
  | "editRecord"
  | "profile"
  | "reminders"
  | "nightMute"
  | "device"
  | "pairing"
  | "about"
  | "habits"
  | "invite"
  | "demo"
  | "pro"
  | null

export default function App() {
  const t = useT()
  const [currentPage, setCurrentPage] = useState(0)
  const [overlay, setOverlay] = useState<Overlay>(null)
  const [records, setRecords] = useState(drinkRecords)
  const [editingRecord, setEditingRecord] = useState<DrinkRecord | null>(null)
  const todayRecords = records.filter((record) => isToday(new Date(record.time)))
  const todayWater = todayRecords.reduce(
    (total, record) => total + record.amountMl,
    0,
  )
  const [profile, setProfile] = useState(() =>
    initialProfile(t.profile.defaultName),
  )
  // The sample owner's name follows the language, unless the user typed their own.
  useEffect(() => {
    setProfile((current) =>
      defaultNames.includes(current.name)
        ? { ...current, name: t.profile.defaultName }
        : current,
    )
  }, [t])
  const [night, setNight] = useState(initialNightMute)
  const [device, setDevice] = useState(deviceStatus)
  // Where to go back to when the pairing page closes.
  const [pairingBack, setPairingBack] = useState<Overlay>(null)
  const openPairing = () => {
    setPairingBack(overlay)
    setOverlay("pairing")
  }
  const [reminders, setReminders] = useState(initialReminderSettings)
  const waterPercentage = Math.min(
    100,
    Math.round((todayWater / reminders.dailyGoalMl) * 100),
  )
  const [lineConnected, setLineConnected] = useState(initialLineConnected)
  const [isPro, setIsPro] = useState(initialIsPro)
  const [demoData, setDemoData] = useState<DemoData>("normal")
  // Hidden way into the demo panel: five quick taps on the app name.
  const brandTaps = useRef({ count: 0, last: 0 })
  const handleBrandTap = () => {
    const now = Date.now()
    const taps = brandTaps.current
    taps.count = now - taps.last < 600 ? taps.count + 1 : 1
    taps.last = now
    if (taps.count >= 5) {
      taps.count = 0
      setOverlay("demo")
    }
  }
  const [messages, setMessages] = useState(voiceMessages)
  const voice = useVoicePlayer()
  // New messages only count while LINE is linked.
  const newMessageCount = lineConnected
    ? messages.filter((message) => !message.played).length
    : 0
  const [toast, setToast] = useState<string | null>(null)
  // Full-screen views slide out before they are removed.
  const [closing, setClosing] = useState(false)
  const closeOverlay = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOverlay(null)
      return
    }
    setClosing(true)
    window.setTimeout(() => {
      setOverlay(null)
      setClosing(false)
    }, 200)
  }

  // Confirmation messages disappear on their own after a few seconds.
  useEffect(() => {
    if (toast === null) return
    const timer = setTimeout(() => setToast(null), 4000)
    return () => clearTimeout(timer)
  }, [toast])

  const moveToPage = (page: number) => {
    setCurrentPage(Math.max(0, Math.min(pageCount - 1, page)))
  }

  const shell = useRef<HTMLDivElement>(null)
  const swipe = useTabSwipe(shell, currentPage, pageCount, moveToPage)

  return (
    <main className="app-shell">
      <div className={closing ? "page is-closing" : "page"} ref={shell}>
        <header className="topbar">
          <div
            className="brand"
            aria-label={t.brand.aria}
            onClick={handleBrandTap}
          >
            <span className="brand-name">
              {t.brand.name}
              <small>{t.brand.latin}</small>
            </span>
          </div>
        </header>

        <div className="swipe-window">
          <div className="swipe-track">
            <HomeScreen
              records={records}
              isPro={isPro}
              onOpenHabits={() => setOverlay(isPro ? "habits" : "pro")}
              todayWater={todayWater}
              goalMl={reminders.dailyGoalMl}
              waterPercentage={waterPercentage}
              device={device}
              onPair={openPairing}
              todayRecords={todayRecords}
              onEditRecord={(record) => {
                setEditingRecord(record)
                setOverlay("editRecord")
              }}
              newMessageCount={newMessageCount}
              onOpenCalendar={() => setOverlay("calendar")}
              onOpenMessages={() => moveToPage(familyPage)}
            />
            <FamilyScreen
              connected={lineConnected}
              members={familyMembers}
              messages={messages}
              playingId={voice.playingId}
              onPlay={(message) => {
                voice.play(
                  message.id,
                  t.family.messageText[message.id],
                  t.common.speechLang,
                  message.durationSec,
                )
                setMessages((current) =>
                  current.map((item) =>
                    item.id === message.id ? { ...item, played: true } : item,
                  ),
                )
              }}
              onStop={voice.stop}
              onConnect={() => {
                setLineConnected(true)
                setToast(t.family.connectedToast)
              }}
              isPro={isPro}
              onAddMember={() => setOverlay(isPro ? "invite" : "pro")}
            />
            <MyScreen
              onOpenProfile={() => setOverlay("profile")}
              onOpenReminders={() => setOverlay("reminders")}
              onOpenNightMute={() => setOverlay("nightMute")}
              onOpenDevice={() => setOverlay("device")}
              onOpenHabits={() => setOverlay(isPro ? "habits" : "pro")}
              onOpenAbout={() => setOverlay("about")}
              onOpenPro={() => setOverlay("pro")}
              isPro={isPro}
            />
          </div>
        </div>

        {overlay === "calendar" && (
          <CalendarScreen
            records={records}
            goalMl={reminders.dailyGoalMl}
            onClose={closeOverlay}
          />
        )}

        {overlay === "addWater" && (
          <AddWaterScreen
            onAdd={(amountMl) => {
              // shortcut: new records go on top without re-sorting by time.
              setRecords((current) => [
                {
                  id: `r${Date.now()}`,
                  time: new Date().toISOString(),
                  amountMl,
                },
                ...current,
              ])
              setToast(t.home.addedToast(amountMl))
              closeOverlay()
            }}
            onClose={closeOverlay}
          />
        )}

        {overlay === "editRecord" && editingRecord && (
          <EditRecordScreen
            record={editingRecord}
            onSave={(amountMl) => {
              setRecords((current) =>
                current.map((record) =>
                  record.id === editingRecord.id
                    ? { ...record, amountMl }
                    : record,
                ),
              )
              setToast(t.editRecord.updatedToast)
              closeOverlay()
            }}
            onDelete={() => {
              setRecords((current) =>
                current.filter((record) => record.id !== editingRecord.id),
              )
              setToast(t.editRecord.deletedToast)
              closeOverlay()
            }}
            onClose={closeOverlay}
          />
        )}

        {overlay === "profile" && (
          <ProfileScreen
            profile={profile}
            onChange={setProfile}
            onClose={closeOverlay}
          />
        )}

        {overlay === "reminders" && (
          <ReminderSettingsScreen
            settings={reminders}
            showHealthNote={profile.conditions.some((condition) =>
              fluidSensitiveConditions.includes(condition),
            )}
            onSave={(settings) => {
              setReminders(settings)
              setToast(t.reminders.savedToast)
              closeOverlay()
            }}
            onClose={closeOverlay}
          />
        )}

        {overlay === "nightMute" && (
          <NightMuteScreen
            night={night}
            onSave={(saved) => {
              setNight(saved)
              setToast(t.night.savedToast)
              closeOverlay()
            }}
            onClose={closeOverlay}
          />
        )}

        {overlay === "device" && (
          <DeviceScreen
            device={device}
            onPair={openPairing}
            onClose={closeOverlay}
          />
        )}

        {overlay === "pairing" && (
          <PairingScreen
            onPaired={() => {
              setDevice((current) => ({
                ...current,
                paired: true,
                connected: true,
              }))
              setOverlay(pairingBack)
            }}
            onClose={() => setOverlay(pairingBack)}
          />
        )}

        {overlay === "habits" && (
          <HabitsScreen
            records={records}
            goalMl={reminders.dailyGoalMl}
            advice={null}
            hasSensitiveCondition={profile.conditions.some((condition) =>
              fluidSensitiveConditions.includes(condition),
            )}
            onAddReminder={() => setOverlay("reminders")}
            onClose={closeOverlay}
          />
        )}

        {overlay === "about" && <AboutScreen onClose={closeOverlay} />}

        {overlay === "demo" && (
          <DemoPanelScreen
            data={demoData}
            device={
              !device.paired
                ? "unpaired"
                : device.connected
                  ? "connected"
                  : "offline"
            }
            batteryLow={
              device.batteryPercent === demoValues.lowBatteryPercent
            }
            lineConnected={lineConnected}
            isPro={isPro}
            onData={(value) => {
              voice.stop()
              setDemoData(value)
              setRecords(value === "dayOne" ? [] : drinkRecords)
              setMessages(value === "dayOne" ? [] : voiceMessages)
            }}
            onDevice={(value) =>
              setDevice((current) => ({
                ...current,
                paired: value !== "unpaired",
                connected: value === "connected",
                pendingSyncCount:
                  value === "offline" ? demoValues.offlinePendingCount : 0,
              }))
            }
            onBatteryLow={(low) =>
              setDevice((current) => ({
                ...current,
                batteryPercent: low
                  ? demoValues.lowBatteryPercent
                  : demoValues.normalBatteryPercent,
              }))
            }
            onLine={setLineConnected}
            onPro={setIsPro}
            // Nothing is stored, so reloading puts every screen back to the start.
            onReset={() => window.location.reload()}
            onClose={closeOverlay}
          />
        )}

        {overlay === "pro" && (
          <ProScreen
            isPro={isPro}
            onSubscribe={() => {
              setIsPro(true)
              setToast(t.pro.upgradedToast)
            }}
            onClose={closeOverlay}
          />
        )}

        {overlay === "invite" && (
          <InviteScreen onShared={setToast} onClose={closeOverlay} />
        )}

        {/* Home's main action. Floats above the navigation, on the 喝水 tab only. */}
        <button
          className={`floating-action home-action ${currentPage === 0 ? "" : "is-away"}`.trim()}
          type="button"
          tabIndex={currentPage === 0 ? undefined : -1}
          aria-hidden={currentPage === 0 ? undefined : true}
          onClick={() => setOverlay("addWater")}
        >
          {t.home.addWater}
        </button>

        <Toast message={toast} />
        <BottomNav
          slideHandlers={swipe}
          currentPage={currentPage}
          newMessageCount={newMessageCount}
          onSelect={moveToPage}
        />
      </div>
    </main>
  )
}
