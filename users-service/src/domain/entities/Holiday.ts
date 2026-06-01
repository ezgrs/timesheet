import { HolidayShift } from "../enums/HolidayShift"

export type Holiday = {
    id: string
    date: Date
    name: string
    shift: HolidayShift | null
}
