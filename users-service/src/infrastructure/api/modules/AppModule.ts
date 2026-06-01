import { Module } from "@nestjs/common"
import { AbsenceModule } from "./AbsenceModule"
import { AttendanceModule } from "./AttendanceModule"
import { EmployeeModule } from "./EmployeeModule"
import { HolidayModule } from "./HolidayModule"

@Module({
    imports: [AbsenceModule, AttendanceModule, EmployeeModule, HolidayModule],
})
export class AppModule {}
