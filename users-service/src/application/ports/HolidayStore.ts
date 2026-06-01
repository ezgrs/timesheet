import { Holiday } from "../../domain/entities/Holiday"

export interface HolidayStore {
    create(data: Holiday): Promise<void>
    delete(id: string): Promise<void>
    readAll(year: number, month: number): Promise<Holiday[]>
}
