# SuiLa 水啦 — frontend brief for Claude Code

## 1. What this project is

SuiLa 水啦 is a student startup-course project: a smart weighing base that sits
under a water bottle, plus a phone app. When the user drinks and puts the bottle
back, the base compares the stable weight before and after, estimates how much
they drank, and logs it. If they go too long without drinking, the base reminds
them with soft RGB light. Family members can follow progress remotely and send
voice messages of care.

Product features the app must represent:
- Automatic drink logging, with the ability to correct a wrong record in the app
- Personal reminders: daily goal, reminder time slots, light brightness
- Family care: family see progress, help with settings, leave voice messages
  that play on the owner's phone
- Offline logging on the base, synced when the connection returns
- Low-battery alerts (base light, plus app/LINE notice once connected)
- Habit analysis: long-term records, and the times of day the user forgets to drink

## 2. Who uses it

The primary user is whoever owns the bottle, and the design target is an elderly
owner. Assume weaker eyesight, less precise tapping, and little patience for
hidden gestures or jargon. Family features are an add-on to the owner's
experience, not a second app.

## 3. Scope

Kyle owns the frontend design only. There is no backend and you should not build
one. Everything runs on mock data. A real backend comes later, so keep all mock
data in one place, shaped the way real data would arrive (records with
timestamps and amounts, a device status object, a family list, messages).

The app is a clickable demo that will be shown in a course presentation. It
needs to look finished and behave believably on a phone-sized screen.

## 4. Current state of the code

The first version of this app already exists. A teammate built it in Figma Make,
and this folder is that code exported: React + Vite + Tailwind, with nearly
everything in `src/App.tsx` and `src/index.css`. You are improving an existing
demo, not starting a new app. Read it before proposing anything.

- Three tabs: 喝水 (home), 社交, 我的
- Full-screen overlays: calendar, manual water entry, basic profile, night mute
- `index.css` contains many unused styles left over from earlier versions
  (battery card, alert rows, connection status, reminder list). They show what
  was once designed; reuse the ideas where they fit, then delete what is unused.

What is already good and must be kept: the blue theme (#2866be), Noto Sans TC,
body text of 20px or more, tap targets of 56px or more, aria labels, the card
style, and the screen layouts. This is an improvement pass, not a redesign. A
teammate built the original, so changes should be explainable to the group.

## 5. Decisions already made

- One app, owner-first. No separate "family mode".
- Bluetooth pairing with the base is free. Pro unlocks extras only (habit
  analysis, more family members). The current "升級 Pro：解鎖藍牙裝置連結"
  button contradicts the product and must change.
- Family members connect through LINE. The owner's app shows who is connected
  and plays the voice messages they send. Rename the 社交 tab to 家人.
- This codebase is the source of truth from now on, not the Figma Make file.
- Health conditions (腎臟病, 心臟病 and so on) never produce medical advice.
  The app may only show a neutral note such as 「飲水目標請依醫護人員建議調整」.
- The app has two languages: 繁體中文 (default) and English, switchable under 我的.
- Controls and navigation float above the content (section 6a). No glass,
  translucency or blur effects anywhere: they lower contrast, which works
  against elderly users.

## 6. Design rules

- Plain Traditional Chinese as used in Taiwan. Always give numbers a unit and a
  meaning: 「已喝 1260 / 2000 毫升」, not "63%" alone.
- One main action per screen. Every tappable thing looks tappable.
- No gesture-only actions. Anything done by swipe or by tapping an unlabeled
  graphic also needs a visible, labeled button.
- Never rely on color alone; pair it with text or an icon.
- Text contrast is at least 4.5:1 everywhere and 7:1 for key numbers.
- Every action gets visible confirmation. Leaving a screen with unsaved changes
  asks first.
- Every overlay has a title and a labeled 返回 or 關閉 button, not a bare "X".
- One scroll area per screen. No scrolling lists inside scrolling pages.
- Each screen handles its states: normal, empty (day one), offline, low battery.

## 6a. Floating layer

Navigation and main controls sit on a layer that floats above the content, so
the user always knows where the controls are.

- What floats: the bottom navigation, screen headers, and each screen's primary
  action button (for example 「手動加水」 on the home screen).
- How it floats: a solid, fully opaque surface with rounded corners, a small
  gap from the screen edges, and a soft shadow. Content scrolls underneath.
- No translucency, blur or refraction. Floating surfaces are as readable as the
  rest of the app.
- Content never ends up hidden: scrolling areas have enough bottom padding that
  the last item clears the floating navigation and button.
- Floating elements never cover each other or the text the user is reading.
- Use at most two shadow levels, defined once as shared tokens and reused, not
  styled per screen.
- Everything else (cards, lists, forms) stays in the existing flat card style.

## 6b. Two languages

- All visible text lives in one translation file per language, with no text
  written directly in components. This includes aria labels, mock data such as
  names and relationship labels, dates, times and units.
- 繁體中文 is the default. The switch is a clearly labeled row under 我的 that
  shows both language names (繁體中文 / English), and it takes effect at once.
- The choice is remembered between visits.
- English text is often longer. Check every screen in both languages at 320px
  and 390px; nothing may be cut off or overflow.
- Write the English as natural product copy, not word-for-word translation.

## 7. What to fix

Priority 1: gaps between the product and the demo
1. Replace the Pro button's Bluetooth lock (see section 5).
2. 家人 tab: it currently shows 「加入 LINE」 and 「你的 LINE 已連接」 together.
   Show one state at a time: not connected, or connected with the people list.
3. Voice messages: a place to see and play messages from family, with a large
   play button, the sender's name and the time. New messages are noticeable
   from the home screen.
4. Correcting records: each drink record can be edited or deleted, with a
   confirmation step.
5. Device status: battery, connection, and "N 筆紀錄等待同步" when offline,
   visible from the home screen. Replace the vague 「一切正常」 with a status
   that says what is normal.
6. Reminder settings under 我的: daily goal, reminder time slots, light
   brightness. Also first-time pairing of the base, and a light-color legend
   explaining what each color on the base means.

Priority 2: usability
7. Home ring: show amount drunk and goal in 毫升, with the percentage secondary.
8. Add a visible 「手動加水」 button; tapping the ring is not discoverable.
   Offer quick amounts (100 / 200 / 300 毫升) beside free entry.
9. Calendar: show how much was drunk each day and whether the goal was met, not
   reminder counts. Use the real current date, not a fixed 2025. Enlarge day
   numbers and the has-record marker.
10. Remove swipe-to-switch-tabs; the bottom navigation is enough.
11. Fix nested scrolling in the home records list.
12. Night mute: time choices in 30-minute steps, not a 60-item minute list.
13. Habit analysis screen: a simple weekly view and 「最容易忘記喝水的時段」.
14. 關於我們 currently does nothing; give it a simple page.
15. If a fluid-sensitive condition is selected in the profile, show the neutral
    note from section 5 on the goal setting.

## 8. How to work

The approval rule, which overrides everything else in this section:
Before you do anything (a phase, a single fix, a restructure, a new file, a
library, a style change), tell Kyle the idea in a few plain sentences: what you
intend to do, why, and what it will change. Then wait for his OK. Do not start
on the assumption that he will agree. If he says no or changes the idea, follow
his version.

Work in phases. Kyle has to explain every change to his group, so small visible
steps matter more than speed.

Phase 0: understand, change nothing
- Install, run the dev server, and read `App.tsx` and `index.css` fully.
- Make a first git commit of the untouched code as the baseline.
- Tell Kyle what you found and anything in this brief that conflicts with the code.

Phase 1: plan
- Write a short plan: the list of screens after the changes, the navigation
  between them, and the order of work. Ask about anything unclear. Wait for
  approval before writing code.

Phase 2: restructure without changing how anything looks
- Split `App.tsx` into one component per screen, plus shared pieces (card,
  header, buttons). Move mock data into one file. Remove unused CSS.
- Move every visible string into the translation files (Chinese only at this
  point), so later screens are built bilingual from the start.
- Check that every screen looks and behaves exactly as before. Commit.

Phase 2b: floating layer sample
- Apply the floating layer (section 6a) to the home screen and the bottom
  navigation only.
- Show Kyle. Roll it out to other screens only after he approves the sample.

Phase 3: Priority 1, one item at a time
- For each item: build it, check it in the browser at phone width (390px) and
  at 320px, confirm nothing else broke, commit, and give Kyle a two or three
  line summary of what changed.

Phase 4: Priority 2, same routine.

Phase 5: states and demo control
- Add the empty, offline and low-battery states.
- Add a small demo panel, hidden from the normal UI, that switches between
  these states so they can be shown live in the presentation.

Phase 5b: English
- Add the English translation file and the language switch, then check every
  screen in both languages.

Phase 6: final check
- Walk through every screen against sections 6, 6a and 6b, in both languages.
  List anything that still fails.
- Update `CHANGES.md`.

Throughout:
- Every new screen uses the shared floating components and the translation
  files from the start.
- Keep `CHANGES.md` current: what changed and why, in plain language, grouped
  by screen. Kyle will use it to brief his teammates.
- If a fix needs a product decision this brief does not cover, stop and ask
  rather than choosing.
- Do not report a phase as done until you have looked at the result in the
  browser.

## 9. Decisions made later (these override the sections above)

Recorded 2026-11-17. Where this section and an earlier one disagree, this one
wins. Product facts are also kept in `PRODUCT.md`.

- **Restyle.** Kyle asked for a redesign using the impeccable skill. Scope:
  keep the 水啦 SuiLa name, the blue (#2866be) and the current screen layouts;
  the styling may change (surfaces, spacing, type, icons, buttons, motion).
  This replaces "this is an improvement pass, not a redesign" in section 4.
- **The elderly rules are relaxed a little** (sections 4 and 6). Main text and
  numbers stay 20px or more and main controls 56px or more. Small labels and
  captions may go down to about 16px, and minor controls to about 48px.
  Contrast stays strong.
- **Floating bars stay solid.** No glass, translucency or blur (unchanged).
- **Swiping between tabs is back** (replaces fix 10 in section 7). The page
  follows the finger and the highlight in the bottom navigation slides with
  it. The tab buttons still work, so it is not a gesture-only action.
- **Smooth transitions** are wanted: views slide in and out, the ring fills,
  messages ease in. The phone's reduce-motion setting must be honoured.
- **A backend exists** (replaces "there is no backend" in section 3). A
  teammate built it. The frontend must become functional once connected.
  Claude does not build the backend; it builds a connection layer in the
  frontend that the backend can match, and keeps the sample data working
  behind it until then. LINE linking, voice messages from LINE and phone
  notifications are the backend's job.
- **Delivery:** a website on the phone that feels like an app, not an
  app-store app.
- The approval rule in section 8 still applies to every step.
- **Premium is named 水啦 Premium / SuiLa Premium** (replaces "Pro"). It
  unlocks habit analysis and more than 2 family members. The subscribe step is
  pretend until the backend provides one; prices are not decided.
- **Habit analysis text comes from the backend** (Kyle's decision,
  2026-11-17). This relaxes the rule in section 5: the backend (and any AI it
  uses) may write analysis that mentions health, but the app always labels it
  「僅供提醒，不是醫療建議」. The frontend itself never suggests an amount from a
  health condition; its own sample text only compares the owner's drinking
  with the goal they set.
- **Changing tab:** sliding a finger along the bottom bar (highlight follows,
  page changes on release) or tapping a tab. Dragging the page does nothing.
