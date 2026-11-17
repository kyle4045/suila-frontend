import { useCallback, useEffect, useRef, useState } from "react"
import { api, type AppData } from "./api"
import { BottomNav, familyPage, pageCount } from "./components/BottomNav"
import { Toast } from "./components/Toast"
import {
  demoValues,
  drinkRecords,
  type DrinkRecord,
  fluidSensitiveConditions,
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

/** How often to ask the backend for new voice messages while the app is open. */
const messageCheckMs = 60_000

/** Loads everything from the backend first, then shows the app. */
export default function App() {
  const t = useT()
  const [data, setData] = useState<AppData | null>(null)
  const [failed, setFailed] = useState(false)

  const load = useCallback(() => {
    setFailed(false)
    api.loadAll().then(setData, () => setFailed(true))
  }, [])
  useEffect(load, [load])

  if (!data) {
    return (
      <main className="app-shell">
        <div className="page load-screen" role="status" aria-live="polite">
          <p className="load-brand">
            {t.brand.name} <small>{t.brand.latin}</small>
          </p>
          <p>{failed ? t.common.loadFailed : t.common.loading}</p>
          {failed && (
            <button className="outline-button" type="button" onClick={load}>
              {t.common.retry}
            </button>
          )}
        </div>
      </main>
    )
  }
  return <LoadedApp initial={data} />
}

function LoadedApp({ initial }: { initial: AppData }) {
  const t = useT()
  const [currentPage, setCurrentPage] = useState(0)
  const [overlay, setOverlay] = useState<Overlay>(null)
  const [records, setRecords] = useState(initial.records)
  const [editingRecord, setEditingRecord] = useState<DrinkRecord | null>(null)
  const todayRecords = records.filter((record) => isToday(new Date(record.time)))
  const todayWater = todayRecords.reduce(
    (total, record) => total + record.amountMl,
    0,
  )
  const [profile, setProfile] = useState(initial.profile)
  // The sample owner's name follows the language, unless the user typed their own.
  useEffect(() => {
    setProfile((current) =>
      defaultNames.includes(current.name)
        ? { ...current, name: t.profile.defaultName }
        : current,
    )
  }, [t])
  const [night, setNight] = useState(initial.nightMute)
  const [device, setDevice] = useState(initial.device)
  // Where to go back to when the pairing page closes.
  const [pairingBack, setPairingBack] = useState<Overlay>(null)
  const openPairing = () => {
    setPairingBack(overlay)
    setOverlay("pairing")
  }
  const [reminders, setReminders] = useState(initial.reminders)
  const waterPercentage = Math.min(
    100,
    Math.round((todayWater / reminders.dailyGoalMl) * 100),
  )
  const [lineConnected, setLineConnected] = useState(initial.lineConnected)
  const [members] = useState(initial.members)
  const [isPro, setIsPro] = useState(initial.isPro)
  const [advice] = useState(initial.advice)
  const [inviteLink, setInviteLink] = useState<string | null>(null)
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
  const [messages, setMessages] = useState(initial.messages)
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

  /** Runs a backend call; on failure the screen stays open and says so. */
  const save = async <T,>(work: () => Promise<T>, done: (result: T) => void) => {
    try {
      done(await work())
    } catch {
      setToast(t.common.actionFailed)
    }
  }

  // Confirmation messages disappear on their own after a few seconds.
  useEffect(() => {
    if (toast === null) return
    const timer = setTimeout(() => setToast(null), 4000)
    return () => clearTimeout(timer)
  }, [toast])

  // While the app is open, ask now and then whether family sent something new.
  const unplayedRef = useRef(newMessageCount)
  unplayedRef.current = newMessageCount
  useEffect(() => {
    if (!lineConnected) return
    const timer = window.setInterval(() => {
      api.getMessages().then((latest) => {
        const unplayed = latest.filter((message) => !message.played).length
        if (unplayed > unplayedRef.current) {
          setToast(t.family.newMessageToast(unplayed - unplayedRef.current))
        }
        setMessages(latest)
      }, () => {
        // A missed check is retried on the next round; nothing to tell the owner.
      })
    }, messageCheckMs)
    return () => window.clearInterval(timer)
  }, [lineConnected, t])

  const moveToPage = (page: number) => {
    setCurrentPage(Math.max(0, Math.min(pageCount - 1, page)))
  }

  const shell = useRef<HTMLDivElement>(null)
  const swipe = useTabSwipe(shell, currentPage, pageCount, moveToPage)
  const hasSensitiveCondition = profile.conditions.some((condition) =>
    fluidSensitiveConditions.includes(condition),
  )
  const sampleText: Record<string, string> = t.family.messageText

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
              members={members}
              messages={messages}
              playingId={voice.playingId}
              onPlay={(message) => {
                voice.play(
                  message.id,
                  sampleText[message.id] ?? "",
                  t.common.speechLang,
                  message.durationSec,
                  message.audioUrl,
                )
                setMessages((current) =>
                  current.map((item) =>
                    item.id === message.id ? { ...item, played: true } : item,
                  ),
                )
                // If this fails the message shows as new again after the next check; harmless.
                api.markPlayed(message.id).catch(() => {})
              }}
              onStop={voice.stop}
              onConnect={() =>
                save(api.linkLine, (result) => {
                  // Linking happens on LINE's own page; the backend says where to send the owner.
                  if (result.url) {
                    window.location.href = result.url
                    return
                  }
                  setLineConnected(result.connected)
                  setToast(t.family.connectedToast)
                })
              }
              isPro={isPro}
              onAddMember={() => {
                if (!isPro) {
                  setOverlay("pro")
                  return
                }
                setInviteLink(null)
                setOverlay("invite")
                save(api.createInvite, setInviteLink)
              }}
            />
            <MyScreen
              ownerName={profile.name}
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
            onAdd={(amountMl) =>
              save(
                () => api.addRecord(amountMl),
                (record) => {
                  // shortcut: new records go on top without re-sorting by time.
                  setRecords((current) => [record, ...current])
                  setToast(t.home.addedToast(amountMl))
                  closeOverlay()
                },
              )
            }
            onClose={closeOverlay}
          />
        )}

        {overlay === "editRecord" && editingRecord && (
          <EditRecordScreen
            record={editingRecord}
            onSave={(amountMl) =>
              save(
                () => api.updateRecord(editingRecord.id, amountMl),
                (updated) => {
                  setRecords((current) =>
                    current.map((record) =>
                      record.id === updated.id ? updated : record,
                    ),
                  )
                  setToast(t.editRecord.updatedToast)
                  closeOverlay()
                },
              )
            }
            onDelete={() =>
              save(
                () => api.deleteRecord(editingRecord.id),
                () => {
                  setRecords((current) =>
                    current.filter((record) => record.id !== editingRecord.id),
                  )
                  setToast(t.editRecord.deletedToast)
                  closeOverlay()
                },
              )
            }
            onClose={closeOverlay}
          />
        )}

        {overlay === "profile" && (
          <ProfileScreen
            profile={profile}
            onChange={setProfile}
            onSave={() =>
              save(
                () => api.saveProfile(profile),
                (saved) => {
                  setProfile(saved)
                  closeOverlay()
                },
              )
            }
            onClose={closeOverlay}
          />
        )}

        {overlay === "reminders" && (
          <ReminderSettingsScreen
            settings={reminders}
            showHealthNote={hasSensitiveCondition}
            onSave={(settings) =>
              save(
                () => api.saveReminders(settings),
                (saved) => {
                  setReminders(saved)
                  setToast(t.reminders.savedToast)
                  closeOverlay()
                },
              )
            }
            onClose={closeOverlay}
          />
        )}

        {overlay === "nightMute" && (
          <NightMuteScreen
            night={night}
            onSave={(changed) =>
              save(
                () => api.saveNightMute(changed),
                (saved) => {
                  setNight(saved)
                  setToast(t.night.savedToast)
                  closeOverlay()
                },
              )
            }
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
            onPaired={() =>
              save(api.pairDevice, (paired) => {
                setDevice(paired)
                setOverlay(pairingBack)
              })
            }
            onClose={() => setOverlay(pairingBack)}
          />
        )}

        {overlay === "habits" && (
          <HabitsScreen
            records={records}
            goalMl={reminders.dailyGoalMl}
            advice={advice}
            hasSensitiveCondition={hasSensitiveCondition}
            onAddReminder={() => setOverlay("reminders")}
            onClose={closeOverlay}
          />
        )}

        {overlay === "about" && <AboutScreen onClose={closeOverlay} />}

        {/* The demo panel changes what this screen shows, not what the backend stores. */}
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
            // Reloading fetches everything again, so every screen goes back to the start.
            onReset={() => window.location.reload()}
            onClose={closeOverlay}
          />
        )}

        {overlay === "pro" && (
          <ProScreen
            isPro={isPro}
            onSubscribe={(plan) =>
              save(
                () => api.subscribe(plan),
                (result) => {
                  setIsPro(result.isPro)
                  if (result.isPro) setToast(t.pro.upgradedToast)
                },
              )
            }
            onClose={closeOverlay}
          />
        )}

        {overlay === "invite" && (
          <InviteScreen
            link={inviteLink}
            onShared={setToast}
            onClose={closeOverlay}
          />
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
