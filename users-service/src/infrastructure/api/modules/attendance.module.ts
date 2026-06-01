import { Module } from "@nestjs/common"
import { AttendanceController } from "../controllers/attendance.controller.js"
import { TypeORMAttendanceRepository } from "../services/typeorm-attendance.repository.js"
import { EmployeeEntity } from "@/infrastructure/db/entities/employee.entity.js"
import { TypeOrmModule } from "@nestjs/typeorm"

@Module({
    imports: [TypeOrmModule.forFeature([EmployeeEntity])],
    controllers: [AttendanceController],
    providers: [TypeORMAttendanceRepository],
})
export class AttendanceModule {}
