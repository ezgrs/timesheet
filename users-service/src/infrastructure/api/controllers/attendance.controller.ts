import { Controller, Get, Inject, Param } from "@nestjs/common"
import { TypeORMAttendanceRepository } from "../services/typeorm-attendance.repository.js"
import { Attendance } from "@/domain/entities/attendance.js"

@Controller("attendances")
export class AttendanceController {
    constructor(
        @Inject(TypeORMAttendanceRepository)
        private readonly repository: TypeORMAttendanceRepository,
    ) {}

    @Get(":year/:month")
    async findAll(@Param() params: any): Promise<Attendance[]> {
        const year: number = params.year
        const month: number = params.month
        return await this.repository.readAll(year, month)
    }
}
