import { HolidayShift } from "../../../domain/enums/HolidayShift"

export type CreateHolidayDTO = {
    date: Date
    name: string
    shift?: HolidayShift | undefined
}