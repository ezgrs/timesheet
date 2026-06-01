import { Module } from "@nestjs/common"
import { EmployeeController } from "../controllers/employee.controller"
import { TypeORMEmployeeRepository } from "../services/typeorm-employee.repository"

@Module({
    controllers: [EmployeeController],
    providers: [TypeORMEmployeeRepository],
})
export class EmployeeModule {}
