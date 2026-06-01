import { Module } from "@nestjs/common"
import { AbsenceModule } from "./AbsenceModule"
import { AttendanceModule } from "./AttendanceModule"
import { EmployeeModule } from "./EmployeeModule"
import { HolidayModule } from "./HolidayModule"
import { TypeOrmModule } from "@nestjs/typeorm"

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
