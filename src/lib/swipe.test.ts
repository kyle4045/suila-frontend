// Self-check for swipe.ts. Run with: npm test
import assert from "node:assert/strict"
import { swipeTarget } from "./swipe.ts"

const base = { width: 300, page: 1, count: 3 }

// a short, slow drag springs back
assert.equal(swipeTarget({ ...base, dx: -60, ms: 600 }), 1)
// a long, slow drag left goes to the next tab; right goes to the previous one
assert.equal(swipeTarget({ ...base, dx: -120, ms: 900 }), 2)
assert.equal(swipeTarget({ ...base, dx: 120, ms: 900 }), 0)
// a quick flick changes tab even when short
assert.equal(swipeTarget({ ...base, dx: -45, ms: 60 }), 2)
// a tiny twitch does not, however fast
assert.equal(swipeTarget({ ...base, dx: -12, ms: 5 }), 1)
// never past the first or last tab
assert.equal(swipeTarget({ ...base, page: 0, dx: 200, ms: 100 }), 0)
assert.equal(swipeTarget({ ...base, page: 2, dx: -200, ms: 100 }), 2)

console.log("swipe.ts: all checks passed")
