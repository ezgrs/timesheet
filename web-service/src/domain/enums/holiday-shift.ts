export const holidayShifts = ["am", "pm"] as const

export type HolidayShift = (typeof holidayShifts)[number]
