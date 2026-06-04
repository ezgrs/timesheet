import { HolidayShift } from "../enums/holiday-shift"

export type Holiday = {
    id: string
    date: Date
    name: string
    shift: HolidayShift | null
}