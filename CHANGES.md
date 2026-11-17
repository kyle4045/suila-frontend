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

### Item 10: no more swiping between tabs

**Whole app**
- Swiping left or right no longer changes tab. Tabs change only through the
  bottom navigation, which is always visible. A swipe was easy to trigger by
  accident while scrolling and had no visible hint.

### Item 12: night mute in 30-minute steps

**夜間靜音**
- 開始時間 and 結束時間 are now one list each, in 30-minute steps, written
  the same way as everywhere else (下午 10:00, 上午 7:00). Before, each time
  needed two lists, and the minute list had 60 entries.
- The on/off switch is now the whole row (about 130px tall) instead of a small
  38px switch, and it says 「已開啟」 or 「已關閉」 in words next to the switch.
- Nothing changes until 儲存 is pressed; then 「已儲存夜間靜音設定」 appears.
  Pressing 返回 with unsaved changes asks first. Before, changes applied as
  you touched them and 儲存 did nothing different from closing.

### Item 14: 關於我們

**關於我們 (new page)**
- The row used to do nothing. It now opens a page with a short description of
  水啦 and a note that this is a course project demo with sample data.
- No team or school names are shown; add them to the text file if the group
  wants them.

### Item 9: the calendar shows drinking, not reminder counts

**日曆**
- It now uses the real date. It opens on the current month with today
  outlined and selected. Before, it was fixed to 2025 and opened on 22 May.
- The 12-month dropdown is replaced by 「上個月」 and 「下個月」 buttons.
  「下個月」 is greyed out on the current month, and future days cannot be
  selected.
- Each day shows a mark under the number: a tick when the goal was met, a dot
  when there are records but the goal was not met, nothing when there are no
  records. A legend under the grid explains the two marks. The meaning comes
  from the shape, not the color.
- Day numbers are 22px (were 19px) and each day cell is 60px tall.
- Below the grid, the selected day shows the date and weekday
  (「11 月 17 日 星期二（今天）」), 「已喝 1260 / 2000 毫升」, 「已達標」 or
  「未達標」, and that day's records. Before, it showed how many reminders
  fired, which says nothing about drinking.
- 「前一天」 and 「後一天」 buttons under the details, 64px tall. On a 320px
  phone a day cell is only about 35px wide, so these give an easy way to move
  between days without hitting a small target.
- Nothing scrolls inside the page any more; the old reminder list had its own
  scrolling box.

**Sample data**
- Records now cover the past six weeks: today (6 records, 1260 毫升),
  yesterday (1230 毫升), and 40 generated days with 6 to 10 drinks each and an
  occasional day with nothing. The generated numbers are the same every time.
- Today's figures in the calendar come from the same records as the home
  screen, so the two always agree.

**Known limits**
- Past days are judged against the current goal, because the app does not
  store what the goal was on each day.
- Records can only be corrected from the home screen (today's). The calendar
  is read-only.

### Item 13: habit analysis

**我的**
- New 「習慣分析」 row with a 「Pro」 tag, above 關於我們.
- Habit analysis is a Pro feature. Without Pro, tapping the row opens the
  水啦 Pro page. The demo starts without Pro; a switch to turn Pro on will be
  in the demo panel.

**習慣分析 (new page, Pro only)**
- 過去 7 天: one row per day for the seven full days before today (today is
  left out because it is not over). Each row shows the date and weekday, the
  amount in 毫升, a bar, and a tick after the bar on days that met the goal.
- Two plain sentences sum it up, for example 「7 天中有 3 天達標」 and
  「平均每天 1787 毫升」.
- 最容易忘記喝水的時段: the part of the day with the fewest drink records in
  those seven days, for example 「上午 6:00 到 上午 9:00」, with a
  「新增提醒時間」 button that opens 提醒設定.
- The page describes what was recorded and offers a reminder. It gives no
  health advice.
- If there are no records in the seven days, it says 「紀錄還不夠，過幾天再來
  看看。」.

**How the forgetful period is chosen**
- The day is split into five parts: 6–9, 9–12, 12–14, 14–18 and 18–22. The
  part with the fewest records per hour wins. The parts are a simple
  assumption and are defined in one place (`src/lib/habits.ts`).

**For the group's developers**
- The calculations have a small self-check: `npm test`.

Priority 2 is now complete.

## Phase 5 — states and the hidden demo panel

### How to open the demo panel

Tap the 「水啦 SuiLa」 name in the top bar **five times quickly** (within about
half a second between taps). Nothing in the normal app shows or hints at it.
It opens a page called 「示範控制」. Press 返回 to leave it.

### What the panel switches

| Group | Choices |
|---|---|
| 資料 | 一般（六週紀錄） / 第一天（沒有紀錄） |
| 底座 | 已連線 / 未連線（3 筆等待同步） / 尚未配對 |
| 電量 | 正常 82% / 偏低 15% |
| LINE | 已連結 / 未連結 |
| Pro | 關 / 開 |

The current choice in each group is filled in and ticked. The choices can be
combined (for example offline and low battery together).

「全部重設」 reloads the app, which puts every screen back to how the demo
starts (nothing is stored between visits).

### What each state looks like

- **第一天 (no records):** the ring shows 「已喝 0 / 2000 毫升」 and
  「完成 0%」. The records card says 「今天還沒有紀錄」 with a new hint:
  「喝完水把水瓶放回底座，就會自動記下來。也可以按「手動加水」。」 The calendar
  says 「這天沒有紀錄」, 語音留言 says 「還沒有語音留言」, and 習慣分析 (with
  Pro) says 「紀錄還不夠，過幾天再來看看。」 instead of seven empty rows.
- **未連線:** the status card on home and on 底座裝置 says 「底座未連線」 and
  「3 筆紀錄等待同步」.
- **電量偏低:** both say 「電量偏低 15%，請充電」.
- **尚未配對:** both say 「尚未配對底座」 with a 「配對底座」 button.
- **LINE 未連結:** the 家人 tab shows the explanation and 「加入 LINE」; the
  new-message row on home and the number on the 家人 tab disappear.
- **Pro 開:** 習慣分析 opens the analysis page instead of the Pro page.

### How it was checked

A script switched through every state and opened every screen in each one
(home, calendar, 家人, 我的, 底座裝置, 習慣分析) at 390px and 320px, checking
that nothing scrolls sideways, no button outside the calendar grid is under
56px tall, and nothing scrolls inside a page. No problems were found.

## Phase 5b — English and the language switch

### The switch

**我的**
- New 「語言 / Language」 card above 關於我們 with two buttons, 「繁體中文」 and
  「English」. Both names are always shown, each written in its own language.
  The current one is filled in and ticked.
- Tapping a button changes the whole app at once, with no reload.
- The choice is remembered on that phone or browser for the next visit.
  繁體中文 is the default.
- The browser tab title and the page's language setting (used by screen
  readers) change with it.

### What is translated

- Every screen, button, message and screen-reader label, including the hidden
  demo panel. All English text is in one file, `src/i18n/en.ts`, with the same
  structure as the Chinese file.
- Times read 「2:10 PM」 instead of 「下午 2:10」, dates read
  「Tue, Nov 17 (today)」 and 「November 2026」, and the unit is 「ml」.
- Sample names become Mei-Ling, Ya-Ting (daughter) and Chih-Ming (son). The
  owner's name follows the language unless the user has typed their own.
- The three sample voice messages are spoken in English with an English voice.
- The English is written as product copy, not word for word. Examples:
  已喝 → 「So far」, 手動加水 → 「Add water」, 底座裝置 → 「Base」,
  習慣分析 → 「Habits」, 示範控制 → 「Demo」.
- The 水啦 SuiLa name in the top bar is the same in both languages.

### Layout fixes made for English

- Two-button rows (上個月 / 下個月, 前一天 / 後一天, － 100 / ＋ 100) now let a
  longer label wrap onto two lines instead of overflowing
  (「Previous month」).
- 提醒設定 on 320px phones: the time list and its 新增 button stack on two
  lines, and the time rows use slightly smaller text (22px and 20px), so
  「10:00 AM」 and 「Remove」 fit on one line.
- The brightness choice reads Low / Mid / High.

### How it was checked

- A script opened 32 screens and states in each language at 390px and 320px,
  looking for text that is cut off, anything sticking out sideways, buttons
  under 56px and content hidden behind floating bars. None found after the
  fixes above.
- Switching language, reloading (the choice is kept) and switching back were
  tested, including the owner's name following the language.

### Known limits

- The English voice depends on the computer, like the Chinese one.
- A confirmation message that is on screen while the language is switched
  stays in the old language until it disappears.

## Restyle sample (awaiting approval)

Applied to the home tab, the top bar and the bottom navigation, plus motion
everywhere. Layouts, the name and the blue stay; other screens keep their old
styling until the sample is approved. The new styles live in
`src/restyle.css` for now so they are easy to judge and undo.

**Look**
- Cards lose their outlines; space and one soft shadow separate them, with
  rounder corners. The page background is a soft blue-grey.
- Blue is kept for the water card, the main button and the current tab.
  Secondary buttons (修改, 日曆) are pale-blue pills instead of white boxes
  with outlines.
- The status card is one compact line (「底座已連線　電量 82%」).
- The new-messages row is pale blue with an arrow, so it reads as news.
- The ring is drawn with a thick round-ended stroke and fills smoothly from
  empty when the screen opens or water is added.
- Record times use 18px, the amounts 24px bold, so the number stands out.

**Swipe between tabs** (brought back at Kyle's request)
- Drag sideways anywhere on a tab page: the page follows the finger, and the
  highlight in the bottom bar slides along with it.
- Let go past about a third of the screen, or flick, and it moves to the next
  tab; otherwise it springs back. At the first and last tab it only gives a
  little.
- Scrolling up and down is not affected, and a swipe that ends on a button
  does not press it. The tab buttons work as before.
- The 手動加水 button fades and sinks as the 喝水 tab slides away.

**Transitions**
- Full-screen views slide in from the right and slide back out.
- Yes/no questions fade in; the confirmation message eases in and out.
- Buttons press in slightly when tapped.
- Phones set to reduce motion get the changes without the movement.

**Rules relaxed a little** (Kyle's decision): small labels and captions
16–18px, minor buttons 48px. Main text, numbers and main buttons are unchanged.

**How it was checked**
- Simulated swipes at 320px and 390px: slow drag past a third, short drag
  (springs back), quick flick, drag past the last tab, vertical scroll, and a
  drag ending on a button. All behaved as described.
- The ring shows exactly 63%, the highlight sits under the current tab after
  every swipe and tap, and nothing scrolls sideways or hides behind the
  floating bars.
- Two bugs were found and fixed: the ring arc was drawn far too short in this
  browser, and a "skip the next tap" flag after a swipe could linger.

**Swipe fix (after Kyle reported it did not work)**
- A two-finger swipe on a laptop trackpad now changes tab too, with the page
  and the highlight following. Trackpads send this as sideways scrolling, not
  as a drag, so it was ignored before.
- On phones, sideways touches on a tab page now go to the swipe instead of the
  browser, while up-and-down still scrolls.

## Four home versions to compare (Kyle picked 藍色頂部 / Blue top)

Kyle found the first restyle too plain (one controlled blue), with too many
boxes and too many words, and asked for warm and friendly. Four versions of
the home screen were built so he can compare them in the app.

**How to switch:** tap 水啦 SuiLa five times, then 「首頁樣式」 at the top of
the demo panel. The app starts on 藍色頂部.

1. **藍色頂部 (Blue top):** the top of home is one big blue area behind the
   header, with the base status, today's amount as a large number, a white
   progress bar and the percentage.
2. **水杯 (Water glass):** a drawn glass that fills with water, with 「已喝
   1260 / 2000 毫升」 and 「還差 740 毫升」 beside it.
3. **彩色方塊 (Colour tiles):** a blue water tile, then two tiles side by side:
   a coral 家人 tile (new messages, opens the 家人 tab) and a green 底座 tile
   (status, opens 底座裝置). The 底座 tile turns amber when something needs
   attention.
4. **簡潔 (Clean and calm):** almost no boxes; a very large number, a thin
   progress line, and thin dividers between sections.

**In all four**
- A warm cream background instead of grey-blue, and two new soft colours
  beside the blue: coral for family and green for the base (amber for
  warnings).
- Fewer words: the base status is one short line, for example
  「已連線 · 電量 82%」, and the new-message row says 「2 則新留言」.
- **New weekly sneak peek:** seven small bars for the past seven days, with a
  tick on days that met the goal. Free for everyone. Tapping it opens the full
  習慣分析 with Pro, or the 水啦 Pro page without it; it is labelled
  「看完整分析」 with a Pro tag.
- The ring is replaced by a number and a progress bar (or the glass).
- The records list, 手動加水, swipe and transitions are unchanged.

**How it was checked:** every version at 320px in both languages, in the
normal, offline + low battery, unpaired and day-one states: nothing overflows
or scrolls sideways, every button is at least 48px tall, and the last record
clears the floating buttons.

**After the pick:** the other three versions are deleted, and the chosen look
spreads to the other screens.

**Kyle picked 藍色頂部 (Blue top).** The water glass, colour tiles and clean
and calm versions were deleted, along with the 首頁樣式 switch in the demo
panel and the old ring styles they replaced. Home looks exactly like the Blue
top version shown in the comparison.

## Changes after Kyle reviewed the Blue top home

### Changing tab by sliding along the bottom bar

- Dragging the page sideways no longer changes tab (this replaces the
  page swipe and the trackpad swipe added earlier). Kyle meant sliding a
  finger along the floating bottom bar.
- Put a finger on the bottom bar and slide it: the highlight follows the
  finger, and when the finger lets go the page changes to the tab under it.
  A small slide that stays over the same tab changes nothing.
- Tapping a tab works as before.

### 我的: language first, and Pro is now 水啦 Premium

- The 語言 / Language card is now the first thing on 我的, followed by
  基本資料, 提醒設定, 夜間靜音, 底座裝置, 習慣分析 and 關於我們.
- Every "Pro" is renamed. Chinese uses the Chinese name, English the English
  one: the button reads 「升級水啦 Premium」 / 「Switch to SuiLa Premium」, the
  page is 「水啦 Premium」 / 「SuiLa Premium」, and small tags read 「Premium」.
- The two language buttons now keep each name on one line on 320px phones.

### 喝水: 「顯示水瓶」 switch

- The blue area on home has a labelled switch, 「顯示水瓶」 / 「Show bottle」.
  On, it shows a glowing bottle filled to today's amount beside the numbers;
  off, it shows the progress bar instead. It starts on, and the choice is
  remembered on that phone.

### 手動加水: dark and glowing

- The page is now deep navy. The cup is replaced by a glowing bottle with
  measurement marks; the water is bright cyan with waves that keep moving.
- Choosing 100 / 200 / 300 or typing an amount makes the water rise smoothly
  (the bottle holds 500 毫升; more shows it full), and a large cyan readout
  counts up to the amount.
- Quick buttons, the input and the card use the same dark, glowing style.
- Phones set to reduce motion: the waves stand still and the level and
  number change without moving.

### SuiLa Premium works in the demo

**水啦 Premium page**
- Below what Premium adds, a 「選擇方案」 card offers 每月 and 每年, both
  showing 「價格待定」 (prices to be filled in later), and the note
  「示範版：不會真的付款。」.
- 「升級水啦 Premium」 asks 「確定升級水啦 Premium（每年）嗎？」 with 確認升級 and
  取消. Confirming shows 「已升級水啦 Premium」, and the page then shows
  「水啦 Premium 已啟用」 instead of the plans and the button.
- 我的: once upgraded, the Premium button reads 「水啦 Premium 已啟用」.
- The demo panel's Premium switch still turns it on and off directly.

**More family members (Premium)**
- With Premium, 新增家人 says 「用 LINE 邀請更多家人」 and opens a new
  邀請家人 page: three steps and a 「分享邀請連結」 button that opens the
  phone's share sheet (or copies the link on a computer).
- Without Premium it still says the free plan allows 2 and opens the
  Premium page.
- The link is a placeholder; the real invite and LINE linking come from the
  backend.

**習慣分析: 分析建議**
- A new 「分析建議」 section at the bottom. Kyle decided the analysis text
  comes from the backend (and its AI); the app only shows it, always with the
  label 「僅供提醒，不是醫療建議。」.
- Until the backend sends text, it shows a plain sample built from the owner's
  own goal, for example 「過去 7 天，有 4 天沒有達到你自己設定的目標（2000 毫升）。」
  and when they most often forget.
- If 心臟病 or 腎臟病 is selected in 基本資料, it adds 「你在基本資料選了需要
  注意喝水量的健康狀況，請和醫護人員確認你的每日目標。」. It never suggests an
  amount by itself.

**How it was checked:** the full flow at 320px and 390px in both languages:
locked state, cancel, subscribe, the active state, the unlocked analysis, the
invite page and the home chart opening the analysis once Premium is on.
Sharing could not be completed in the hidden preview (no share sheet or
clipboard there), so it showed its "try again" message as designed.

### The Blue top look on every other screen

**家人 and 我的**
- Both tabs now start with a shorter blue band behind the header, like home:
  家人 shows 「已透過 LINE 連結 2 位家人」 (or 「還沒有連結 LINE」), and 我的
  shows the owner's name and 「免費版」 or 「水啦 Premium 已啟用」. Swiping
  between the three tabs now feels like one app.
- 家人: the family list loses its green heading box (the band says it now)
  and is titled 「已連結的家人」; the 新增家人 row has no outline.
- 我的: the separate outlined boxes are grouped into two white cards with
  thin dividers. Each row has a small coloured icon: 基本資料, 提醒設定,
  夜間靜音 and 底座裝置 in the first card; 習慣分析 and 關於我們 in the second.
  The language card stays first and the Premium button last.

**Every full-screen view** (日曆, 修改紀錄, 基本資料, 提醒設定, 夜間靜音,
底座裝置, 配對, 習慣分析, 水啦 Premium, 邀請家人, 關於我們, questions)
- The same warm cream background as the tabs, cards without outlines, and
  input fields and choices on a warm white with a soft border.
- 手動加水 keeps its dark glowing style on purpose.

**One stylesheet again**
- `src/restyle.css` was merged into `src/index.css`, and styles no screen
  uses any more were removed. Older rules that the restyle overrides are
  still in the file further up; they do no harm but could be tidied later.

**How it was checked:** a script opened 26 screens and states (every tab and
full-screen view, the Premium flow, questions, and the offline, low-battery,
unpaired, LINE-not-linked and day-one states) in both languages at 320px and
390px. Nothing sticks out, scrolls sideways or hides behind a floating bar,
and every button is at least 48px tall.

## Backend connection

The app can now run on the teammate's real backend. Nothing changes on
screen while it runs on sample data.

**How it works**
- Everything the app loads or saves goes through one file,
  `src/api/index.ts`. No screen talks to the server by itself.
- If a backend address is set (copy `.env.example` to `.env.local` and fill in
  `VITE_API_URL`), the app uses the backend. If not, the same file answers from
  the sample data, so the presentation demo keeps working with no backend.
- `BACKEND.md` is written for the backend teammate: every call the app makes,
  what it sends and what it expects back, and what the backend must allow
  (CORS, login cookie).

**What is now saved through the backend**
- Adding, changing and deleting drink records.
- 基本資料 (its 儲存 now really saves), 提醒設定 and 夜間靜音.
- Pairing the base, linking LINE (the backend may send the owner to LINE's
  own page), the family invite link, marking a voice message as played, and
  upgrading to 水啦 Premium.
- On opening, the app loads records, base status, settings, profile, family,
  voice messages, Premium status and the analysis text.

**New screens and messages**
- While loading: 「水啦 SuiLa」 and 「載入中…」.
- If the first loading fails: 「連線失敗，請再試一次。」 with a 「再試一次」
  button.
- If a save fails: 「沒有成功，請再試一次」, and the page stays open so nothing
  typed is lost.
- The invite page shows 「載入中…」 on its button until the backend has made
  the link.
- While the app is open it checks for new voice messages once a minute and
  shows 「收到 1 則新的語音留言」 when one arrives.

**Real data from the backend**
- Family members can have real names and relations from the backend; the
  sample members keep their translated names.
- Voice messages with a real recording (`audioUrl`) play that recording;
  sample messages are still read by the browser's voice.
- The analysis text from the backend is shown under 分析建議 with the
  「僅供提醒，不是醫療建議。」 label, even when there are too few records for
  the app's own sample.

**The demo panel** still works, but it only changes what the screen shows; it
does not change anything stored on the backend.

**How it was checked**
- Sample mode: adding and editing water, saving profile and reminders, playing
  a message, upgrading, and the invite page waiting for its link.
- Real-backend mode, against a stand-in backend written to BACKEND.md: the
  failure screen with no backend running, then 再試一次 once it started;
  loading the backend's own data (its owner, goal, battery, records, family
  member and voice message); a save that the backend rejects; adding and
  deleting a record; marking a message played; upgrading (still on after a
  reload); saving night mute; the backend's analysis text. The stand-in
  backend logged every call the app made, matching BACKEND.md.

**Not tested:** a real voice recording playing (the hidden preview blocks
sound that is not started by a real tap), LINE login, and the teammate's
actual backend.

## Phase 6 — final check (2026-11-17)

Every screen was walked against the design rules (CLAUDE.md sections 6, 6a,
6b and the later decisions in section 9), in 繁體中文 and English, at 390px and
320px. Text size, button size and contrast were measured on every screen and
state; the code was searched for hard-coded text and stray styles. Nothing
was changed in this step; this is the list of what still fails.

### Passes

- Every full-screen view has a title and a labelled 返回 button.
- One scroll area per screen; nothing hides behind the floating bars; nothing
  overflows or is cut off, in either language, at 390px or 320px.
- Ordinary text contrast: no failures on any light screen (all at least
  4.5:1). On the dark 手動加水 page the readout and labels are 7.5:1 or
  better.
- Main buttons are 56px or taller; the four smaller ones (顯示水瓶, 日曆, and
  the two 修改 / 移除 buttons) are 48px, which the relaxed rule allows.
- Nothing relies on colour alone: goal ticks, status icons, chosen options
  marked with ✓, and words beside every colour.
- No gesture-only action: sliding along the bottom bar is a shortcut; tapping
  a tab still works.
- Every number has a unit and a meaning; every state (normal, day one,
  offline, low battery, unpaired, LINE not linked) is handled.
- All visible text lives in the two translation files; nothing is written in
  the screens.
- Unsaved changes ask before leaving on 修改紀錄, 提醒設定 and 夜間靜音.
- No styles left that no screen uses.

### Still failing

1. **Key number contrast on home.** The big amount 「1260 / 2000 毫升」 is
   white on the brand blue: 5.6:1. The rule asks 7:1 for key numbers. Fix:
   a slightly deeper blue behind the numbers (#1d4e96 gives 8.1:1), or a
   darker band.
2. **基本資料 applies changes as you type.** Leaving with 返回 after editing
   does not ask first and the edits stay on screen without being saved; 儲存
   gives no 「已儲存」 confirmation either. Fix: edit a copy, ask before
   leaving, and confirm on save, like 提醒設定.
3. **The 「Premium」 tag on the home chart is 14px**, below the 16px floor for
   small labels.
4. **The placeholder in the 手動加水 input is 4.2:1** on the dark page (needs
   4.5:1).
5. **The confirmation message briefly covers the top of the page** for its
   four seconds. The rule says floating elements never cover text being read.
6. **Typing an amount on 手動加水 and pressing 返回 does not ask first.** Low
   stakes (nothing is saved yet), but it breaks the unsaved-changes rule.

### Housekeeping (not visible to users)

7. **The font loads from Google over the internet.** Without Wi-Fi at the
   presentation, the app falls back to a system font. Fix: save the font into
   the project.
8. **Old style rules remain in `index.css`.** About 60 selectors are defined
   twice; the later (restyle) one wins, so nothing looks wrong, but the file is
   longer than it needs to be (about 3,090 lines).
9. **A few text glyphs stand in for icons:** 「＞」 on the 新增家人 row and
   「✓」 on chosen options, while the rest of the app uses drawn icons.
10. **Two decorative shadows outside the two shared levels:** the frame around
    the app on a computer screen, and the cyan glow on the chosen quick amount
    on 手動加水 (deliberate, part of the glowing look).
11. **`index.html` still has a Chinese page description.** The tab title
    switches with the language, but the description used by link previews does
    not.

### Not checked

- On a real phone (touch, the bottom-bar slide, sound, the share sheet).
- With a screen reader.
- Against the teammate's real backend (only a stand-in written to BACKEND.md).

### Fixes after the final check

1. **Key numbers are easier to read.** The blue band (home, 家人, 我的) now
   uses the deeper brand blue, so the white amount reaches 8.1:1 instead of
   5.6:1. The progress bar's empty part is a soft white instead of dark blue.
2. **基本資料 works like the other settings pages.** Changes stay on the page
   until 儲存; pressing 返回 with changes asks 「還沒有儲存，要離開嗎？」; saving
   shows 「已儲存基本資料」.
3. **The 「Premium」 tag on the home chart** is now 16px.
4. **The 手動加水 input's placeholder** is lighter on the dark page (6.2:1).
5. **The confirmation message no longer covers the page.** It still appears
   just below the header, but the page moves down by the message's height
   while it shows, and back afterwards.
6. **手動加水 asks before leaving** when an amount has been chosen or typed
   but not added: 「還沒有加入，要離開嗎？」. With nothing typed it closes as
   before.

Checked at 320px: contrast measured at 8.13:1; the message sits below the
header and above the first line of content on a tab and after saving; both
pages ask, and 「繼續修改」 keeps what was typed.

Still open from the final check: the font loading from Google (needs Wi-Fi at
the presentation), duplicate old style rules, typed 「＞」 / 「✓」 characters,
the decorative glow and frame shadows, and the Chinese page description.

### The font works without internet

- Noto Sans TC is now part of the app instead of being loaded from Google's
  servers, so the app looks the same with no Wi-Fi at the presentation.
- It comes from the `@fontsource-variable/noto-sans-tc` package (version
  5.3.1, free OFL licence that allows bundling). One "variable" font covers
  every weight the app uses; the whole built app is about 4.8 MB.
- The font is split into small pieces by character, and the phone only loads
  the pieces for characters on screen.
- Checked: the page makes no requests outside the app, and all text uses the
  bundled font.
