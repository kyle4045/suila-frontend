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

/** What the weighing base reports about itself. */
export type DeviceStatus = {
  /** False until the owner pairs a base for the first time. */
  paired: boolean
  connected: boolean
  batteryPercent: number
  /** Records stored on the base while offline, not yet sent to the phone. */
  pendingSyncCount: number
}

export const deviceStatus: DeviceStatus = {
  paired: true,
  connected: true,
  batteryPercent: 82,
  pendingSyncCount: 0,
}

/** Colors the light on the base can show. Their meanings are in the translation file. */
export const baseLightColors = ["blue", "white", "red"] as const

/** At or below this the app warns about the battery. */
export const lowBatteryPercent = 20

export type DrinkRecord = { id: string; time: string; amountMl: number }

// Newest first. Today's six records add up to 1260 毫升.
const recentRecords: DrinkRecord[] = [
  { id: "r01", time: at(0, "16:25"), amountMl: 210 },
  { id: "r02", time: at(0, "14:10"), amountMl: 220 },
  { id: "r03", time: at(0, "13:00"), amountMl: 200 },
  { id: "r04", time: at(0, "11:35"), amountMl: 180 },
  { id: "r05", time: at(0, "09:20"), amountMl: 250 },
  { id: "r06", time: at(0, "07:45"), amountMl: 200 },
  { id: "r07", time: at(1, "20:30"), amountMl: 180 },
  { id: "r08", time: at(1, "18:10"), amountMl: 220 },
  { id: "r09", time: at(1, "15:40"), amountMl: 200 },
  { id: "r10", time: at(1, "12:15"), amountMl: 250 },
  { id: "r11", time: at(1, "09:50"), amountMl: 180 },
  { id: "r12", time: at(1, "07:30"), amountMl: 200 },
]

// Days 2 to 41 ago are generated so the calendar has six weeks to show. The
// numbers are the same every time (nothing random): 6 to 10 drinks a day of
// 180 to 330 毫升, and now and then a day with nothing recorded.
const earlierRecords: DrinkRecord[] = Array.from(
  { length: 40 },
  (_, index) => index + 2,
).flatMap((daysAgo) => {
  if (daysAgo % 11 === 5) return []
  const count = 6 + ((daysAgo * 7) % 5)
  return Array.from({ length: count }, (_, n) => ({
    id: `d${daysAgo}-${n}`,
    time: at(
      daysAgo,
      `${String(21 - Math.round((n * 14) / count)).padStart(2, "0")}:${n % 2 ? "30" : "10"}`,
    ),
    amountMl: 180 + ((daysAgo * 13 + n * 37) % 6) * 30,
  }))
})

export const drinkRecords: DrinkRecord[] = [...recentRecords, ...earlierRecords]

export type Brightness = "low" | "medium" | "high"

export type ReminderSettings = {
  dailyGoalMl: number
  /** 24-hour "HH:MM" times, earliest first. */
  times: string[]
  brightness: Brightness
}

export const initialReminderSettings: ReminderSettings = {
  dailyGoalMl: 2000,
  times: ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"],
  brightness: "medium",
}

/** Range and step of the daily goal, in 毫升. */
export const goalLimits = { min: 500, max: 4000, step: 100 }

/** One-tap amounts offered when adding water by hand, in 毫升. */
export const quickAmountsMl = [100, 200, 300]

/** Smallest and largest amount one drink record may hold. */
export const drinkAmountLimits = { min: 1, max: 2000 }

export type FamilyMemberId = "daughter" | "son"
export type FamilyMember = { id: FamilyMemberId; color: string }

/** Whether the owner has linked LINE when the demo starts. */
export const initialLineConnected = true

/** Whether the owner has Pro when the demo starts. */
export const initialIsPro = false

/** Family members allowed without Pro. */
export const freeFamilyLimit = 2

export const familyMembers: FamilyMember[] = [
  { id: "daughter", color: "coral" },
  { id: "son", color: "blue" },
]

export type VoiceMessage = {
  id: "m1" | "m2" | "m3"
  from: FamilyMemberId
  time: string
  durationSec: number
  played: boolean
}

// What each message says lives in the translation file, keyed by id.
export const voiceMessages: VoiceMessage[] = [
  { id: "m1", from: "daughter", time: at(0, "12:40"), durationSec: 6, played: false },
  { id: "m2", from: "son", time: at(0, "09:05"), durationSec: 6, played: false },
  { id: "m3", from: "daughter", time: at(1, "19:20"), durationSec: 5, played: true },
]

export type ConditionId = "hypertension" | "diabetes" | "heart" | "kidney" | "none" | "other"

/** Conditions where how much to drink is a medical question. */
export const fluidSensitiveConditions: ConditionId[] = ["heart", "kidney"]

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
  /** 24-hour "HH:MM", in 30-minute steps. */
  start: string
  end: string
}

export const initialNightMute: NightMute = {
  enabled: true,
  start: "22:00",
  end: "07:00",
}
