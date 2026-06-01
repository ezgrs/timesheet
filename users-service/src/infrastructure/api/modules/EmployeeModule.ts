import { Module } from "@nestjs/common"
import { EmployeeController } from "../controllers/EmployeeController"
import { TypeORMEmployeeStore } from "../services/TypeORMEmployeeStore"

@Module({
    controllers: [EmployeeController],
    providers: [TypeORMEmployeeStore],
})
export class EmployeeModule {}
