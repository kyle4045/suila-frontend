import type { ReactNode } from "react"

/** Header of a full-screen view: optional content on the left, close button on the right. */
export function ScreenHeader({
  className,
  closeLabel,
  onClose,
  children,
}: {
  className: string
  closeLabel: string
  onClose: () => void
  children?: ReactNode
}) {
  return (
    <header className={className}>
      {children}
      <button type="button" aria-label={closeLabel} onClick={onClose}>
        X
      </button>
    </header>
  )
}
