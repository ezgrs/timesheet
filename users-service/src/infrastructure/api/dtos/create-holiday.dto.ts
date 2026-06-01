import { HolidayShift } from "@/domain/enums/holiday-shift.js"

export type CreateHolidayDTO = {
    date: Date
    name: string
    shift?: HolidayShift | undefined
}
