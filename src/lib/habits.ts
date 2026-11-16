// Calculations behind the habit analysis page. No UI, no text.

type Drink = { time: string; amountMl: number }

export type DayTotal = { date: Date; totalMl: number }
export type Period = { from: number; to: number }

/** Parts of the waking day (24-hour clock) the analysis compares. */
export const dayPeriods: Period[] = [
  { from: 6, to: 9 },
  { from: 9, to: 12 },
  { from: 12, to: 14 },
  { from: 14, to: 18 },
  { from: 18, to: 22 },
]

const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate())

const daysBefore = (today: Date, days: number) =>
  new Date(today.getFullYear(), today.getMonth(), today.getDate() - days)

/** Drinks from the seven full days before `today` (today is left out: it is not over yet). */
const lastWeek = (records: Drink[], today: Date) => {
  const from = daysBefore(today, 7).getTime()
  const to = startOfDay(today).getTime()
  return records.filter((record) => {
    const time = new Date(record.time).getTime()
    return time >= from && time < to
  })
}

/** Total per day for the seven full days before `today`, oldest first. */
export function lastSevenDays(records: Drink[], today: Date): DayTotal[] {
  const week = lastWeek(records, today)
  return Array.from({ length: 7 }, (_, index) => {
    const date = daysBefore(today, 7 - index)
    const totalMl = week
      .filter(
        (record) =>
          startOfDay(new Date(record.time)).getTime() === date.getTime(),
      )
      .reduce((total, record) => total + record.amountMl, 0)
    return { date, totalMl }
  })
}

/**
 * The part of the day with the fewest drinks per hour over the last seven
 * full days, or null when there are no drinks at all to judge from.
 */
export function forgetfulPeriod(records: Drink[], today: Date): Period | null {
  const week = lastWeek(records, today)
  if (week.length === 0) return null
  const rate = (period: Period) =>
    week.filter((record) => {
      const hour = new Date(record.time).getHours()
      return hour >= period.from && hour < period.to
    }).length /
    (period.to - period.from)
  return dayPeriods.reduce((lowest, period) =>
    rate(period) < rate(lowest) ? period : lowest,
  )
}
