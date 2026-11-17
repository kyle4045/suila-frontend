import { useLayoutEffect, useRef, type PointerEvent, type RefObject } from "react"
import { swipeTarget } from "./swipe"

/** Pixels the finger must move sideways before it counts as a swipe, not a tap. */
const startPx = 10
/** At the first and last tab the page only follows a quarter of the way. */
const edgeResistance = 0.25

/**
 * Lets the tab pages follow a sideways drag. It drives two CSS variables on
 * the shell element, so nothing re-renders while the finger moves:
 *   --drag          how far the pages are pulled, in px
 *   --nav-progress  which tab is showing, as a fraction (1.4 = 40% of the way from tab 1 to 2)
 * The tab buttons keep working; this is a shortcut, not the only way.
 */
export function useTabSwipe(
  shell: RefObject<HTMLElement | null>,
  page: number,
  count: number,
  onChange: (page: number) => void,
) {
  const drag = useRef<{
    id: number
    x: number
    y: number
    time: number
    width: number
    active: boolean
  } | null>(null)
  // A drag that ends over a button must not also press it.
  const swallowClick = useRef(false)

  useLayoutEffect(() => {
    shell.current?.style.setProperty("--page", String(page))
    shell.current?.style.setProperty("--nav-progress", String(page))
  }, [shell, page])

  const finish = (event: PointerEvent<HTMLElement>, cancelled: boolean) => {
    const state = drag.current
    drag.current = null
    const element = shell.current
    if (!state || !element || event.pointerId !== state.id) return
    element.classList.remove("is-dragging")
    element.style.removeProperty("--drag")
    if (!state.active) return
    // Only the click that ends this very drag is swallowed, never a later tap.
    window.setTimeout(() => (swallowClick.current = false), 0)
    const target = cancelled
      ? page
      : swipeTarget({
          dx: event.clientX - state.x,
          width: state.width,
          ms: event.timeStamp - state.time,
          page,
          count,
        })
    element.style.setProperty("--nav-progress", String(target))
    if (target !== page) onChange(target)
  }

  return {
    onPointerDown: (event: PointerEvent<HTMLElement>) => {
      swallowClick.current = false
      if (event.pointerType === "mouse" && event.button !== 0) return
      // Typing and pickers keep their own sideways behaviour.
      if ((event.target as HTMLElement).closest("input, select, textarea")) return
      drag.current = {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        time: event.timeStamp,
        width: event.currentTarget.clientWidth,
        active: false,
      }
    },
    onPointerMove: (event: PointerEvent<HTMLElement>) => {
      const state = drag.current
      const element = shell.current
      if (!state || !element || event.pointerId !== state.id) return
      const dx = event.clientX - state.x
      if (!state.active) {
        if (Math.abs(dx) < startPx) return
        // Mostly up-and-down: that is scrolling, leave it alone.
        if (Math.abs(event.clientY - state.y) > Math.abs(dx)) {
          drag.current = null
          return
        }
        state.active = true
        swallowClick.current = true
        element.classList.add("is-dragging")
        try {
          event.currentTarget.setPointerCapture(event.pointerId)
        } catch {
          // The pointer is already gone; the drag simply ends on the next event.
        }
      }
      const atEdge = (page === 0 && dx > 0) || (page === count - 1 && dx < 0)
      const shown = atEdge ? dx * edgeResistance : dx
      element.style.setProperty("--drag", `${shown}px`)
      element.style.setProperty("--nav-progress", String(page - shown / state.width))
    },
    onPointerUp: (event: PointerEvent<HTMLElement>) => finish(event, false),
    // The browser takes over (for example to scroll): put the pages back.
    onPointerCancel: (event: PointerEvent<HTMLElement>) => finish(event, true),
    onClickCapture: (event: { preventDefault: () => void; stopPropagation: () => void }) => {
      if (!swallowClick.current) return
      swallowClick.current = false
      event.preventDefault()
      event.stopPropagation()
    },
  }
}
