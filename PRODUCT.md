# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The primary user is the owner of the water bottle, and the design target is an
elderly owner in Taiwan: weaker eyesight, less precise tapping, little patience
for hidden gestures or jargon. They open the app a few times a day, usually at
home, to see how much they have drunk and to listen to messages from family.

Family members (adult children, carers) are a secondary audience. They follow
the owner's progress and send voice messages through LINE, not through this
app. Family features are an add-on to the owner's experience, not a second app.

## Product Purpose

SuiLa 水啦 is a smart weighing base that sits under a water bottle, plus this
app. When the owner drinks and puts the bottle back, the base compares the
stable weight before and after, works out how much was drunk and logs it. If
the owner goes too long without drinking, the base reminds them with a soft
light. Success is the owner drinking enough each day without having to think
about logging, and family feeling close enough to help.

## Positioning

Logging happens by itself, from the weight of the bottle. The owner never has
to open the app to record a drink; the app is where they check, correct and
hear from family.

## Operating Context

- Opened on a phone as a website that feels like an app (browser or inside
  LINE). It is not an app-store app.
- A student startup-course project. The app is shown in a course presentation
  and is meant to become functional once connected to a teammate's backend.
- Family connect through LINE. Linking LINE, sending voice messages and
  alerting a closed phone are the backend's and LINE's job.
- The base stores records while offline and syncs when the connection returns.

## Capabilities and Constraints

Confirmed functionality:
- Today's amount against a daily goal, in 毫升, with today's records.
- Adding water by hand (quick amounts and free entry); editing and deleting a
  record, with confirmation.
- Base status: paired or not, connected or not, battery, records waiting to
  sync. First-time pairing. A legend for the base's light colors.
- Reminder settings: daily goal, exact reminder times, light brightness. Night
  mute with start and end times.
- Family: LINE linked or not, family list (free plan: 2 members), voice
  messages with play and a "new" state.
- Calendar of past days; habit analysis (Pro).
- Pro unlocks extras only (habit analysis, more family members). Bluetooth
  pairing is always free.
- Two languages: 繁體中文 (default) and English, switchable under 我的.
- A hidden demo panel that switches states for presentations.

Constraints:
- Health conditions never produce medical advice. The app may only show a
  neutral note such as 「飲水目標請依醫護人員建議調整」.
- All visible text lives in one translation file per language.
- All sample data lives in one place, shaped the way backend data would arrive.
- Stack: React, Vite, TypeScript, plain CSS. No UI or animation library.

Undecided:
- The backend's actual API. The frontend will define a connection layer and the
  backend teammate will match it or report differences.
- How pairing really works. A website cannot reliably use Bluetooth on most
  phones, so this needs the backend and hardware teammates.
- Whether the base's real light colors match blue / white / red.
- The low-battery threshold (assumed 20%) and the goal range (assumed
  500–4000 毫升).

## Brand Commitments

- The name 水啦 SuiLa.
- The blue #2866be as the brand color.
- The current screen layouts (what is on each screen and in what order). The
  2026-11 restyle changes styling only: surfaces, spacing, type, icons, buttons
  and motion.
- Noto Sans TC.
- Plain Traditional Chinese as used in Taiwan. Numbers always carry a unit and
  a meaning (「已喝 1260 / 2000 毫升」, not "63%" alone).

## Evidence on Hand

- No real user data, testimonials or usage numbers. Everything shown is sample
  data in `src/data/mock.ts`; do not present it as real.
- No real voice recordings. Sample messages are read by the browser's voice.
- No product photography of the base or bottle.

## Product Principles

1. The owner first. Every screen is judged by whether an elderly owner can use
   it alone.
2. Say what is true in plain words: a number with its unit, a status with what
   it means, a button with what it does.
3. Nothing important depends on a gesture, a color or an unlabeled picture
   alone. A gesture may exist as a shortcut next to a visible control.
4. Every action is confirmed, and nothing is lost without asking.
5. Calm over clever: motion and decoration only where they explain what just
   happened.

## Accessibility & Inclusion

- Main text and numbers stay large (20px or more); small labels and captions
  may go down to about 16px. Main controls stay 56px or taller; minor ones may
  go down to about 48px. (Relaxed slightly from the original brief on
  2026-11-17 at the owner's request.)
- Text contrast at least 4.5:1, and 7:1 for key numbers.
- Floating bars and all surfaces are solid. No see-through or blurred surfaces.
- Honour the phone's reduce-motion setting.
- One scroll area per screen; content never hidden behind floating bars.
