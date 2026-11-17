# SuiLa 水啦 — what the app needs from the backend

This is for the teammate who built the backend. It lists every call the phone
app makes, what it sends and what it expects back. The app's side of all this
lives in one file, `src/api/index.ts`; nothing else in the app talks to the
server.

If your backend uses different addresses or field names, either change them on
your side, or tell Kyle and only `src/api/index.ts` needs to change.

## Connecting the two

1. Copy `.env.example` to `.env.local` in this folder.
2. Put the backend's address in it, for example
   `VITE_API_URL=http://localhost:3000`
3. Restart `npm run dev`.

With no address the app runs on its own sample data, as in the presentation
demo.

### Things the backend must allow

- **CORS:** the app runs on its own address (`http://localhost:8443` in
  development). The backend must allow that origin, allow credentials, and
  allow the `Content-Type` header and the methods `GET, POST, PUT, PATCH,
  DELETE`.
- **Login:** the app sends cookies with every call (`credentials: "include"`)
  and assumes the backend knows who the owner is from its session cookie, for
  example one set after LINE login. If you use a token header instead, the
  change is one line in `call()` in `src/api/index.ts`.
- **Errors:** any answer that is not 2xx is treated as "it didn't work". The
  owner then sees 「沒有成功，請再試一次」 and nothing is lost on screen. If the
  first loading fails, the app shows 「連線失敗，請再試一次。」 with a retry
  button.

## Data shapes

All times are ISO 8601 strings (`2026-11-17T14:10:00.000Z`). Amounts are whole
numbers in millilitres.

```ts
DrinkRecord     { id: string, time: string, amountMl: number }

DeviceStatus    { paired: boolean, connected: boolean,
                  batteryPercent: number,          // 0–100
                  pendingSyncCount: number }       // records held on the base while offline

ReminderSettings { dailyGoalMl: number,             // 500–4000, steps of 100
                   times: string[],                 // "HH:MM", 24-hour, 30-minute steps, earliest first
                   brightness: "low" | "medium" | "high" }

NightMute       { enabled: boolean, start: "HH:MM", end: "HH:MM" }

Profile         { name: string, heightCm: string, weightKg: string,
                  conditions: ("hypertension" | "diabetes" | "heart" |
                               "kidney" | "none" | "other")[] }

FamilyMember    { id: string, name: string, relation: string,   // e.g. "女兒"
                  color: "coral" | "blue" | "green" }            // avatar colour

VoiceMessage    { id: string, from: string,        // a FamilyMember id
                  time: string, durationSec: number,
                  played: boolean,
                  audioUrl: string }               // a playable audio file (mp3/m4a/ogg)
```

## Calls

### Loading (all at once when the app opens)

| Call | Returns |
|---|---|
| `GET /records` | `DrinkRecord[]`, newest first. At least the last 7 days for the analysis; the calendar shows whatever you return. |
| `GET /device` | `DeviceStatus` |
| `GET /settings/reminders` | `ReminderSettings` |
| `GET /settings/night-mute` | `NightMute` |
| `GET /profile` | `Profile` |
| `GET /family` | `{ lineConnected: boolean, members: FamilyMember[] }` |
| `GET /messages` | `VoiceMessage[]`, newest first |
| `GET /subscription` | `{ isPro: boolean }` |
| `GET /analysis` | `{ advice: string \| null }` — see "Analysis" below |

### Drink records

| Call | Sends | Returns |
|---|---|---|
| `POST /records` | `{ amountMl }` (added by hand) | the new `DrinkRecord` |
| `PATCH /records/:id` | `{ amountMl }` | the updated `DrinkRecord` |
| `DELETE /records/:id` | — | `204` |

Records logged by the base itself (from the weight change) are the backend's
job; the app just shows them on the next load.

### Settings and profile

| Call | Sends | Returns |
|---|---|---|
| `PUT /settings/reminders` | `ReminderSettings` | the saved `ReminderSettings` |
| `PUT /settings/night-mute` | `NightMute` | the saved `NightMute` |
| `PUT /profile` | `Profile` | the saved `Profile` |

The base should pick up the reminder times, brightness and night mute from
the backend.

### Base

| Call | Sends | Returns |
|---|---|---|
| `POST /device/pair` | — | the new `DeviceStatus` |

Open question for the group: a website cannot reliably talk Bluetooth on most
phones (iPhones block it). The app's pairing page currently only asks the
backend "pair the base for this owner". How the base and the backend actually
find each other (a code on the base, Wi-Fi setup, …) still needs deciding with
the hardware teammate.

### Family and LINE

| Call | Sends | Returns |
|---|---|---|
| `POST /family/line-link` | — | `{ url: string \| null, connected: boolean }` |
| `POST /family/invite` | — | `{ url: string }` (Premium only) |
| `GET /messages` | — | `VoiceMessage[]` |
| `POST /messages/:id/played` | — | `204` |

- **Linking LINE:** when the owner taps 「加入 LINE」, the app calls
  `line-link`. If you return a `url` (LINE's login or add-friend page), the
  app sends the owner there; afterwards LINE should send them back to the app,
  and the next load shows `lineConnected: true`. If you can link without
  leaving the app, return `url: null, connected: true`.
- **Invites:** the app shares whatever `url` you return through the phone's
  share sheet (usually into LINE). The free plan allows 2 family members;
  check the limit on the backend too.
- **Voice messages:** family record them in LINE; the backend (through
  LINE's Messaging API) stores the audio and lists it here with an `audioUrl`
  the phone can play.
- **New messages while the app is open:** the app calls `GET /messages` once a
  minute and shows 「收到 1 則新的語音留言」 when the unplayed count goes up. A
  closed phone cannot be alerted by a website; LINE's own notification does
  that.

### SuiLa Premium

| Call | Sends | Returns |
|---|---|---|
| `POST /subscription` | `{ plan: "monthly" \| "yearly" }` | `{ isPro: boolean }` |

There is no real payment yet and prices are not decided. Premium unlocks
habit analysis and more than 2 family members.

### Analysis

`GET /analysis` returns `{ advice: string | null }`: a short text, in the
owner's language, written by the backend (and any AI it uses). The app shows
it under 「分析建議」 and **always** adds 「僅供提醒，不是醫療建議。」 below it.
When `advice` is `null`, the app shows its own plain sample comparing the
owner's drinking with the goal they set.

Please be careful here: people with heart or kidney disease are often told by
their doctor to drink *less*. The text should remind and encourage, and point
to the doctor for amounts, rather than tell someone how much to drink.

## Not covered yet

- Low-battery and offline notices through LINE (the app shows them; sending a
  LINE message is the backend's job).
- Which language the analysis text should be in: the app's language choice is
  only stored on the phone. If you need it, ask Kyle to add it to the profile.
