// Self-check for swipe.ts. Run with: npm test
import assert from "node:assert/strict"
import { tabProgress } from "./swipe.ts"

// three tabs centred at 60, 160 and 260 px
assert.equal(tabProgress(60, 60, 260, 3), 0)
assert.equal(tabProgress(160, 60, 260, 3), 1)
assert.equal(tabProgress(260, 60, 260, 3), 2)
assert.equal(tabProgress(200, 60, 260, 3), 1.4)
// past either end stays on the first or last tab
assert.equal(tabProgress(0, 60, 260, 3), 0)
assert.equal(tabProgress(400, 60, 260, 3), 2)
// letting go rounds to the nearest tab
assert.equal(Math.round(tabProgress(205, 60, 260, 3)), 1)
assert.equal(Math.round(tabProgress(215, 60, 260, 3)), 2)
// a bar with one tab, or not laid out yet, never breaks
assert.equal(tabProgress(100, 60, 60, 1), 0)
assert.equal(tabProgress(100, 0, 0, 3), 0)

console.log("swipe.ts: all checks passed")
