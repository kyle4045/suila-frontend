import type { ReactNode } from "react"

/** The main action of a full-screen view. Floats above the content at the bottom. */
export function FloatingButton({
  onClick,
  disabled = false,
  children,
}: {
  onClick: () => void
  disabled?: boolean
  children: ReactNode
}) {
  return (
    <button
      className="floating-action"
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
