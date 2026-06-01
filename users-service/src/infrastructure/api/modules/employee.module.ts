import { Module } from "@nestjs/common"
import { EmployeeController } from "../controllers/employee.controller.js"
import { TypeORMEmployeeRepository } from "../services/typeorm-employee.repository.js"
import { EmployeeEntity } from "@/infrastructure/db/entities/employee.entity.js"
import { TypeOrmModule } from "@nestjs/typeorm"

@Module({
    imports: [TypeOrmModule.forFeature([EmployeeEntity])],
    controllers: [EmployeeController],
    providers: [TypeORMEmployeeRepository],
})
export class EmployeeModule {}
