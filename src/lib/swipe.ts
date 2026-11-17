// Decides where a finished tab swipe lands. No UI.

/** How far (as a share of the page width) a slow drag must go to change tab. */
const distanceShare = 0.35
/** A quick flick changes tab after only this many pixels... */
const flickMinPx = 30
/** ...if it moved at least this fast, in pixels per millisecond. */
const flickSpeed = 0.5

/**
 * @param dx horizontal movement in px; negative means the finger moved left (towards the next tab)
 * @returns the tab to settle on, never outside 0..count-1
 */
export function swipeTarget({
  dx,
  width,
  ms,
  page,
  count,
}: {
  dx: number
  width: number
  ms: number
  page: number
  count: number
}): number {
  const far = Math.abs(dx) > width * distanceShare
  const flick = Math.abs(dx) > flickMinPx && Math.abs(dx) / Math.max(ms, 1) > flickSpeed
  if (!far && !flick) return page
  return Math.max(0, Math.min(count - 1, page + (dx < 0 ? 1 : -1)))
}
