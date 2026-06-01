import { Module } from "@nestjs/common"
import { AbsenceModule } from "./absence.module"
import { AttendanceModule } from "./attendance.module"
import { EmployeeModule } from "./employee.module"
import { HolidayModule } from "./holiday.module"
import { TypeOrmModule } from "@nestjs/typeorm"
import "dotenv/config"

@Module({
    imports: [
        AbsenceModule,
        AttendanceModule,
        EmployeeModule,
        HolidayModule,
        TypeOrmModule.forRoot({
            type: "postgres",
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT!),
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            entities: ["src/infrastructure/db/entities/*Entity.ts"],
            migrations: ["src/infrastructure/db/migrations/*.ts"],
        }),
    ],
})
export class AppModule {}
