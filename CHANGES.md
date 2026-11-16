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

### Item 6 (part 1): reminder settings

**我的**
- New 「提醒設定」 row between 基本資料 and 夜間靜音.

**提醒設定 (new page)**
- 每日喝水目標: shows the goal in large text (for example 「2000 毫升」) with
  「－ 100」 and 「＋ 100」 buttons. The goal can go from 500 to 4000 毫升. The
  buttons grey out at the limits. (The range and step are an assumption; the
  group can change them in one place.)
- 提醒時間: the exact times the base reminds the owner, shown as 上午 8:00,
  上午 10:00 and so on. Each has a 「移除」 button. A new time is picked from a
  list in 30-minute steps and added with 「新增」; times already in use are not
  offered again, and the list stays in time order.
- 底座燈光亮度: 低 / 中 / 高. The chosen one is filled in and marked with a
  tick, so it does not depend on color alone.
- Nothing changes until 儲存 is pressed. Then 「已儲存提醒設定」 appears and the
  ring on home uses the new goal. Pressing 返回 with unsaved changes asks
  first.

**Health note (Priority 2 item 15, done here)**
- If 心臟病 or 腎臟病 is selected in 基本資料, the goal card shows
  「飲水目標請依醫護人員建議調整」. It is a neutral note only; the app gives no
  medical advice and does not change the goal by itself.

**Small fix**
- Times between midnight and 5:59 are now written 凌晨 (for example
  「凌晨 12:00」) instead of 上午, which could be confused with noon.

### Item 6 (part 2): the base device page, pairing and the light legend

**我的**
- New 「底座裝置」 row above 關於我們.

**底座裝置 (new page)**
- Shows the same status as the home card (connection, battery, records
  waiting to sync), plus 「已配對：水啦底座」.
- 「重新配對」 button opens the pairing page.
- 燈光顏色說明: what each color of the light on the base means. Each row has
  a colored dot, the color's name in words, and the meaning:
  - 藍色：該喝水了
  - 白色：正在計算喝水量
  - 紅色：電量偏低
  (The colors were proposed by Claude and approved by Kyle; the hardware team
  should confirm they match the real base.)

**配對底座 (new page)**
- Three numbered steps: 把底座開機, 把手機靠近底座, 按「開始配對」.
- 「開始配對」 shows 「正在尋找底座…」 for two seconds, then 「配對成功」 with a
  tick and a 「完成」 button.
- This is a pretend flow: there is no real Bluetooth, and it always succeeds.
- Pairing is free, as decided. Nothing on this page mentions Pro.

**喝水 (home), first time**
- If no base has been paired yet, the status card says 「尚未配對底座」 with a
  「配對底座」 button that opens the pairing page. After pairing, the card
  shows the normal connection and battery lines.
- The demo starts already paired. The unpaired state will be switchable from
  the demo panel later.

Priority 1 is now complete.

## Phase 4 — Priority 2

Already done earlier: item 11 (no scrolling list inside the home page, done
with Priority 1 item 4) and item 15 (neutral health note, done with the
reminder settings).

### Items 7 and 8: the ring in 毫升, and a visible 手動加水 button

**喝水 (home) — ring**
- The ring's center used to show only 「63%」. It now reads 「已喝 1260 / 2000
  毫升」, with 1260 as the large number. The percentage moved below the ring as
  「完成 63%」.
- When the goal is reached, the line below reads 「今天已達標，完成 100%」.
- The center of the ring is a slightly darker blue than the card, so the white
  numbers meet the 7:1 contrast rule for key numbers (it was about 6:1).

**喝水 (home) — 手動加水**
- New 「手動加水」 button floating just above the bottom navigation, on the 喝水
  tab only. Before, the only way to add water was to tap the ring, which
  nothing on screen suggested. The ring can still be tapped.
- The button has a white edge so it stays visible when the blue water card
  scrolls behind it.
- The page keeps enough space at the bottom that the last record is never
  hidden behind the button.

**手動加水 page (was 補水)**
- Renamed 手動加水 to match the button.
- Three quick buttons, 100 / 200 / 300 毫升. Tapping one fills in the amount;
  the chosen one is filled in blue. 加入 then adds it.
- The free-entry field is still there, labeled 「或自行輸入」.
- "ml" is now 「毫升」 everywhere.
- 加入 only works for a whole number from 1 to 2000, the same rule as 修改紀錄.
- The keyboard no longer opens by itself when the page appears, so the quick
  buttons are not hidden behind it.

**Confirmation message**
- It now appears at the top, just below the header, instead of above the
  navigation, so it never covers the new 手動加水 button.
