import { Module } from "@nestjs/common"
import { EmployeeController } from "../controllers/employee.controller.js"
import { TypeORMEmployeeRepository } from "../services/typeorm-employee.repository.js"

@Module({
    controllers: [EmployeeController],
    providers: [TypeORMEmployeeRepository],
})
export class EmployeeModule {}
