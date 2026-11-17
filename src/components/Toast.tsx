import { useLayoutEffect, useRef } from "react"

/**
 * Short confirmation shown after an action, just below the header. The page
 * moves down to make room for it, so it never covers what the owner is reading.
 */
export function Toast({ message }: { message: string | null }) {
  const box = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const element = box.current
    const page = element?.closest<HTMLElement>(".page")
    if (!element || !page) return
    page.style.setProperty("--toast-space", message ? `${element.offsetHeight + 12}px` : "0px")
  }, [message])

  // Always in the page (empty when idle) so screen readers announce new messages.
  return (
    <div className="toast" role="status" aria-live="polite" ref={box}>
      {message}
    </div>
  )
}
