import { Module } from "@nestjs/common"
import { AbsenceModule } from "./absence.module"
import { AttendanceModule } from "./attendance.module"
import { EmployeeModule } from "./employee.module"
import { HolidayModule } from "./holiday.module"
import { TypeOrmModule } from "@nestjs/typeorm"
import { databaseConfig } from "@/infrastructure/config/database.config"

@Module({
    imports: [
        AbsenceModule,
        AttendanceModule,
        EmployeeModule,
        HolidayModule,
        TypeOrmModule.forRoot(databaseConfig),
    ],
})
export class AppModule {}
