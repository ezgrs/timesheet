import { Module } from "@nestjs/common"
import { HolidayController } from "../controllers/holiday.controller"
import { TypeORMHolidayRepository } from "../services/typeorm-holiday.repository"

@Module({
    controllers: [HolidayController],
    providers: [TypeORMHolidayRepository],
})
export class HolidayModule {}
