import { HolidayShift } from "../enums/HolidayShift"

export type Holiday = {
    id: number
    date: Date
    name: string
    shift: HolidayShift | null
}
