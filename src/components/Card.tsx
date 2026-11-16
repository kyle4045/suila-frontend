import type { ReactNode } from "react"

/** The white rounded card used across the app. */
export function Card({
  className = "",
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return <div className={`info-card ${className}`.trim()}>{children}</div>
}
