import { Module } from "@nestjs/common"
import { AttendanceController } from "../controllers/AttendanceController"
import { TypeORMAttendanceRepository } from "../services/TypeORMAttendanceRepository"

@Module({
    controllers: [AttendanceController],
    providers: [TypeORMAttendanceRepository],
})
export class AttendanceModule {}
