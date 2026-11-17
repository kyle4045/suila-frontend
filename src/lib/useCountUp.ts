import { useEffect, useRef, useState } from "react"

/**
 * A number that counts smoothly to `target` instead of jumping, for readouts.
 * Phones set to reduce motion get the new number straight away.
 */
export function useCountUp(target: number, durationMs = 600): number {
  const [shown, setShown] = useState(target)
  const from = useRef(target)

  useEffect(() => {
    const start = from.current
    if (
      start === target ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      from.current = target
      setShown(target)
      return
    }
    const began = performance.now()
    let frame = 0
    const step = (now: number) => {
      const t = Math.min(1, (now - began) / durationMs)
      const eased = 1 - Math.pow(1 - t, 3)
      const value = Math.round(start + (target - start) * eased)
      from.current = value
      setShown(value)
      if (t < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [target, durationMs])

  return shown
}
