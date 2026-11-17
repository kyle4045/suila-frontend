import {
  useEffect,
  useLayoutEffect,
  useRef,
  type PointerEvent,
  type RefObject,
} from "react"
import { swipeTarget } from "./swipe"

/** Pixels the finger must move sideways before it counts as a swipe, not a tap. */
const startPx = 10
/** At the first and last tab the page only follows a quarter of the way. */
const edgeResistance = 0.25
/** A trackpad swipe is over once no scroll event arrives for this long. */
const wheelIdleMs = 140

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

  /** Moves the pages and the navigation highlight to follow a pull of dx px. */
  const follow = (element: HTMLElement, dx: number, width: number) => {
    const atEdge = (page === 0 && dx > 0) || (page === count - 1 && dx < 0)
    const shown = atEdge ? dx * edgeResistance : dx
    element.style.setProperty("--drag", `${shown}px`)
    element.style.setProperty("--nav-progress", String(page - shown / width))
  }

  /** Clears the pull and settles on the tab the gesture earned. */
  const settle = (element: HTMLElement, target: number) => {
    element.classList.remove("is-dragging")
    element.style.removeProperty("--drag")
    element.style.setProperty("--nav-progress", String(target))
    if (target !== page) onChange(target)
  }

  // Laptop trackpads send a two-finger swipe as sideways scroll events, not as a drag.
  const latest = useRef({ follow, settle, page, count })
  latest.current = { follow, settle, page, count }
  useEffect(() => {
    const element = shell.current
    const area = element?.querySelector<HTMLElement>(".swipe-window")
    if (!element || !area) return
    let wheel: { dx: number; start: number; last: number; timer: number } | null = null
    const onWheel = (event: WheelEvent) => {
      if (!wheel && Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return
      event.preventDefault()
      const now = event.timeStamp
      wheel ??= { dx: 0, start: now, last: now, timer: 0 }
      wheel.dx -= event.deltaX
      wheel.last = now
      element.classList.add("is-dragging")
      latest.current.follow(element, wheel.dx, area.clientWidth)
      window.clearTimeout(wheel.timer)
      wheel.timer = window.setTimeout(() => {
        const done = wheel
        wheel = null
        if (!done) return
        const { page, count } = latest.current
        latest.current.settle(
          element,
          swipeTarget({
            dx: done.dx,
            width: area.clientWidth,
            ms: done.last - done.start,
            page,
            count,
          }),
        )
      }, wheelIdleMs)
    }
    area.addEventListener("wheel", onWheel, { passive: false })
    return () => area.removeEventListener("wheel", onWheel)
  }, [shell])

  const finish = (event: PointerEvent<HTMLElement>, cancelled: boolean) => {
    const state = drag.current
    drag.current = null
    const element = shell.current
    if (!state || !element || event.pointerId !== state.id) return
    if (!state.active) return
    // Only the click that ends this very drag is swallowed, never a later tap.
    window.setTimeout(() => (swallowClick.current = false), 0)
    settle(
      element,
      cancelled
        ? page
        : swipeTarget({
            dx: event.clientX - state.x,
            width: state.width,
            ms: event.timeStamp - state.time,
            page,
            count,
          }),
    )
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
      follow(element, dx, state.width)
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
