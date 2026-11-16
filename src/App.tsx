import { useEffect, useState } from "react"
import { BottomNav, familyPage, pageCount } from "./components/BottomNav"
import { Toast } from "./components/Toast"
import {
  dailyGoalMl,
  drinkRecords,
  familyMembers,
  initialCalendarSelection,
  initialLineConnected,
  initialNightMute,
  initialProfile,
  reminderDays,
  todayTotalMl,
  voiceMessages,
} from "./data/mock"
import { useT } from "./i18n"
import { useVoicePlayer } from "./lib/useVoicePlayer"
import { AddWaterScreen } from "./screens/AddWaterScreen"
import { CalendarScreen } from "./screens/CalendarScreen"
import { FamilyScreen } from "./screens/FamilyScreen"
import { HomeScreen } from "./screens/HomeScreen"
import { MyScreen } from "./screens/MyScreen"
import { NightMuteScreen } from "./screens/NightMuteScreen"
import { ProScreen } from "./screens/ProScreen"
import { ProfileScreen } from "./screens/ProfileScreen"

type Overlay = "calendar" | "addWater" | "profile" | "nightMute" | "pro" | null

export default function App() {
  const t = useT()
  const [currentPage, setCurrentPage] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [overlay, setOverlay] = useState<Overlay>(null)
  const [todayWater, setTodayWater] = useState(todayTotalMl)
  const [profile, setProfile] = useState(() =>
    initialProfile(t.profile.defaultName),
  )
  const [night, setNight] = useState(initialNightMute)
  const [calendarSelection, setCalendarSelection] = useState(
    initialCalendarSelection,
  )
  const waterPercentage = Math.min(
    100,
    Math.round((todayWater / dailyGoalMl) * 100),
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

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStart === null) return
    const distance = touchStart - event.changedTouches[0].clientX
    if (Math.abs(distance) > 50) {
      moveToPage(currentPage + (distance > 0 ? 1 : -1))
    }
    setTouchStart(null)
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

        <div
          className="swipe-window"
          onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="swipe-track"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            <HomeScreen
              waterPercentage={waterPercentage}
              records={drinkRecords}
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
              onOpenNightMute={() => setOverlay("nightMute")}
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
              setTodayWater((amount) => amount + amountMl)
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

        {overlay === "nightMute" && (
          <NightMuteScreen
            night={night}
            onChange={setNight}
            onClose={closeOverlay}
          />
        )}

        {overlay === "pro" && <ProScreen onClose={closeOverlay} />}

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
