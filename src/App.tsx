import { useEffect, useState } from "react"
import { BottomNav, familyPage, pageCount } from "./components/BottomNav"
import { Toast } from "./components/Toast"
import {
  deviceStatus,
  drinkRecords,
  type DrinkRecord,
  familyMembers,
  fluidSensitiveConditions,
  initialCalendarSelection,
  initialLineConnected,
  initialNightMute,
  initialProfile,
  initialReminderSettings,
  reminderDays,
  voiceMessages,
} from "./data/mock"
import { useT } from "./i18n"
import { isToday } from "./lib/date"
import { useVoicePlayer } from "./lib/useVoicePlayer"
import { AboutScreen } from "./screens/AboutScreen"
import { AddWaterScreen } from "./screens/AddWaterScreen"
import { EditRecordScreen } from "./screens/EditRecordScreen"
import { DeviceScreen } from "./screens/DeviceScreen"
import { PairingScreen } from "./screens/PairingScreen"
import { CalendarScreen } from "./screens/CalendarScreen"
import { FamilyScreen } from "./screens/FamilyScreen"
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
  const [night, setNight] = useState(initialNightMute)
  const [device, setDevice] = useState(deviceStatus)
  // Where to go back to when the pairing page closes.
  const [pairingBack, setPairingBack] = useState<Overlay>(null)
  const openPairing = () => {
    setPairingBack(overlay)
    setOverlay("pairing")
  }
  const [reminders, setReminders] = useState(initialReminderSettings)
  const [calendarSelection, setCalendarSelection] = useState(
    initialCalendarSelection,
  )
  const waterPercentage = Math.min(
    100,
    Math.round((todayWater / reminders.dailyGoalMl) * 100),
  )
  const [lineConnected, setLineConnected] = useState(initialLineConnected)
  const [messages, setMessages] = useState(voiceMessages)
  const voice = useVoicePlayer()
  // New messages only count while LINE is linked.
  const newMessageCount = lineConnected
    ? messages.filter((message) => !message.played).length
    : 0
  const [toast, setToast] = useState<string | null>(null)
  const closeOverlay = () => setOverlay(null)

  // Confirmation messages disappear on their own after a few seconds.
  useEffect(() => {
    if (toast === null) return
    const timer = setTimeout(() => setToast(null), 4000)
    return () => clearTimeout(timer)
  }, [toast])

  const moveToPage = (page: number) => {
    setCurrentPage(Math.max(0, Math.min(pageCount - 1, page)))
  }

  return (
    <main className="app-shell">
      <div className="page">
        <header className="topbar">
          <div className="brand" aria-label={t.brand.aria}>
            <span className="brand-name">
              {t.brand.name}
              <small>{t.brand.latin}</small>
            </span>
          </div>
        </header>

        <div className="swipe-window">
          <div
            className="swipe-track"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            <HomeScreen
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
              onOpenAddWater={() => setOverlay("addWater")}
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
              onAddMember={() => setOverlay("pro")}
            />
            <MyScreen
              onOpenProfile={() => setOverlay("profile")}
              onOpenReminders={() => setOverlay("reminders")}
              onOpenNightMute={() => setOverlay("nightMute")}
              onOpenDevice={() => setOverlay("device")}
              onOpenAbout={() => setOverlay("about")}
              onOpenPro={() => setOverlay("pro")}
            />
          </div>
        </div>

        {overlay === "calendar" && (
          <CalendarScreen
            reminderDays={reminderDays}
            selection={calendarSelection}
            onSelect={setCalendarSelection}
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

        {overlay === "about" && <AboutScreen onClose={closeOverlay} />}

        {overlay === "pro" && <ProScreen onClose={closeOverlay} />}

        {/* Home's main action. Floats above the navigation, on the 喝水 tab only. */}
        {currentPage === 0 && (
          <button
            className="floating-action home-action"
            type="button"
            onClick={() => setOverlay("addWater")}
          >
            {t.home.addWater}
          </button>
        )}

        <Toast message={toast} />
        <BottomNav
          currentPage={currentPage}
          newMessageCount={newMessageCount}
          onSelect={moveToPage}
        />
      </div>
    </main>
  )
}
