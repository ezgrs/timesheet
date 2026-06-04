import { Module } from "@nestjs/common"
import { AbsenceModule } from "./absence.module.js"
import { AttendanceModule } from "./attendance.module.js"
import { EmployeeModule } from "./employee.module.js"
import { HolidayModule } from "./holiday.module.js"
import { TypeOrmModule } from "@nestjs/typeorm"
import { databaseConfig } from "@/infrastructure/config/database.config.js"

@Module({
    imports: [
        TypeOrmModule.forRoot(databaseConfig),
        AbsenceModule,
        AttendanceModule,
        EmployeeModule,
        HolidayModule,
    ],
})
export class AppModule {}
