// All mock data in one place, shaped the way a real backend would send it.
// Names and other visible words live in the translation files, keyed by id.

/** A timestamp `daysAgo` days back at the given 24-hour time, as ISO text. */
const at = (daysAgo: number, time: string) => {
  const [hours, minutes] = time.split(":").map(Number)
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  date.setHours(hours, minutes, 0, 0)
  return date.toISOString()
}

export type DrinkRecord = { id: string; time: string; amountMl: number }

export const drinkRecords: DrinkRecord[] = [
  { id: "r01", time: at(0, "14:10"), amountMl: 220 },
  { id: "r02", time: at(0, "11:35"), amountMl: 180 },
  { id: "r03", time: at(0, "09:20"), amountMl: 250 },
  { id: "r04", time: at(0, "07:45"), amountMl: 200 },
  { id: "r05", time: at(1, "20:30"), amountMl: 180 },
  { id: "r06", time: at(1, "18:10"), amountMl: 220 },
  { id: "r07", time: at(1, "15:40"), amountMl: 200 },
  { id: "r08", time: at(1, "12:15"), amountMl: 250 },
  { id: "r09", time: at(1, "09:50"), amountMl: 180 },
  { id: "r10", time: at(1, "07:30"), amountMl: 200 },
]

export const dailyGoalMl = 2000

// shortcut: a fixed number that does not match the records above (they add
// up to 850). To be derived from the records when records become editable.
export const todayTotalMl = 1260

export type ReminderDay = { date: string; times: string[] }

// shortcut: fixed to 2025 like the original; the calendar moves to the real
// date when it is reworked.
export const calendarYear = 2025

export const reminderDays: ReminderDay[] = [
  {
    date: "2025-05-22",
    times: ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"],
  },
  {
    date: "2025-05-21",
    times: ["07:30", "09:30", "11:30", "13:30", "15:30", "17:30", "19:30"],
  },
  {
    date: "2025-05-20",
    times: ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"],
  },
  { date: "2025-05-19", times: ["08:30", "11:00", "13:30", "16:00", "18:30"] },
  {
    date: "2025-05-18",
    times: ["07:30", "09:30", "11:30", "13:30", "15:30", "17:30", "19:30"],
  },
  {
    date: "2025-05-17",
    times: ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"],
  },
  { date: "2025-05-16", times: ["09:00", "12:00", "15:00", "18:00"] },
  {
    date: "2025-05-15",
    times: ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"],
  },
  { date: "2025-05-14", times: ["08:30", "11:00", "13:30", "16:00", "18:30"] },
  {
    date: "2025-05-13",
    times: ["07:30", "09:30", "11:30", "13:30", "15:30", "17:30", "19:30"],
  },
]

export const initialCalendarSelection = { month: 5, day: 22 }

export type FamilyMemberId = "daughter" | "son"
export type FamilyMember = { id: FamilyMemberId; color: string }

/** Whether the owner has linked LINE when the demo starts. */
export const initialLineConnected = true

/** Family members allowed without Pro. */
export const freeFamilyLimit = 2

export const familyMembers: FamilyMember[] = [
  { id: "daughter", color: "coral" },
  { id: "son", color: "blue" },
]

export type ConditionId = "hypertension" | "diabetes" | "heart" | "kidney" | "none" | "other"

export const conditionOptions: ConditionId[] = [
  "hypertension",
  "diabetes",
  "heart",
  "kidney",
  "none",
  "other",
]

export type Profile = {
  name: string
  heightCm: string
  weightKg: string
  conditions: ConditionId[]
}

/** The owner's name comes from the translation file, so it is passed in. */
export const initialProfile = (name: string): Profile => ({
  name,
  heightCm: "162",
  weightKg: "58",
  conditions: ["hypertension"],
})

export type NightMute = {
  enabled: boolean
  startHour: string
  startMinute: string
  endHour: string
  endMinute: string
}

export const initialNightMute: NightMute = {
  enabled: true,
  startHour: "22",
  startMinute: "00",
  endHour: "07",
  endMinute: "00",
}
