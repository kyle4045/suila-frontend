# SuiLa 水啦 — what changed and why

Plain-language notes for the group. Newest phase at the bottom.

## Phase 0 — baseline

- The code from the Figma Make file was copied into this folder unchanged and
  saved as the first git commit, so every later change can be compared to it.
- One empty settings file (`.figma/make/site.json`) was added because the
  project will not start without it.

## Phase 2 — tidy-up with no visible change

Nothing looks or behaves differently. This phase only reorganises the code so
later changes are small and easy to explain.

**Whole app**
- `App.tsx` used to hold the entire app (about 700 lines). It is now split:
  - one file per screen in `src/screens/` (home, family, my, calendar, add
    water, profile, night mute)
  - shared pieces in `src/components/` (card, screen header, save button,
    bottom navigation, icons)
- All sample data is in one file, `src/data/mock.ts`, shaped the way a real
  backend would send it (drink records with a timestamp and an amount in
  millilitres, family members, profile, night-mute settings).
- All visible text is in one file, `src/i18n/zh-TW.ts`. No text is written
  inside the screens any more. This is what makes the English version possible
  later.
- About 870 lines of unused styles were removed from `index.css` (old battery
  card, alert rows, reminder list, page dots and similar). 160 style rules in
  total, none of them used by any screen.

**How it was checked**
- Before and after the change, every screen was recorded in 21 different states
  (each tab, each full-screen view, with values changed and saved) at 390px and
  320px wide. Structure and styling were compared automatically.
- Result: identical, with one exception that cannot be seen: the "63%" text in
  the ring is 0.016 pixels narrower.

**Known issues left as they are for now** (they belong to later steps)
- Today's total (1260 毫升) does not match the listed records (850 毫升).
- Titles such as 「補水」 are thinner than intended.
- At 320px the calendar header wraps onto two lines.
- The `npm run format` command uses an early formatter that breaks some lines.
  Do not run it.

## Phase 2b — floating layer sample (approved)

Applied to the shared top bar, the bottom navigation and the three tab pages
only. Full-screen views (calendar, add water, profile, night mute) are not
changed yet.

**Top bar (水啦 SuiLa)**
- Now a solid white rounded bar with a 12px gap from the screen edges and a
  soft shadow. Page content scrolls underneath it.
- It is 64px tall instead of 115px, so more of the page is visible.

**Bottom navigation**
- Now a solid white rounded bar with the same 12px gap and shadow, instead of
  a strip attached to the bottom edge.
- It was 98% opaque before; it is now fully solid, as the design rules ask.

**Tab pages**
- Content now scrolls behind the two floating bars, with enough space at the
  top and bottom that the first and last items are never hidden.
- The home tab used to sit 18px higher than the other two tabs. All three now
  start at the same height.

**Shared tokens**
- Two shadow levels are defined once in `index.css` (`--shadow-card` and
  `--shadow-float`), plus the gap and bar heights. The floating bars and the
  cards use them. Other screens still have their own older shadows until the
  floating layer is rolled out.

## Phase 2b — floating layer on every screen

**Full-screen views (日曆, 補水, 基本資料, 夜間靜音)**
- The header is now the same kind of floating bar as the top bar: solid white,
  rounded, 12px from the edges, soft shadow. Content scrolls underneath.
- The main button (儲存 / 加入) floats at the bottom of the screen, always in
  the same place, instead of sitting at the end of the page.
- Content keeps enough space at the top and bottom that nothing ends up hidden
  behind the header or the button.

**補水**
- The 加入 button moved out of the input box to the floating position, so all
  full-screen views have their main button in the same spot.

**日曆**
- The header used to have a lot of empty space above it and wrapped onto two
  lines on 320px phones. It is now one compact bar, and on narrow phones the
  year and month use slightly smaller text (22px) so everything stays on one
  line.

**Whole app**
- Every shadow now uses one of the two shared levels: a light one for cards
  and a stronger one for floating bars and buttons. Before, there were more
  than ten slightly different shadows.
- 儲存 and 加入 are now the same shared button, so they look identical.

**How it was checked**
- A script opened every full-screen view at 390px and 320px and confirmed that
  the first item sits below the header, the last item sits above the button,
  the header content fits inside its bar, and nothing scrolls sideways.

## Phase 3 — Priority 1

### Item 1: Pro no longer locks Bluetooth

**我的**
- The Pro button used to say 「解鎖藍牙裝置連結」. Pairing the base by Bluetooth
  is free, so it now says 「解鎖習慣分析、連結更多家人」.
- Tapping it used to do nothing. It now opens the 水啦 Pro page.

**水啦 Pro (new page)**
- Explains the two things Pro adds: 習慣分析 and 更多家人 (the free version
  allows 2 family members).
- States clearly: 「藍牙連結底座永遠免費」.
- No payment step. This is a demo, so the page only informs.

**Every full-screen view (日曆, 補水, 基本資料, 夜間靜音, 水啦 Pro)**
- Each one now has a title in its header. 基本資料 and 夜間靜音 had none.
- The bare "X" is replaced by a labeled 「返回」 button with an arrow, placed
  on the left where phone users expect it. It is 56px tall.
- 日曆: the year and month picker moved from the header into the page, just
  above the calendar, so the header can hold the title like every other view.

### Item 2: 家人 tab shows one state at a time

**Bottom navigation**
- The 社交 tab is renamed 家人.

**家人**
- Before, 「加入 LINE」 and 「你的 LINE 已連接」 were shown together, which
  contradicted each other. Now only one state shows:
  - Not connected: a short explanation of what linking LINE does, and the
    「加入 LINE」 button.
  - Connected: 「已透過 LINE 連結 2 位家人」 and the list of people. No join
    button.
- The sample family is now two people (女兒 雅婷, 兒子 志明) to match the free
  limit of 2. 照護員 林小姐 was removed.
- New 「新增家人」 row under the list. It says the free version allows 2 and
  that Pro allows more, and opens the 水啦 Pro page.
- The demo starts connected. The not-connected state will be switchable from
  the demo panel later.

**Whole app**
- New confirmation message: a dark bar that appears just above the bottom
  navigation for 4 seconds after an action, for example 「已連結 LINE」. Other
  actions will use it as they are built.

### Item 3: voice messages from family

**家人**
- New 語音留言 section at the top of the tab. Each message shows who sent it,
  when, how long it is, and a large 播放 button (88px, with a play icon and
  the word 播放).
- Messages not yet listened to carry a red 「新」 tag. The tag clears when the
  message is played.
- While a message plays, its button changes to 停止. Starting another message
  stops the first one.
- If there are no messages, the section says 「還沒有語音留言」.

**喝水 (home)**
- A new row, for example 「有 2 則新的語音留言」, appears under the status line
  when there are unplayed messages. Tapping it opens the 家人 tab. It
  disappears once everything has been listened to.

**Bottom navigation**
- The 家人 tab shows a red number while there are unplayed messages. Screen
  readers hear 「2 則新留言」.

**About the sound**
- There are no audio files yet. The browser's built-in voice reads each
  message aloud. This needs a Chinese voice on the computer (Windows has one).
  If the group records real clips later, they can replace the browser voice
  with a small change.
- Three sample messages: two new (女兒 雅婷, 兒子 志明) and one already played.

### Item 4: correcting a drink record

**喝水 (home)**
- The list is now 「今天的紀錄」 and shows today's records only. Before, it mixed
  today and yesterday.
- The list no longer scrolls inside a small box. The whole page scrolls
  instead, so there is one scroll area. (This is Priority 2 item 11, done
  early because the 修改 buttons would not fit in the small box.)
- Each record shows the time on top and the amount below, with a visible
  「修改」 button (56px tall) on the right.
- Today's total is now added up from the records. Before, it was a fixed
  number (1260) that did not match the list (850). The sample records were
  adjusted so today's six records add up to 1260 毫升, still 63%.
- Adding water with 補水 now creates a record at the top of the list and shows
  「已加入 200 毫升」.

**修改紀錄 (new page)**
- Shows which record it is (for example 「下午 4:25 的紀錄」) and the amount in
  毫升, which can be changed. 儲存 only works for a whole number from 1 to 2000.
- 「刪除這筆紀錄」 asks first: 「確定要刪除「下午 4:25　210 毫升」這筆紀錄嗎？」
  with 刪除 and 取消.
- After saving or deleting, a message confirms it (「已更新紀錄」, 「已刪除紀錄」)
  and the ring updates.
- Pressing 返回 after changing the amount asks 「還沒有儲存，要離開嗎？」 with
  「離開不儲存」 and 「繼續修改」. Without changes it just goes back.

**Whole app**
- New shared question screen for anything that needs a yes or no. It covers
  the whole screen with a solid background (nothing see-through), and the safe
  choice (取消 / 繼續修改) is the one selected by default.

**Known limits**
- The sample records use fixed times of day (up to 下午 4:25). A record added
  during the demo gets the real current time and is placed on top, so the
  times may look out of order if you present in the morning.
- 基本資料 and 夜間靜音 still apply changes as you type, so they do not ask
  before leaving yet.

### Item 5: device status on home

**喝水 (home)**
- 「一切正常」 is replaced by a status card at the top that says what is
  normal: 「底座已連線」 with a green tick, and 「電量 82%」 with a battery icon.
- When the base is offline the card says 「底座未連線」 with a warning icon,
  and, if the base is holding records, 「3 筆紀錄等待同步」.
- When the battery is at 20% or less it says 「電量偏低 15%，請充電」 with a
  warning icon. (20% is an assumption; the group can change the number in one
  place.)
- Every state uses an icon and words, never color alone.
- The demo starts in the normal state. Offline and low battery will be
  switchable from the demo panel later.

**日曆 button**
- It used to be a small unlabeled icon (50px) next to 「一切正常」. It is now a
  button with an icon and the word 「日曆」, 56px tall, beside the
  「今天的紀錄」 title, since the calendar is where older records live.

**Small fix**
- Row buttons whose text wraps onto two lines (for example the new-messages
  row on a 320px phone) now align left instead of centering.
