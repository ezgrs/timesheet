import { Controller, Get, Param } from "@nestjs/common"
import { TypeORMAttendanceStore } from "../services/TypeORMAttendanceStore"
import { Attendance } from "../../../domain/entities/Attendance"

@Controller("attendances")
export class AttendanceController {
    constructor(private store: TypeORMAttendanceStore) {}

    @Get(":year/:month")
    async findAll(@Param() params: any): Promise<Attendance[]> {
        const year: number = params.year
        const month: number = params.month
        return await this.store.readAll(year, month)
    }
}
