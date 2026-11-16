export const isToday = (date: Date) =>
  date.toDateString() === new Date().toDateString()

/** The same day at 00:00, in local time. */
export const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate())

/** A local-time "YYYY-M-D" key, for grouping records by day. */
export const dayKey = (date: Date) =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
