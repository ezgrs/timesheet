import { Module } from "@nestjs/common"
import { AttendanceController } from "../controllers/attendance.controller"
import { TypeORMAttendanceRepository } from "../services/typeorm-attendance.repository"

@Module({
    controllers: [AttendanceController],
    providers: [TypeORMAttendanceRepository],
})
export class AttendanceModule {}
