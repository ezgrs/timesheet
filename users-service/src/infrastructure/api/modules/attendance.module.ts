import { Module } from "@nestjs/common"
import { AttendanceController } from "../controllers/attendance.controller.js"
import { TypeORMAttendanceRepository } from "../services/typeorm-attendance.repository.js"

@Module({
    controllers: [AttendanceController],
    providers: [TypeORMAttendanceRepository],
})
export class AttendanceModule {}
