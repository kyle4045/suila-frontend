import { useState } from "react"

function CalendarIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <rect
        x="3.5"
        y="5"
        width="17"
        height="15"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M8 3v4M16 3v4M3.5 9.5h17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function NavigationIcon({
  type,
}: {
  type: "water" | "social" | "profile"
}) {
  if (type === "water") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3S6.5 9.3 6.5 14a5.5 5.5 0 0 0 11 0C17.5 9.3 12 3 12 3Z"
          fill="currentColor"
        />
      </svg>
    )
  }

  if (type === "social") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
        <path
          d="M8.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM15.8 10a3 3 0 1 0 0-6M2.5 20v-2.2c0-2.7 2.5-4.8 6-4.8s6 2.1 6 4.8V20M15 13.5c3.8 0 6.5 1.9 6.5 4.5v2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
      <path
        d="M4.5 21c.4-4.5 3.1-7 7.5-7s7.1 2.5 7.5 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

const navigationItems = [
  { label: "喝水", icon: "water" as const },
  { label: "社交", icon: "social" as const },
  { label: "我的", icon: "profile" as const },
]
const pageNames = navigationItems.map((item) => item.label)
const conditionOptions = ["高血壓", "糖尿病", "心臟病", "腎臟病", "無", "其他"]

const reminderRecords = [
  {
    month: 5,
    day: 22,
    times: ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"],
  },
  {
    month: 5,
    day: 21,
    times: ["07:30", "09:30", "11:30", "13:30", "15:30", "17:30", "19:30"],
  },
  {
    month: 5,
    day: 20,
    times: ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"],
  },
  { month: 5, day: 19, times: ["08:30", "11:00", "13:30", "16:00", "18:30"] },
  {
    month: 5,
    day: 18,
    times: ["07:30", "09:30", "11:30", "13:30", "15:30", "17:30", "19:30"],
  },
  {
    month: 5,
    day: 17,
    times: ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"],
  },
  { month: 5, day: 16, times: ["09:00", "12:00", "15:00", "18:00"] },
  {
    month: 5,
    day: 15,
    times: ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"],
  },
  { month: 5, day: 14, times: ["08:30", "11:00", "13:30", "16:00", "18:30"] },
  {
    month: 5,
    day: 13,
    times: ["07:30", "09:30", "11:30", "13:30", "15:30", "17:30", "19:30"],
  },
]
const calendarWeekdays = ["日", "一", "二", "三", "四", "五", "六"]
const calendarMonths = Array.from({ length: 12 }, (_, index) => index + 1)
const connectedPeople = [
  { name: "女兒 雅婷", initials: "雅", color: "coral" },
  { name: "兒子 志明", initials: "志", color: "blue" },
  { name: "照護員 林小姐", initials: "林", color: "green" },
]

const drinkRecords = [
  { time: "下午 2:10", amount: "220 毫升" },
  { time: "上午 11:35", amount: "180 毫升" },
  { time: "上午 9:20", amount: "250 毫升" },
  { time: "上午 7:45", amount: "200 毫升" },
  { time: "昨天 下午 8:30", amount: "180 毫升" },
  { time: "昨天 下午 6:10", amount: "220 毫升" },
  { time: "昨天 下午 3:40", amount: "200 毫升" },
  { time: "昨天 中午 12:15", amount: "250 毫升" },
  { time: "昨天 上午 9:50", amount: "180 毫升" },
  { time: "昨天 上午 7:30", amount: "200 毫升" },
]

const hourOptions = Array.from({ length: 24 }, (_, hour) =>
  String(hour).padStart(2, "0"),
)
const minuteOptions = Array.from({ length: 60 }, (_, minute) =>
  String(minute).padStart(2, "0"),
)

export default function App() {
  const [currentPage, setCurrentPage] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [name, setName] = useState("美玲")
  const [height, setHeight] = useState("162")
  const [weight, setWeight] = useState("58")
  const [conditions, setConditions] = useState(["高血壓"])
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [extraWaterOpen, setExtraWaterOpen] = useState(false)
  const [extraWaterAmount, setExtraWaterAmount] = useState("")
  const [todayWater, setTodayWater] = useState(1260)
  const [selectedCalendarMonth, setSelectedCalendarMonth] = useState(5)
  const [selectedCalendarDay, setSelectedCalendarDay] = useState(22)
  const [conditionMenuOpen, setConditionMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [nightSettingsOpen, setNightSettingsOpen] = useState(false)
  const [nightMute, setNightMute] = useState(true)
  const [nightStartHour, setNightStartHour] = useState("22")
  const [nightStartMinute, setNightStartMinute] = useState("00")
  const [nightEndHour, setNightEndHour] = useState("07")
  const [nightEndMinute, setNightEndMinute] = useState("00")
  const selectedCalendarRecord = reminderRecords.find(
    (record) =>
      record.month === selectedCalendarMonth &&
      record.day === selectedCalendarDay,
  )
  const calendarDays = Array.from(
    { length: new Date(2025, selectedCalendarMonth, 0).getDate() },
    (_, index) => index + 1,
  )
  const calendarLeadingBlanks = Array.from(
    { length: new Date(2025, selectedCalendarMonth - 1, 1).getDay() },
    (_, index) => index,
  )
  const waterPercentage = Math.min(100, Math.round((todayWater / 2000) * 100))
  const parsedExtraWater = Number(extraWaterAmount)
  const extraWaterLevel =
    Number.isFinite(parsedExtraWater) && parsedExtraWater > 0
      ? Math.min(100, (parsedExtraWater / 500) * 100)
      : 0
  const canAddExtraWater = parsedExtraWater > 0

  const toggleCondition = (condition: string) => {
    if (condition === "無") {
      setConditions(conditions.includes("無") ? [] : ["無"])
      return
    }

    setConditions((current) => {
      const withoutNone = current.filter((item) => item !== "無")
      return withoutNone.includes(condition)
        ? withoutNone.filter((item) => item !== condition)
        : [...withoutNone, condition]
    })
  }

  const moveToPage = (page: number) => {
    setCurrentPage(Math.max(0, Math.min(pageNames.length - 1, page)))
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
          <div className="brand" aria-label="水啦 SuiLa 首頁">
            <span className="brand-name">
              水啦
              <small>SuiLa</small>
            </span>
          </div>
        </header>

        <div
          className={`swipe-window ${
            currentPage === 0 ? "water-content-shift" : ""
          }`}
          onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="swipe-track"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            <section className="swipe-page water-page" aria-label="飲水紀錄">
              <div className="today-summary-row">
                <strong>一切正常</strong>
                <button
                  className="calendar-button"
                  type="button"
                  aria-label="開啟日曆"
                  onClick={() => setCalendarOpen(true)}
                >
                  <CalendarIcon />
                </button>
              </div>
              <div className="info-card water-total-card">
                <p className="card-label">今天喝水量</p>
                <button
                  className="water-ring"
                  type="button"
                  aria-label={`今天喝水目標已完成百分之${waterPercentage}，點擊額外補水`}
                  onClick={() => setExtraWaterOpen(true)}
                  style={{
                    background: `conic-gradient(#69beff 0 ${waterPercentage}%, #fff ${waterPercentage}% 100%)`,
                  }}
                >
                  <div>
                    <strong>{waterPercentage}%</strong>
                  </div>
                </button>
              </div>
              <div className="info-card records-card drink-records-card">
                <p className="card-label recent-records-label">最近紀錄</p>
                <div className="drink-record-list">
                  {drinkRecords.map((record, index) => (
                    <div className="record-row" key={`${record.time}-${index}`}>
                      <span>{record.time}</span>
                      <strong>{record.amount}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="swipe-page social-page" aria-label="社交">
              <button className="line-join-button" type="button">
                <strong>加入 LINE</strong>
              </button>

              <div className="info-card line-connections-card">
                <div className="line-connected-heading">
                  <span aria-hidden="true">✓</span>
                  <div>
                    <strong>你的 LINE 已連接</strong>
                  </div>
                </div>
                <div className="connected-people-list">
                  {connectedPeople.map((person) => (
                    <div className="connected-person" key={person.name}>
                      <span
                        className={`person-avatar ${person.color}`}
                        aria-hidden="true"
                      >
                        {person.initials}
                      </span>
                      <strong>{person.name}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="swipe-page my-page" aria-label="我的">
              <button
                className="my-menu-row"
                type="button"
                onClick={() => setProfileOpen(true)}
              >
                <strong>基本資料</strong>
                <span aria-hidden="true">＞</span>
              </button>

              <button
                className="my-menu-row"
                type="button"
                onClick={() => setNightSettingsOpen(true)}
              >
                <strong>夜間靜音</strong>
                <span aria-hidden="true">＞</span>
              </button>

              <button className="my-menu-row" type="button">
                <strong>關於我們</strong>
                <span aria-hidden="true">＞</span>
              </button>

              <button className="pro-upgrade-button" type="button">
                <span>升級 Pro</span>
                <strong>解鎖藍牙裝置連結</strong>
              </button>
            </section>
          </div>
        </div>

        {calendarOpen && (
          <section className="calendar-screen" aria-label="喝水提醒日曆">
            <header className="calendar-header">
              <div className="calendar-month-picker">
                <span>2025 年</span>
                <label>
                  <select
                    value={selectedCalendarMonth}
                    onChange={(event) => {
                      setSelectedCalendarMonth(Number(event.target.value))
                      setSelectedCalendarDay(1)
                    }}
                    aria-label="選擇月份"
                  >
                    {calendarMonths.map((month) => (
                      <option value={month} key={month}>
                        {month} 月
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <button
                type="button"
                aria-label="關閉日曆"
                onClick={() => setCalendarOpen(false)}
              >
                X
              </button>
            </header>

            <div className="calendar-content">
              <div className="calendar-card">
                <div className="calendar-weekdays" aria-hidden="true">
                  {calendarWeekdays.map((weekday) => (
                    <span key={weekday}>{weekday}</span>
                  ))}
                </div>
                <div className="calendar-grid">
                  {calendarLeadingBlanks.map((blank) => (
                    <span key={`blank-${blank}`} aria-hidden="true" />
                  ))}
                  {calendarDays.map((day) => {
                    const hasReminders = reminderRecords.some(
                      (record) =>
                        record.month === selectedCalendarMonth &&
                        record.day === day,
                    )
                    return (
                      <button
                        className={[
                          selectedCalendarDay === day ? "is-selected" : "",
                          hasReminders ? "has-reminders" : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        type="button"
                        key={day}
                        aria-label={`${selectedCalendarMonth} 月 ${day} 日${
                          hasReminders ? "，有提醒紀錄" : ""
                        }`}
                        aria-pressed={selectedCalendarDay === day}
                        onClick={() => setSelectedCalendarDay(day)}
                      >
                        {day}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="calendar-day-details" aria-live="polite">
                <div className="calendar-day-heading">
                  <div>
                    <strong>
                      提醒 {selectedCalendarRecord?.times.length ?? 0} 次
                    </strong>
                  </div>
                </div>
                {selectedCalendarRecord ? (
                  <div className="calendar-reminder-times">
                    {selectedCalendarRecord.times.map((time, index) => (
                      <div key={time}>
                        <span>{index + 1}.</span>
                        <strong>{time}</strong>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="calendar-empty">這天沒有提醒紀錄</p>
                )}
              </div>
            </div>
          </section>
        )}

        {extraWaterOpen && (
          <section className="extra-water-screen" aria-label="額外補水">
            <header className="extra-water-header">
              <h1>補水</h1>
              <button
                type="button"
                aria-label="關閉額外補水"
                onClick={() => {
                  setExtraWaterOpen(false)
                  setExtraWaterAmount("")
                }}
              >
                X
              </button>
            </header>

            <div className="extra-water-content">
              <div className="water-cup-area">
                <div
                  className="water-cup"
                  role="img"
                  aria-label={`水杯水位百分之${Math.round(extraWaterLevel)}`}
                >
                  <div
                    className="water-cup-fill"
                    style={{ height: `${extraWaterLevel}%` }}
                  >
                    <span />
                  </div>
                </div>
                <p>
                  {canAddExtraWater
                    ? `準備加入 ${parsedExtraWater} ml`
                    : "請輸入這次喝水量"}
                </p>
              </div>

              <div className="extra-water-form">
                <label>
                  <div className="extra-water-input">
                    <input
                      type="number"
                      inputMode="numeric"
                      min="1"
                      max="2000"
                      placeholder="＿＿"
                      value={extraWaterAmount}
                      onChange={(event) => setExtraWaterAmount(event.target.value)}
                      aria-label="額外補水量"
                      autoFocus
                    />
                    <strong>ml</strong>
                  </div>
                </label>
                <button
                  className="add-water-button"
                  type="button"
                  disabled={!canAddExtraWater}
                  onClick={() => {
                    if (!canAddExtraWater) return
                    setTodayWater((amount) => amount + parsedExtraWater)
                    setExtraWaterAmount("")
                    setExtraWaterOpen(false)
                  }}
                >
                  加入
                </button>
              </div>
            </div>
          </section>
        )}

        {profileOpen && (
          <section className="settings-screen" aria-label="基本資料">
            <header className="settings-header">
              <button
                type="button"
                aria-label="關閉基本資料"
                onClick={() => {
                  setProfileOpen(false)
                  setConditionMenuOpen(false)
                }}
              >
                X
              </button>
            </header>

            <div className="settings-content">
              <div className="info-card settings-profile-card">
                <div className="profile-form">
                  <label>
                    <span>姓名</span>
                    <input
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="請輸入姓名"
                    />
                  </label>
                  <div className="profile-form-row">
                    <label>
                      <span>身高（公分）</span>
                      <input
                        type="number"
                        inputMode="numeric"
                        value={height}
                        onChange={(event) => setHeight(event.target.value)}
                      />
                    </label>
                    <label>
                      <span>體重（公斤）</span>
                      <input
                        type="number"
                        inputMode="decimal"
                        value={weight}
                        onChange={(event) => setWeight(event.target.value)}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="info-card condition-select-card">
                <label>
                  <span>慢性病或健康狀況</span>
                  <button
                    className="condition-select-button"
                    type="button"
                    aria-expanded={conditionMenuOpen}
                    onClick={() => setConditionMenuOpen((open) => !open)}
                  >
                    <span>
                      {conditions.length > 0 ? conditions.join("、") : "請選擇"}
                    </span>
                    <b aria-hidden="true">{conditionMenuOpen ? "▲" : "▼"}</b>
                  </button>
                </label>

                {conditionMenuOpen && (
                  <div className="condition-options">
                    {conditionOptions.map((condition) => (
                      <label key={condition}>
                        <input
                          type="checkbox"
                          checked={conditions.includes(condition)}
                          onChange={() => toggleCondition(condition)}
                        />
                        <span>{condition}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              className="save-settings-button"
              type="button"
              onClick={() => {
                setProfileOpen(false)
                setConditionMenuOpen(false)
              }}
            >
              儲存
            </button>
          </section>
        )}

        {nightSettingsOpen && (
          <section className="settings-screen" aria-label="夜間靜音時間設定">
            <header className="settings-header">
              <button
                type="button"
                aria-label="關閉夜間靜音設定"
                onClick={() => setNightSettingsOpen(false)}
              >
                X
              </button>
            </header>

            <div className="settings-content">
              <div className="info-card setting-card">
                <strong>開啟夜間靜音</strong>
                <button
                  className={`compact-switch ${nightMute ? "is-on" : ""}`}
                  type="button"
                  role="switch"
                  aria-checked={nightMute}
                  aria-label="夜間靜音"
                  onClick={() => setNightMute((value) => !value)}
                >
                  <span />
                </button>
              </div>

              <div className="info-card expanded-setting time-setting">
                <label>
                  <span>開始時間（24 小時制）</span>
                  <div className="time-select-row">
                    <select
                      value={nightStartHour}
                      onChange={(event) => setNightStartHour(event.target.value)}
                      aria-label="開始小時"
                    >
                      {hourOptions.map((hour) => (
                        <option value={hour} key={hour}>
                          {hour}
                        </option>
                      ))}
                    </select>
                    <b aria-hidden="true">：</b>
                    <select
                      value={nightStartMinute}
                      onChange={(event) =>
                        setNightStartMinute(event.target.value)
                      }
                      aria-label="開始分鐘"
                    >
                      {minuteOptions.map((minute) => (
                        <option value={minute} key={minute}>
                          {minute}
                        </option>
                      ))}
                    </select>
                  </div>
                </label>
                <label>
                  <span>結束時間（24 小時制）</span>
                  <div className="time-select-row">
                    <select
                      value={nightEndHour}
                      onChange={(event) => setNightEndHour(event.target.value)}
                      aria-label="結束小時"
                    >
                      {hourOptions.map((hour) => (
                        <option value={hour} key={hour}>
                          {hour}
                        </option>
                      ))}
                    </select>
                    <b aria-hidden="true">：</b>
                    <select
                      value={nightEndMinute}
                      onChange={(event) => setNightEndMinute(event.target.value)}
                      aria-label="結束分鐘"
                    >
                      {minuteOptions.map((minute) => (
                        <option value={minute} key={minute}>
                          {minute}
                        </option>
                      ))}
                    </select>
                  </div>
                </label>
              </div>
            </div>

            <button
              className="save-settings-button"
              type="button"
              onClick={() => setNightSettingsOpen(false)}
            >
              儲存
            </button>
          </section>
        )}

        <nav className="bottom-navigation" aria-label="主要分頁">
          {navigationItems.map((item, index) => (
            <button
              className={currentPage === index ? "is-active" : ""}
              type="button"
              key={item.label}
              onClick={() => moveToPage(index)}
              aria-current={currentPage === index ? "page" : undefined}
            >
              <NavigationIcon type={item.icon} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </main>
  )
}
