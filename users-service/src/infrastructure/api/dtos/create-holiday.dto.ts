import { HolidayShift } from "../../../domain/enums/holiday-shift"

export type CreateHolidayDTO = {
    date: Date
    name: string
    shift?: HolidayShift | undefined
}
