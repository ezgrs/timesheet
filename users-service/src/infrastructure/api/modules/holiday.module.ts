import { Module } from "@nestjs/common"
import { HolidayController } from "../controllers/holiday.controller.js"
import { TypeORMHolidayRepository } from "../services/typeorm-holiday.repository.js"

@Module({
    controllers: [HolidayController],
    providers: [TypeORMHolidayRepository],
})
export class HolidayModule {}
