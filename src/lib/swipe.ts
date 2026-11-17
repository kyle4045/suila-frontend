// Works out which tab a finger on the bottom bar points at. No UI.

/**
 * @param x           finger position, in px
 * @param firstCenter centre of the first tab button, in px
 * @param lastCenter  centre of the last tab button, in px
 * @returns a fractional tab index (1.4 = 40% of the way from tab 1 to tab 2),
 *          never outside 0..count-1
 */
export function tabProgress(
  x: number,
  firstCenter: number,
  lastCenter: number,
  count: number,
): number {
  const span = lastCenter - firstCenter
  if (count < 2 || span <= 0) return 0
  const progress = ((x - firstCenter) / span) * (count - 1)
  return Math.max(0, Math.min(count - 1, progress))
}
