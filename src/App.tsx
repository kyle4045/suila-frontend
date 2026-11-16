import { useState } from "react"
import { BottomNav, pageCount } from "./components/BottomNav"
import {
  dailyGoalMl,
  drinkRecords,
  familyMembers,
  initialCalendarSelection,
  initialNightMute,
  initialProfile,
  reminderDays,
  todayTotalMl,
} from "./data/mock"
import { useT } from "./i18n"
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
  const closeOverlay = () => setOverlay(null)

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
              onOpenCalendar={() => setOverlay("calendar")}
              onOpenAddWater={() => setOverlay("addWater")}
            />
            <FamilyScreen members={familyMembers} />
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

        <BottomNav currentPage={currentPage} onSelect={moveToPage} />
      </div>
    </main>
  )
}
