export function CalendarIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <rect
        x="3.5"
        y="5"
        width="17"
        height="15"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M8 3v4M16 3v4M3.5 9.5h17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export type NavigationIconType = "water" | "social" | "profile"

export function NavigationIcon({ type }: { type: NavigationIconType }) {
  if (type === "water") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3S6.5 9.3 6.5 14a5.5 5.5 0 0 0 11 0C17.5 9.3 12 3 12 3Z"
          fill="currentColor"
        />
      </svg>
    )
  }

  if (type === "social") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
        <path
          d="M8.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM15.8 10a3 3 0 1 0 0-6M2.5 20v-2.2c0-2.7 2.5-4.8 6-4.8s6 2.1 6 4.8V20M15 13.5c3.8 0 6.5 1.9 6.5 4.5v2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
      <path
        d="M4.5 21c.4-4.5 3.1-7 7.5-7s7.1 2.5 7.5 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function BackIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path
        d="M15 5l-7 7 7 7"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function PlayIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5.2v13.6a1 1 0 0 0 1.5.9l11-6.8a1 1 0 0 0 0-1.8l-11-6.8A1 1 0 0 0 8 5.2Z" />
    </svg>
  )
}

export function StopIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="6" width="12" height="12" rx="2" />
    </svg>
  )
}

export function CheckCircleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path
        d="M7.5 12.5l3 3 6-6.5"
        stroke="#fff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function WarningIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3.5 2.5 20h19L12 3.5Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M12 10v4.5M12 17.2v.1"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function BatteryIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <rect
        x="2.5"
        y="7"
        width="16.5"
        height="10"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M21.5 10.5v3" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <rect x="5" y="9.5" width="9" height="5" rx="1" fill="currentColor" />
    </svg>
  )
}

export function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path
        d="M4.5 12.5l5 5 10-11"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function DotIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="5.5" />
    </svg>
  )
}
