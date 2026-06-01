import { Controller, Get, Param } from "@nestjs/common"
import { TypeORMAttendanceRepository } from "../services/TypeORMAttendanceRepository"
import { Attendance } from "../../../domain/entities/Attendance"

@Controller("attendances")
export class AttendanceController {
    constructor(private repository: TypeORMAttendanceRepository) {}

    @Get(":year/:month")
    async findAll(@Param() params: any): Promise<Attendance[]> {
        const year: number = params.year
        const month: number = params.month
        return await this.repository.readAll(year, month)
    }
}
