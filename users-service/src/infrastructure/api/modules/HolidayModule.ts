import { Module } from "@nestjs/common";
import { HolidayController } from "../controllers/HolidayController";
import { TypeORMHolidayStore } from "../services/TypeORMHolidayStore";

@Module({
  controllers: [HolidayController],
  providers: [TypeORMHolidayStore],
})
export class HolidayModule {}