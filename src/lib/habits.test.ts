// Self-check for habits.ts. Run with: npm test
import assert from "node:assert/strict"
import { forgetfulPeriod, lastSevenDays } from "./habits.ts"

const today = new Date(2026, 10, 17, 15, 0) // 17 Nov 2026, 3 pm
const at = (daysAgo: number, hour: number) =>
  new Date(2026, 10, 17 - daysAgo, hour, 0).toISOString()

const records = [
  { time: at(0, 9), amountMl: 999 }, // today: must be ignored
  { time: at(1, 7), amountMl: 200 },
  { time: at(1, 10), amountMl: 300 },
  { time: at(1, 13), amountMl: 100 },
  { time: at(1, 19), amountMl: 100 },
  { time: at(3, 8), amountMl: 250 },
  { time: at(3, 20), amountMl: 250 },
  { time: at(7, 12), amountMl: 400 },
  { time: at(8, 12), amountMl: 999 }, // older than a week: must be ignored
]

const week = lastSevenDays(records, today)
assert.equal(week.length, 7)
assert.deepEqual(
  week.map((day) => day.totalMl),
  [400, 0, 0, 0, 500, 0, 700],
)
assert.equal(week[0].date.getDate(), 10) // oldest first: 10 Nov
assert.equal(week[6].date.getDate(), 16) // newest: yesterday

// No drink between 14:00 and 18:00 in the week, so that is the forgetful period.
assert.deepEqual(forgetfulPeriod(records, today), { from: 14, to: 18 })
assert.equal(forgetfulPeriod([], today), null)
assert.equal(forgetfulPeriod([{ time: at(0, 9), amountMl: 1 }], today), null)

console.log("habits.ts: all checks passed")
