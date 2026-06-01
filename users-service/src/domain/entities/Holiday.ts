import { HolidayShift } from "@/domain/enums/holiday-shift.js"

export type Holiday = {
    id: string
    date: Date
    name: string
    shift: HolidayShift | null
}
