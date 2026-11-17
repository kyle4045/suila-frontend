// The one place the app talks to the backend. Screens never fetch by themselves.
//
// With VITE_API_URL set (see .env.example), every call goes to the teammate's
// backend over HTTP; BACKEND.md lists each call. Without it, the same calls
// are answered from the sample data in src/data/mock.ts, so the demo works
// with no backend at all.

import {
  deviceStatus,
  drinkRecords,
  familyInviteLink,
  familyMembers,
  initialIsPro,
  initialLineConnected,
  initialNightMute,
  initialProfile,
  initialReminderSettings,
  voiceMessages,
  type DeviceStatus,
  type DrinkRecord,
  type FamilyMember,
  type NightMute,
  type PremiumPlan,
  type Profile,
  type ReminderSettings,
  type VoiceMessage,
} from "../data/mock"
import { zhTW } from "../i18n/zh-TW"

/** Everything the app needs when it starts. */
export type AppData = {
  records: DrinkRecord[]
  device: DeviceStatus
  reminders: ReminderSettings
  nightMute: NightMute
  profile: Profile
  lineConnected: boolean
  members: FamilyMember[]
  messages: VoiceMessage[]
  isPro: boolean
  /** Analysis text written by the backend (and its AI); null when it has none. */
  advice: string | null
}

export type SuilaApi = {
  loadAll(): Promise<AppData>
  addRecord(amountMl: number): Promise<DrinkRecord>
  updateRecord(id: string, amountMl: number): Promise<DrinkRecord>
  deleteRecord(id: string): Promise<void>
  saveReminders(settings: ReminderSettings): Promise<ReminderSettings>
  saveNightMute(nightMute: NightMute): Promise<NightMute>
  saveProfile(profile: Profile): Promise<Profile>
  pairDevice(): Promise<DeviceStatus>
  /** Starts linking LINE. A url means: send the owner there (LINE's own login page). */
  linkLine(): Promise<{ url: string | null; connected: boolean }>
  createInvite(): Promise<string>
  getMessages(): Promise<VoiceMessage[]>
  markPlayed(id: string): Promise<void>
  subscribe(plan: PremiumPlan): Promise<{ isPro: boolean }>
}

// ---------------------------------------------------------------- real backend

const baseUrl: string = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "")

/** One HTTP call. Any non-2xx answer becomes an error the screen can report. */
async function call<T>(method: string, path: string, body?: unknown): Promise<T> {
  const response = await fetch(baseUrl + path, {
    method,
    // shortcut: login is assumed to be a cookie the backend sets (for example after
    // LINE login). Change here if the backend uses a token header instead.
    credentials: "include",
    headers: body === undefined ? undefined : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  })
  if (!response.ok) throw new Error(`${method} ${path} failed: ${response.status}`)
  if (response.status === 204) return undefined as T
  return (await response.json()) as T
}

const httpApi: SuilaApi = {
  async loadAll() {
    const [records, device, reminders, nightMute, profile, family, messages, subscription, analysis] =
      await Promise.all([
        call<DrinkRecord[]>("GET", "/records"),
        call<DeviceStatus>("GET", "/device"),
        call<ReminderSettings>("GET", "/settings/reminders"),
        call<NightMute>("GET", "/settings/night-mute"),
        call<Profile>("GET", "/profile"),
        call<{ lineConnected: boolean; members: FamilyMember[] }>("GET", "/family"),
        call<VoiceMessage[]>("GET", "/messages"),
        call<{ isPro: boolean }>("GET", "/subscription"),
        call<{ advice: string | null }>("GET", "/analysis"),
      ])
    return {
      records,
      device,
      reminders,
      nightMute,
      profile,
      lineConnected: family.lineConnected,
      members: family.members,
      messages,
      isPro: subscription.isPro,
      advice: analysis.advice,
    }
  },
  addRecord: (amountMl) => call("POST", "/records", { amountMl }),
  updateRecord: (id, amountMl) => call("PATCH", `/records/${encodeURIComponent(id)}`, { amountMl }),
  deleteRecord: (id) => call("DELETE", `/records/${encodeURIComponent(id)}`),
  saveReminders: (settings) => call("PUT", "/settings/reminders", settings),
  saveNightMute: (nightMute) => call("PUT", "/settings/night-mute", nightMute),
  saveProfile: (profile) => call("PUT", "/profile", profile),
  pairDevice: () => call("POST", "/device/pair"),
  linkLine: () => call("POST", "/family/line-link"),
  createInvite: async () => (await call<{ url: string }>("POST", "/family/invite")).url,
  getMessages: () => call("GET", "/messages"),
  markPlayed: (id) => call("POST", `/messages/${encodeURIComponent(id)}/played`),
  subscribe: (plan) => call("POST", "/subscription", { plan }),
}

// ------------------------------------------------------------- sample answers

const pause = () => new Promise((resolve) => setTimeout(resolve, 150))

// The sample backend keeps its own copy, so saving behaves like a real server.
const sample = {
  records: drinkRecords,
  messages: voiceMessages,
}

const mockApi: SuilaApi = {
  async loadAll() {
    await pause()
    return {
      records: sample.records,
      device: deviceStatus,
      reminders: initialReminderSettings,
      nightMute: initialNightMute,
      profile: initialProfile(zhTW.profile.defaultName),
      lineConnected: initialLineConnected,
      members: familyMembers,
      messages: sample.messages,
      isPro: initialIsPro,
      advice: null,
    }
  },
  async addRecord(amountMl) {
    await pause()
    const record = { id: `r${Date.now()}`, time: new Date().toISOString(), amountMl }
    sample.records = [record, ...sample.records]
    return record
  },
  async updateRecord(id, amountMl) {
    await pause()
    sample.records = sample.records.map((record) =>
      record.id === id ? { ...record, amountMl } : record,
    )
    const updated = sample.records.find((record) => record.id === id)
    if (!updated) throw new Error(`No record ${id}`)
    return updated
  },
  async deleteRecord(id) {
    await pause()
    sample.records = sample.records.filter((record) => record.id !== id)
  },
  saveReminders: async (settings) => (await pause(), settings),
  saveNightMute: async (nightMute) => (await pause(), nightMute),
  saveProfile: async (profile) => (await pause(), profile),
  pairDevice: async () => (await pause(), { ...deviceStatus, paired: true, connected: true }),
  linkLine: async () => (await pause(), { url: null, connected: true }),
  createInvite: async () => (await pause(), familyInviteLink),
  getMessages: async () => (await pause(), sample.messages),
  async markPlayed(id) {
    await pause()
    sample.messages = sample.messages.map((message) =>
      message.id === id ? { ...message, played: true } : message,
    )
  },
  subscribe: async () => (await pause(), { isPro: true }),
}

/** True when the app runs on sample data (no backend address set). */
export const usingSampleData = baseUrl === ""

export const api: SuilaApi = usingSampleData ? mockApi : httpApi
