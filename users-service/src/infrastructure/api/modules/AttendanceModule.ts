import { Module } from "@nestjs/common";
import { AttendanceController } from "../controllers/AttendanceController";
import { TypeORMAttendanceStore } from "../services/TypeORMAttendanceStore";

@Module({
  controllers: [AttendanceController],
  providers: [TypeORMAttendanceStore],
})
export class AttendanceModule {}