import { Module } from "@nestjs/common"
import { EmployeeController } from "../controllers/EmployeeController"
import { TypeORMEmployeeRepository } from "../services/TypeORMEmployeeRepository"

@Module({
    controllers: [EmployeeController],
    providers: [TypeORMEmployeeRepository],
})
export class EmployeeModule {}
