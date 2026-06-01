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
    async findAll(
        @Param("year") year: number,
        @Param("month") month: number,
    ): Promise<Attendance[]> {
        return await this.repository.readAll(year, month)
    }
}
