/** Every half hour of the day as 24-hour "HH:MM", "00:00" to "23:30". */
export const halfHours = Array.from(
  { length: 48 },
  (_, index) =>
    `${String(Math.floor(index / 2)).padStart(2, "0")}:${index % 2 ? "30" : "00"}`,
)

/** "08:30" -> [8, 30] */
export const splitTime = (time: string) =>
  time.split(":").map(Number) as [number, number]
