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

## Phase 2b — floating layer sample (awaiting approval)

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
