export const isToday = (date: Date) =>
  date.toDateString() === new Date().toDateString()
