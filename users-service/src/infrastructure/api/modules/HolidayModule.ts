import { Module } from "@nestjs/common"
import { HolidayController } from "../controllers/HolidayController"
import { TypeORMHolidayRepository } from "../services/TypeORMHolidayRepository"

@Module({
    controllers: [HolidayController],
    providers: [TypeORMHolidayRepository],
})
export class HolidayModule {}
