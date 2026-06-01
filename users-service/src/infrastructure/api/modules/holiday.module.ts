import { Module } from "@nestjs/common"
import { HolidayController } from "../controllers/holiday.controller.js"
import { TypeORMHolidayRepository } from "../services/typeorm-holiday.repository.js"
import { HolidayEntity } from "@/infrastructure/db/entities/holiday.entity.js"
import { TypeOrmModule } from "@nestjs/typeorm"

@Module({
    imports: [TypeOrmModule.forFeature([HolidayEntity])],
    controllers: [HolidayController],
    providers: [TypeORMHolidayRepository],
})
export class HolidayModule {}
